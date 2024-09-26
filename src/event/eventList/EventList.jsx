import { useNavigate, useParams } from "react-router-dom"
import { styled } from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import EventElement from "../components/EventElement";
import { useEffect, useState } from "react";
import { getEventList } from "../../server/event";

const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    height: 100%;
    gap: 10px;
`

const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const ElementContainer = styled.div`
    height: calc(350px);
`

const ButtonUnclassified = styled.button`
    background-color: #FF4E4E;
    border: none;
    padding: 15px 0;
    
    font-size: 18px;
    font-weight: bold;
    color: white;
`

const ButtonEventCreate = styled.button`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: white;
    border: 1px solid black;
    padding: 10px 0;
    
    font-size: 18px;
    font-weight: bold;
    color: black;
    cursor: pointer;
`

const HeaderText = styled.h1`
    font-size: 24px;
    font-weight: bold;
`

const DescriptText = styled.p``

const mockEventList = {
    "eventList" : [
        {
            "eventId": 1,
            "name" : "로딩중...",
            "balance" : 0
        }
    ]
};

export default function EventList(){
    const [eventList, setEventList] = useState(mockEventList);
    const navigate = useNavigate();
    const { clubId } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await getEventList(clubId, 20, "first");
            setEventList(response);
        }
        fetchData();
    }, [])

    const sendMessageToNativeForEventCreate = () => {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "eventCreate",
            clubId: clubId
          }));
        }
    };

    return (
        <BodyContainer>
            <TextArea>
                <HeaderText>이벤트 목록</HeaderText>
                <DescriptText>모든 이벤트 정보를 보여드릴게요!</DescriptText>
                <DescriptText>우측 금액은 이벤트 내 내역 합계입니다</DescriptText>
            </TextArea>

            <ButtonUnclassified onClick={() => navigate(`/clubs/${clubId}/events/unclassified`)}>
                미분류 내역 바로가기 <IoIosArrowForward/> 
            </ButtonUnclassified>

            <ElementContainer>
                {
                    eventList.eventList.length === 0 
                    ? <p>현재 설정된 이벤트가 없습니다 {":("}</p> : (
                        eventList.eventList.map((e,i) => (
                            <EventElement 
                                key={i}
                                eventId={e.eventId} 
                                title={e.name}
                                cash={e.balance}
                            />
                        ))
                    )
                }
            </ElementContainer>

            {
                sessionStorage.getItem('isChongmu') && (
                    <ButtonEventCreate onClick={() => sendMessageToNativeForEventCreate()}>이벤트 생성하기</ButtonEventCreate>
                )
            }
        </BodyContainer>
    )
}