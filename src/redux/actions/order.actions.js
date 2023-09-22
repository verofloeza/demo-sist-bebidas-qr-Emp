import { doc, getDoc, getDocs } from "firebase/firestore";

import { LIST_ORDER } from "../actionType";
import { db } from "../../data/firebase/firebase";

export const getOrder =(id)=>{
    return async dispatch => {
  
        const docRef = doc(db, "orders", id);
        const docSnap = await getDoc(docRef);
        const info = docSnap.data();
        const data ={
                user: info.user,
                product: info.product,
                date: info.date,
                isActive: info.isActive,
                total: info.total
              }
              dispatch({ 
                    type: LIST_ORDER,
                    payload: data
                  });
      }
}