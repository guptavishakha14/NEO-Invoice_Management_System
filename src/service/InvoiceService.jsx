import { db } from '../config';
import { collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAllDocs, addDocument, getAllDocsWithValue, getAllDocsWithDate } from "./Helper";

const invoiceCollection = collection(db, 'invoices');

export const addInvoice = async (invoice) => {
  return addDocument(invoiceCollection, invoice);
}

export const updateInvoice = async (newRow) => {
  console.log(newRow);
  const document = doc(db, "invoices", newRow.id);
  await updateDoc(document, {
    usertype: newRow.usertype,
    compName: newRow.compName,
    invNo: newRow.invNo,
    date: newRow.date,
    amount: newRow.amount,
    cgst: newRow.cgst,
    sgst: newRow.sgst,
    totalPrice: newRow.totalPrice
  });
  // window.location.reload(true);
}

export const deleteInvoice = async (id) => {
  const Doc = doc(db, "invoices", id);
  await deleteDoc(Doc);
  alert("Document Deleted Sucessfully");
  window.location.reload(true);
}

export function getAllInvoices(userId) {
  return getAllDocs(invoiceCollection, "groupId", userId);
}

export function getAllClients(id) {
  return getAllDocsWithValue(invoiceCollection, "groupId", id, "usertype", "Client");
}

export function getAllVendors(id) {
  return getAllDocsWithValue(invoiceCollection, "groupId", id, "usertype", "Vendor");
}

export function getAllClientsWithDate(id, startDate, currentDate) {
  return getAllDocsWithDate(invoiceCollection, "groupId", id, "usertype", "Client", "date", startDate, "date", currentDate);
}

export function getAllVendorsWithDate(id, startDate, currentDate) {
  return getAllDocsWithDate(invoiceCollection, "groupId", id, "usertype", "Vendor", "date", startDate, "date", currentDate);
}
