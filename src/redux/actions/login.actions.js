import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../data/firebase/firebase";

export const singin = ({ email, pass }) =>{
    
    return async dispatch => {
        console.log(email)
        const userRef = collection(db, 'Users');
        const q = query(userRef, where('email', '==', email), where('isActive', '==', true));

        try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            // El usuario existe y está activo
            console.log('Usuario autenticado');
        } else {
            // El usuario no existe o no está activo
            console.log('No existe el usuario o no está activo');
        }
        } catch (error) {
        console.error('Error al consultar los documentos:', error);
        }
    }
}