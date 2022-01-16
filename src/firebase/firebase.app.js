import { initializeApp } from 'firebase/app'

export default function () {
  const firebaseConfig = {
    apiKey: 'AIzaSyBv34RYhbiZnpVLxdDntHjnBXZkfzsVLDM',
    authDomain: 'finances-crm.firebaseapp.com',
    projectId: 'finances-crm',
    storageBucket: 'finances-crm.appspot.com',
    messagingSenderId: '1052875322813',
    appId: '1:1052875322813:web:3183b01da133f1ea600ed4',
  }

  const firebaseApp = initializeApp(firebaseConfig)
  return firebaseApp
}
