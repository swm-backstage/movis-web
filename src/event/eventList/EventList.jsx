import { useNavigate } from "react-router-dom"

export default function EventList(){

    const navigate = useNavigate();
    return (
        <div>
            <p>이벤트 관리(리스트)</p>
            <button onClick={() => navigate("/events/info")}>상세 내역 이동</button>
            <button onClick={() => navigate("/events/unclassified")}>미분류 이동</button>
        </div>
    )
}