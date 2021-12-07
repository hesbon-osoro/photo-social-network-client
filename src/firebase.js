import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; //for authentication
import 'firebase/compat/storage'; //for storage
import 'firebase/compat/database'; //for realtime
import 'firebase/compat/firestore'; //for cloud firestore

const firebaseConfig = {
	apiKey: 'AIzaSyB36Jgoh1F8Ea-YmamkZsOhFavdi3V-eLQ',
	authDomain: 'photo-social-network.firebaseapp.com',
	projectId: 'photo-social-network',
	storageBucket: 'photo-social-network.appspot.com',
	messagingSenderId: '653469983531',
	appId: '1:653469983531:web:2432872b933e1507e19b6e',
	measurementId: '${config.measurementId}',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
