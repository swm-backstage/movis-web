import mockEventList from "./mock/mockEventList.json"
import axiosInstance from "./axiosInstance";

export async function getEventList(cludId, size, lastid) {
    try {
        const response = await axiosInstance.get(
            `/api/v1/events?clubId=${cludId}&lastid=${lastid ? lastid : "first"}&size=${size}`);
        return response.data;
    } catch (e) {
        console.error(e);
        return mockEventList;
    }
}