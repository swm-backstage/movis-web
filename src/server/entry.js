import axiosInstance from './axiosInstance';

export const getEntryClubInfo = async (entryCode) => {
    try {
        const response = await axiosInstance.get(`/api/v1/clubs/entryCode/${entryCode}`);
        return response.data; // true 또는 에러
    } catch (error) {
        throw error.response?.data || '초대장 확인에 실패했습니다.';
    }
};

export const verifyMember = async (name, phoneNumber, entryCode) => {
    try {
        const response = await axiosInstance.post('/api/v1/clubs/entryCode/verify', { name, phoneNumber, entryCode });
        return response.data; // 모임 ID 반환
    } catch (error) {
        throw error.response?.data || '초대 수락에 실패했습니다.';
    }
};