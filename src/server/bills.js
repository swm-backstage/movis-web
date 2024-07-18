import axios from "axios"
import mockBillList from "./mock/mockBillList.json"
import mockBillList2 from "./mock/mockBillList2.json"
import mockBillDetail from "./mock/mockBillDetail.json"
import mockAllBillList from "./mock/mockAllBillList.json"

export async function getBillList(eventId) {
    
    return eventId % 2 != 0 ? mockBillList : mockBillList2;
}

export async function getAllBillList() {
    return mockAllBillList;
}

export async function getBillDetail(billUid) {

    return mockBillDetail;
}
