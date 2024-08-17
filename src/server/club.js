import axiosInstance from "./axiosInstance";

export async function getClubInfo(clubId) {
    try {
        const response = await axiosInstance.get(
            `/api/v1/clubs/${clubId}`);
        return response.data;
    } catch (e) {
        console.error(e);
    }
}