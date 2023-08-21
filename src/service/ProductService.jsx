import { db } from '../config';
import {collection,doc,updateDoc,deleteDoc} from 'firebase/firestore';
import {getAllDocs,addDocument, getDocument} from "./Helper";

const productCollection = collection(db,'Products');

export function addProduct(product){
  return addDocument(productCollection,product);
}

export const getProduct= async(id)=> {
  return await getDocument(productCollection,id);
}

export const updateProduct = async(newRow) => {
  console.log(newRow);
  const document = doc(db,"Products",newRow.id);
  await updateDoc(document, {
    id:newRow.id,
    prodName:newRow.prodName,
    prodDescription:newRow.prodDescription,
    price:newRow.price
  });
  // window.location.reload(true);
}

export const deleteProduct= async(id) =>{
  const Doc=doc(db,"Products",id);
    await deleteDoc(Doc);
    alert("Document Deleted Sucessfully");
    window.location.reload(true);
}

export function getAllProducts(id) {
    return getAllDocs(productCollection,"groupId",id);
}

