import firebase from 'firebase'

const firebaseConfig = {
	apiKey: 'AIzaSyB36Jgoh1F8Ea-YmamkZsOhFavdi3V-eLQ',
	authDomain: 'photo-social-network.firebaseapp.com',
	projectId: 'photo-social-network',
	storageBucket: 'photo-social-network.appspot.com',
	messagingSenderId: '653469983531',
	appId: '1:653469983531:web:2432872b933e1507e19b6e',
	measurementId: '${config.measurementId}',
};

const firebaseApp=firebase.initializeApp(firebaseConfig)
const db=firebaseApp.firestore()
const auth=firebase.auth();
const storage=firebase.storage()

export {db,auth,storage} 