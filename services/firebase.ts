import { MessageForm } from '@@/models/MessageForm'
import { addDoc } from '@firebase/firestore'
import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
export const firebaseApp = initializeApp({
    apiKey: 'AIzaSyBpx76mGUsRHJ-s1wgvLSLyTuf7IpuE2mY',
    appId: '1:571579562209:web:f85b3cae855e66acdd5fa0',
    authDomain: 'app-chat-642cd.firebaseapp.com',
    messagingSenderId: '571579562209',
    projectId: 'app-chat-642cd',
    storageBucket: 'app-chat-642cd.firebasestorage.app',
})
export const db = getFirestore(firebaseApp)

export const sendMessage = async (messageForm: MessageForm) => {
   const collectionSet = collection(db, 'app', `${messageForm.senderId}_${messageForm.receiverId}`, 'messages')
    await addDoc(collectionSet, messageForm)
}