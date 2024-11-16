import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.movis.klr.kr',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false; // 현재 토큰을 갱신 중인지 여부
let refreshSubscribers = []; // 갱신 후에 실행할 요청들을 저장하는 큐

// 토큰이 갱신되면 큐에 저장된 요청을 실행
function onRefreshed(newAccessToken) {
    refreshSubscribers.forEach((callback) => callback(newAccessToken));
    refreshSubscribers = [];
}

// 토큰 갱신이 완료될 때까지 기다리는 요청을 큐에 저장
function addRefreshSubscriber(callback) {
    refreshSubscribers.push(callback);
}

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            config.headers['authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    },
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const { response } = error;

        const errorCode = response?.data?.code;

        if (errorCode === 'C016') {
            if (!isRefreshing) {
                // 토큰이 갱신 중이 아니라면 갱신 시작
                isRefreshing = true;
                try {
                    console.log('토큰 재발급 진행');
                    const refreshToken = sessionStorage.getItem('refreshToken');
                    const reissueResponse = await axiosInstance.patch('/api/v1/auth/reissue', { refreshToken });
                    console.log('토큰 재발급 성공:', reissueResponse);

                    const newAccessToken = reissueResponse.data.accessToken;
                    const newRefreshToken = reissueResponse.data.refreshToken;

                    sessionStorage.setItem('accessToken', newAccessToken);
                    sessionStorage.setItem('refreshToken', newRefreshToken);

                    isRefreshing = false;
                    onRefreshed(newAccessToken);

                    originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);

                } catch (reissueError) {
                    console.error('토큰 재발급 오류:', reissueError);
                    isRefreshing = false;
                    return Promise.reject(reissueError);
                }
            }

            // 갱신 중이라면 해당 요청을 큐에 추가하고, 갱신 후 실행
            return new Promise((resolve) => {
                addRefreshSubscriber((newAccessToken) => {
                    originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                    resolve(axiosInstance(originalRequest));
                });
            });
        }

        if (errorCode === 'C017') {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
            window.location.href = '/';
            return Promise.reject(error);
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;