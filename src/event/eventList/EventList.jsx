import { useNavigate } from "react-router-dom"
import { styled } from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import EventElement from "./components/EventElement";

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

    background-color: transparent;
    border: 1px solid black;
    padding: 10px 0;
    
    font-size: 18px;
    font-weight: bold;
    color: black;
`

const HeaderText = styled.h1`
    font-size: 24px;
    font-weight: bold;
`

const DescriptText = styled.p``

export default function EventList(){
    const navigate = useNavigate();

    const mock = {
        "eventList" : [
            {
                "id": 1,
                "title" : "정기 회비",
                "cash" : 1000000
            },
            {
                "id": 2,
                "title" : "MT",
                "cash" : -100000
            },
            {
                "id": 3,
                "title" : "이벤트1",
                "cash" : 0
            },
            {
                "id": 4,
                "title" : "이벤트2",
                "cash" : 20000
            },
            {
                "id": 5,
                "title" : "이벤트3",
                "cash" : 300000
            }
        ]
    };

    return (
        <BodyContainer>
            <TextArea>
                <HeaderText>이벤트 목록</HeaderText>
                <DescriptText>모든 이벤트 정보를 보여드릴게요!</DescriptText>
                <DescriptText>우측 금액은 이벤트 내 내역 합계입니다</DescriptText>
            </TextArea>

            <ButtonUnclassified onClick={() => navigate("/events/unclassified")}>
                미분류 이벤트 바로가기 <IoIosArrowForward/> 
            </ButtonUnclassified>

            <ElementContainer>
                {
                    mock.eventList.map((e,i) => (
                        <EventElement 
                            key={i}
                            title={e.title}
                            cash={e.cash}
                        />
                    ))
                }
                {/* {
                    Array(50).fill().map((_,i) => (
                        <p key={i}>d</p>
                    ))
                } */}
            </ElementContainer>

            <ButtonEventCreate onClick={() => navigate("/events/unclassified")}>이벤트 생성하기</ButtonEventCreate>
        </BodyContainer>
    )
}