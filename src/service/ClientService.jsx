import { db } from '../config';
import {collection,doc,updateDoc,deleteDoc} from 'firebase/firestore';
import {getAllDocs,addDocument} from "./Helper";

const clientCollection = collection(db,"Clients");

export function addClient(client){
    return addDocument(clientCollection,client);
  }
  
  export const updateClient = async(newRow) => {
    console.log(newRow);
    const document = doc(db,"Clients",newRow.id);
    await updateDoc(document, {
      clientName:newRow.clientName,
      clientMobile:newRow.clientMobile,
      clientEmail:newRow.clientEmail
    });
    // window.location.reload(true);
  }
  
  export const deleteClient= async(id) =>{
    const Doc=doc(db,"Clients",id);
      await deleteDoc(Doc);
      alert("Document Deleted Sucessfully");
      window.location.reload(true);
  }

  export function getAllClients(id) {
      return getAllDocs(clientCollection,"groupId",id);
  }
