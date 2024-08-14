import styled from "styled-components";
import RemainedFee from "./components/RemainedFee";
import EventElement from "../components/EventElement";
import { useEffect, useState } from "react";
import { getEventList, getEventsUnfinished } from "../../server/event";
import { useParams } from "react-router-dom";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const AlertContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const RemainedFeeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const ElementContainer = styled.div`
    /* height: calc(100px); */
`

const Alert = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 20px;
    border-radius: 5px;
    background-color: ${props => props.$color || "red"};

    white-space: pre-line;

    color: white;
    font-weight: bold;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
`
const Button = styled.button`
    border: 1px solid black;
    width: 100%;
    height: 40px;
    background-color: white;
`

const mockForClubAlert = [
    {
        id: 1,
        type: "toast",
        content: "[구현 안됨]\n현재 납부하지 않은 회비가 1건 있습니다. \n - MT 비용",
        color: "#FF4E4E"
    },
    {
        id: 2,
        type: "toast",
        content: "[구현 안됨]\n분류되지 않은 입출금 내역이 2건 있습니다.",
        color: "#8F94A8"
    }
]

const mockForRemainedFee = [
    {
        id: 1,
        title: "구현 안됨, 임시 데이터 - MT 회비",
        duedate: "2024-11-01T00:00",
        amount: 50000,
        state: 0,
    },
    {
        id: 2,
        title: "구현 안됨, 임시 데이터 - 임의 회비",
        duedate: "2023-11-01T00:00",
        amount: 10000,
        state: 1,
    }
]


const mockForEventList = {
    "eventList" : [
        {
            "uuid": 1,
            "name" : "로딩중...",
            "balance" : 0
        }
    ]
};

const mockForEventUnfinished = {
    "eventFundingListDto": [
      {
        "eventId": "string",
        "name": "string",
        "totalPaymentAmount": 0,
        "paymentDeadline": "2024-07-23"
      }
    ]
}

export default function EventMain(){
    const [eventList, setEventList] = useState(mockForEventList);
    const [eventUnfinished, setEventUnfinished] = useState(mockForEventUnfinished);
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            Promise.all([
                getEventList(params.clubId, 3),
                getEventsUnfinished(params.clubId)
            ]).then((values) => {
                setEventList(values[0]);
                setEventUnfinished(values[1]);
            });

            const response = await getEventList(params.clubId, 3);
            setEventList(response);
        }
        fetchData();
    }, [])

    return(
        <MainContainer>
            <AlertContainer>
                {
                    mockForClubAlert.map((item) => (
                        <Alert
                            key={item.id}
                            $color={item.color}
                        >{item.content}</Alert>
                    ))
                }
            </AlertContainer>
            <Title>현재 모임에서 접수중인 이벤트</Title>
            <RemainedFeeContainer>
                {
                    eventUnfinished.eventFundingListDto.map((item) => (
                        <RemainedFee
                            key={item.eventId}
                            $title={item.name}
                            $duedate={item.paymentDeadline}
                            $amount={item.totalPaymentAmount}
                            $state={0}
                        />
                    ))
                }
            </RemainedFeeContainer>

            <Title>이벤트 목록</Title>
            <ElementContainer>
                {
                    eventList.eventList.length === 0 ? (
                        <p>이벤트가 없습니다</p>
                    ) : (
                        eventList.eventList.slice(0, 3).map((e, i) => (
                            <EventElement 
                                key={i}
                                eventId={e.uuid} 
                                title={e.name}
                                cash={e.balance}
                            />
                        ))
                    )
                }
            </ElementContainer>
            
            <Button as={Button}>
                이벤트 바로가기 &gt;
            </Button>

        </MainContainer>
    )
}