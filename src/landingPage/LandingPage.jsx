import { useNavigate } from "react-router-dom"


export default function LandingPage(){
    const navigate = useNavigate();

    return(
        <div>
            <p>정상 실행중~</p>
            <br/>
            <p>이 페이지는 모바일 앱에서 보여지지 않습니다.</p>
            <p> 주소창에 사이트 주소만 입력 시 바로 등장!</p>
            <br/>
            <button onClick={() => navigate("/events")}>이벤트 이동</button>
        </div>
    )
}