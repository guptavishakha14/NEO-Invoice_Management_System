import { db } from '../config';
import { collection, doc, deleteDoc, getDocs, updateDoc } from 'firebase/firestore';
import { addDocument, getAllDocs, getDocument } from "./Helper";
import { query, where } from "firebase/firestore";

const userCollection = collection(db, 'users');

export function addUser(body) {
  return addDocument(userCollection, body);
}

export const getUser = async (id) => {
  return await getDocument(userCollection, id);
}

// export const deleteUser= async(id) =>{
//   const Doc=doc(db,"users",id);
//     await deleteDoc(Doc);
//     alert("Document Deleted Sucessfully");
// }

export const deleteUser = async (row, isDeleted) => {
  const document = doc(db, "users", row.id);
  console.log("isDeleted :"+isDeleted);
  console.log(row.id);
  await updateDoc(document, {
    name: row.name,
    userId: row.userId,
    groupId: row.groupId,
    active: false,
    userType: row.userType,
    isDeleted : isDeleted
  });
  alert("User Deleted Sucessfully");
}

export const getUserByUserId = async (id) => {
  const data = await getAllDocs(userCollection, "userId", id);
  return data;
}

export const getUsersByGroypId = async (id) => {
  const data = await getAllDocs(userCollection, "groupId", id);
  return data;
}

export const getAllUsers = async () => {
  const q = query(userCollection, where('isDeleted', '==', false));
  const data = await getDocs(q);
  return (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
}

export const updateUser = async (newRow) => {
  console.log(newRow);
  const document = doc(db, "users", newRow.id);
  await updateDoc(document, {
    name: newRow.name,
    userId: newRow.userId,
    groupId: newRow.groupId,
    active: newRow.active,
    userType: newRow.userType
  });
}