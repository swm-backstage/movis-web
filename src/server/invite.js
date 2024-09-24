// src/server/invite/invite.js
import axiosInstance from './axiosInstance';

// 초대장 클럽 정보 확인
export const getInviteClubInfo = async (inviteCode) => {
    try {
        const response = await axiosInstance.get(`/api/v1/invitations/verify/${inviteCode}`);
        return response.data; // true 또는 에러
    } catch (error) {
        throw error.response?.data || '초대장 확인에 실패했습니다.';
    }
};

// 인증번호 요청
export const requestVerificationCode = async (phoneNumber) => {
    try {
        await axiosInstance.post('/api/v1/invitations/verify/request', { phoneNumber });
    } catch (error) {
        throw error.response?.data || '인증번호 요청에 실패했습니다.';
    }
};

// 인증번호 확인
export const checkVerificationCode = async (phoneNumber, verifyCode) => {
    try {
        const response = await axiosInstance.post('/api/v1/invitations/verify/check', { phoneNumber, verifyCode });
        return response.data; // true 또는 에러
    } catch (error) {
        throw error.response?.data || '인증번호 확인에 실패했습니다.';
    }
};

// 초대 수락 및 회원 가입
export const acceptInvitation = async (name, phoneNumber, inviteCode) => {
    try {
        const response = await axiosInstance.post('/api/v1/invitations/member', { name, phoneNumber, inviteCode });
        return response.data; // 모임 ID 반환
    } catch (error) {
        throw error.response?.data || '초대 수락에 실패했습니다.';
    }
};