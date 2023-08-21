import { db } from '../config';
import {collection, updateDoc,doc,deleteDoc} from 'firebase/firestore';
import {getAllDocs,addDocument} from "./Helper";

const vendorCollection = collection(db,'vendor');

export function addVendor(vendor){
  return addDocument(vendorCollection,vendor);
}


export const updateVendor = async(newRow) => {
  console.log(newRow);
  const document = doc(db,"vendor",newRow.id);
  await updateDoc(document, {
    id:newRow.id,
    name:newRow.name,
    mobile:newRow.mobile,
    email:newRow.email,
    materialType:newRow.materialType
  });
  // window.location.reload(true);
}

export const checkMobile = async(mobile) => {
  getAllDocs(vendorCollection,'mobile',mobile);
}

export const deleteVendor= async(id) =>{
  const Doc=doc(db,"vendor",id);
    await deleteDoc(Doc);
    alert("Document Deleted Sucessfully");
    window.location.reload(true);
}


export function getAllVendors(id) {
    return getAllDocs(vendorCollection,"groupId",id);
}