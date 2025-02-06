import { MessageForm } from '@@/models/MessageForm'
import { addDoc, query, where } from '@firebase/firestore'
import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
export const firebaseApp = initializeApp({
    apiKey: 'AIzaSyBpx76mGUsRHJ-s1wgvLSLyTuf7IpuE2mY',
    appId: '1:571579562209:web:f85b3cae855e66acdd5fa0',
    authDomain: 'app-chat-642cd.firebaseapp.com',
    messagingSenderId: '571579562209',
    projectId: 'app-chat-642cd',
    storageBucket: 'app-chat-642cd.firebasestorage.app',
})
const randomDoctorId = 'JOAl3NgwgE'

export const db = getFirestore(firebaseApp)

export const getDoctorRooms = async (doctorId: string) => {

    const doctorRooms = []

    const q = query(collection(db, 'app'))

    const querySnapshot = await getDocs(q)
    querySnapshot.docs.forEach((doc) => {
            const roomId = doc.data().room
            if (roomId.startsWith(doctorId))
                doctorRooms.push(roomId)
    })
    return doctorRooms;
}

export const getClientRoom = async (clientId: string) => {
    const q = query(collection(db, 'app'), where('clientId', '==', clientId))
    const clientDocs = await getDocs(q)
    console.log(clientDocs.size)
    if (clientDocs.size)
       return clientDocs.docs[0].data().room

    await createRoom(clientId, randomDoctorId)

    return `${randomDoctorId}_${clientId}`
}

export const createRoom = async (clientId: string, doctorId: string) => {
    await addDoc(collection(db, 'app'), {
        'clientId': clientId,
        'doctorId': doctorId,
        'room': `${doctorId}_${clientId}`,
    })
}

export const sendMessage = async (messageForm: MessageForm, roomId: string) => {
   const collectionSet = collection(db, 'app', roomId, 'messages')
    await addDoc(collectionSet, messageForm)
}