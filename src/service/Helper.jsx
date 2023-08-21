import { doc, getDocs, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";

export const getAllDocs = async (userCollection, feildName, value) => {
  const q = query(userCollection, where(feildName, '==', value));
  const data = await getDocs(q);
  return (data.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
}

export const getAllDocsWithValue = async (userCollection, feildName, value, feildName2, value2) => {
  const q = query(userCollection, where(feildName, '==', value), where(feildName2, '==', value2));
  const data = await getDocs(q);
  return (data.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
}

export const getAllDocsWithDate = async (userCollection, feildName, value, feildName2, value2, fieldName3, value3, fieldName4, value4) => {
  const q = query(userCollection, where(feildName, '==', value), where(feildName2, '==', value2), where(fieldName3, '>=', value3), where(fieldName4, '<=', value4));
  const data = await getDocs(q);
  return (data.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
}

export const getDocument = async (userCollection, id) => {
  const docRef = doc(userCollection, id);
  const document = await getDoc(docRef);
  console.log("data", document.data())
  return document.data();
}

export const addDocument = async (userCollection, body) => {
  return addDoc(userCollection, body).then(response => {
    console.log(response);
    alert("Data Added successfully");
  }).catch(error => {
    console.log(error.message);
  })
}

export const updateDocument = async (userCollection, id, updatedDoc) => {
  const document = getDocument(userCollection, id);
  await updateDoc(document, updatedDoc).then(() => {
    console.log('data updated');
    alert("data updated");
  }).catch((error) => {
    console.log(error);
  })
}

