import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EntryPageForApp() {
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const handleMessage = (event) => {
          if (event.origin !== window.location.origin) {
            // alert(`총무로 확인됩니다.\n디버깅용 수신데이터:${JSON.stringify(event.data)}`);
            sessionStorage.setItem('isChongmu',event.data.isChongmu);
            sessionStorage.setItem('accessToken', event.data.accessToken);
            navigate(`/clubs/${params.clubId}`);
          }
        };
        document.addEventListener('message', handleMessage);
        return () => {
          document.removeEventListener('message', handleMessage);
        };
      }, []);

      return (
        <>
            모임 로딩중...
        </>
      )
}