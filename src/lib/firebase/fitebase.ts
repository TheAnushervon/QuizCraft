// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	query,
	where,
	deleteDoc
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApp();
	deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

interface registerResult {
	passed: boolean;
	errorMsg?: string;
}

export async function register(
	email: string,
	nickName: string,
	password: string
): Promise<registerResult> {
	console.log(nickName);
	console.log(await checkIsPossibleNickName(nickName));
	if (!(await checkIsPossibleNickName(nickName))) {
		return { passed: false, errorMsg: 'NickName is busy' };
	}
	if (password.length < 8) {
		return { passed: false, errorMsg: 'Password less then 8' };
	}
	const hash = await sha256(password);
	await addDoc(collection(db, 'Users'), {
		email: email,
		password: password,
		hash: hash,
		nickName: nickName
	});
	return { passed: true };
}

interface loginResult {
	passed: boolean;
	msg: string;
}

export async function login(nickName: string, password: string): Promise<loginResult> {
	if (!(await checkUser(nickName, password))) {
		return { passed: false, msg: 'Incorrect user or password' };
	}
	console.log(nickName);
	console.log(password);
	const hash = await addLoginExp(nickName, password, new Date());
	return { passed: true, msg: hash };
}

export async function logout(hash: string | null) {
	const q = query(collection(db, 'loginExp'), where('hash', '==', hash));
	const querySnapshot = await getDocs(q);
	if (querySnapshot.empty) {
		return;
	}

	const deletePromises: Promise<void>[] = [];
	querySnapshot.forEach((doc) => {
		deletePromises.push(deleteDoc(doc.ref));
	});

	await Promise.all(deletePromises);
}

export async function getNickName(hash: string | null): Promise<string | null> {
	const q = query(collection(db, 'loginExp'), where('hash', '==', hash));
	const querySnapshot = await getDocs(q);
	if (querySnapshot.empty) {
		return null;
	}

	let foundText: string | null = null;
	querySnapshot.forEach((doc) => {
		if (new Date(doc.data().dateExp) >= new Date()) foundText = doc.data().nickName;
	});

	return foundText;
}

async function checkUser(nickName: string, password: string): Promise<boolean> {
	const q = query(
		collection(db, 'Users'),
		where('nickName', '==', nickName),
		where('password', '==', password)
	);
	const querySnapshot = await getDocs(q);
	if (querySnapshot.empty) {
		return false;
	}

	return true;
}

async function checkIsPossibleNickName(nickName: string): Promise<boolean> {
	const q = query(collection(db, 'Users'), where('nickName', '==', nickName));
	const querySnapshot = await getDocs(q);
	if (querySnapshot.empty) {
		return true;
	}

	return false;
}

async function addLoginExp(nickName: string, pass: string, loginTime: Date): Promise<string> {
	await delOld(nickName);
	const text = pass + loginTime;
	const hash = await sha256(text);
	const dateExp = new Date();
	dateExp.setHours(dateExp.getHours() + 24);
	console.log(dateExp.toDateString());
	await addDoc(collection(db, 'loginExp'), {
		hash: hash,
		nickName: nickName,
		dateExp: dateExp.toJSON()
	});
	return hash;
}

async function delOld(nickName: string) {
	const q = query(collection(db, 'loginExp'), where('nickName', '==', nickName));
	const querySnapshot = await getDocs(q);
	if (querySnapshot.empty) {
		return;
	}

	const deletePromises: Promise<void>[] = [];
	querySnapshot.forEach((doc) => {
		if (new Date(doc.data().dateExp) < new Date()) deletePromises.push(deleteDoc(doc.ref));
	});

	await Promise.all(deletePromises);
}

async function sha256(message: string): Promise<string> {
	const msgBuffer = new TextEncoder().encode(message);
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
	return hashHex;
}
