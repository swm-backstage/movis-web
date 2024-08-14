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

export async function getEventInfo(eventId) {
    try {
        const response = await axiosInstance.get(
            `/api/v1/events/${eventId}`);
        return response.data;
    } catch (e) {
        console.error(e);
        return mockEventList;
    }
}

export async function getEventsUnfinished(clubId){
    try {
        const now = new Date();
        const formattedDateTime = now.toISOString().split('T')[0];

        const response = await axiosInstance.get(
            `/api/v1/events/funding?clubId=${clubId}&now=${formattedDateTime}`);
        return response.data;
    } catch (e) {
        console.error(e);
        return mockEventList;
    }
}