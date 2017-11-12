import * as firebase from 'firebase';
import { firebaseConfig } from './config';

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
