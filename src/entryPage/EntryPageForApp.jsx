import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EntryPageForApp() {
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const handleMessage = (event) => {
          if (event.origin !== window.location.origin) {
            response = JSON.parse(event.data);
            sessionStorage.setItem('isChongmu',response.isChongmu);
            sessionStorage.setItem('accessToken', response.accessToken);
            
            setTimeout(() => {
              navigate(`/clubs/${params.clubId}`);
            }, 100);
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