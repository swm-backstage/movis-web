import mockBillList from "./mock/mockBillList.json"
import mockBillDetail from "./mock/mockBillDetail.json"
import mockAllBillList from "./mock/mockAllBillList.json"
import axiosInstance from "./axiosInstance"

export async function getBillList(eventId, lastPaidAt, lastId, size) {
    try{
        size = 999;
        const response = await axiosInstance.get(
            `/api/v1/transactionHistories/fromEvent?eventId=${eventId}&lastPaidAt=${lastPaidAt}&lastId=${lastId ? lastId : "first"}&size=${size ? size : 20}`);
        return response.data;
    } catch (e) {
        console.error(e);
        return mockBillList;
    }
}

export async function getAllBillList(clubId, lastPaidAt, lastId, size) {
    try {
        size = 999;
        const response = await axiosInstance.get(
            `/api/v1/transactionHistories/fromClub?clubId=${clubId}&lastPaidAt=${lastPaidAt}&lastId=${lastId ? lastId : "first"}&size=${size ? size : 20}`);
        return response.data;
    } catch (e) {
        console.error(e);
        return mockAllBillList;
    }
}

export async function getBillDetail(billUid) {

    return mockBillDetail;
}

export async function getUnclassifiedBillList(clubId) {
    try {
        const response = await axiosInstance.get(
            `/api/v1/transactionHistories/unClassification?clubId=${clubId}`);
        return response.data;
    } catch (e) {
        console.error(e);
        return mockBillList;
    }
}

export async function getUnclassfiedBillCount(clubId) {
    try {
        const response = await axiosInstance.get(
            `/api/v1/transactionHistories/unClassification/count?clubId=${clubId}`);
        return response.data;
    } catch (e) {
        console.error(e);
        return mockBillList;
    }
}