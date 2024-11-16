import axiosInstance from "./axiosInstance"

export async function getBillList(eventId, lastPaidAt, lastId, size) {
    try{
        size = 999;
        const response = await axiosInstance.get(
            `/api/v1/transactionHistories/fromEvent?eventId=${eventId}&lastPaidAt=${lastPaidAt}&lastId=${lastId ? lastId : "first"}&size=${size ? size : 20}`);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export async function getAllBillList(clubId, lastPaidAt, lastId, size) {
    try {
        const response = await axiosInstance.get(
            `/api/v1/transactionHistories/fromClub?clubId=${clubId}&lastPaidAt=${lastPaidAt}&lastId=${lastId ? lastId : "first"}&size=${size ? size : 20}`);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export async function getTotalInfo(clubId) {
    try {
        const response = await axiosInstance.get(
            `/api/v1/transactionHistories/fromClub?clubId=${clubId}&lastPaidAt=${new Date().toISOString().split('Z')[0]}`);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export async function getBillDetail(billUid, type) {
    try {
        if (type === "fee" || type === "FEE") {
            const response = await axiosInstance.get(`/api/v1/fees/${billUid}`);
            return response.data;
        } else {
            const response = await axiosInstance.get(`/api/v1/eventBill/${billUid}`);
            return response.data;
        }
    } catch (e) {
        console.error(e);
    }
}

export async function getUnclassifiedBillList(clubId) {
    try {
        const response = await axiosInstance.get(
            `/api/v1/transactionHistories/unClassification?clubId=${clubId}`);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

export async function getUnclassfiedBillCount(clubId) {
    try {
        const response = await axiosInstance.get(
            `/api/v1/transactionHistories/unClassification/count?clubId=${clubId}`);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}