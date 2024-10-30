import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EntryPageForApp() {
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const handleMessage = async (event) => {
          if (event.origin !== window.location.origin) {
            const response = JSON.parse(event.data);

            await new Promise((resolve) => {
              sessionStorage.setItem('isChongmu', response.isChongmu);
              sessionStorage.setItem('accessToken', response.accessToken);
              resolve();  // 저장이 완료 시 resolve 호출
            });

            navigate(`/clubs/${params.clubId}`, {replace : true});
          }
        };

        document.addEventListener('message', handleMessage);
        return () => {
          document.removeEventListener('message', handleMessage);
        };
      }, [navigate, params.clubId]);

      return (
        <>
            모임 로딩중...
        </>
      )
}