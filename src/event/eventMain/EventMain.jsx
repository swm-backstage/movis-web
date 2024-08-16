import styled from "styled-components";
import RemainedFee from "./components/RemainedFee";
import EventElement from "../components/EventElement";
import { useEffect, useState } from "react";
import { getEventList, getEventsUnfinished } from "../../server/event";
import { useParams } from "react-router-dom";
import { mockForClubAlert, mockForEventList, mockForEventUnfinished, mockForEventUnfinishedCount } from "./EventMain.mock";
import { getUnclassfiedBillCount } from "../../server/bills";

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

export default function EventMain(){
    const [clubAlert, setClubAlert] = useState(mockForClubAlert);
    const [eventList, setEventList] = useState(mockForEventList);
    const [eventUnfinished, setEventUnfinished] = useState(mockForEventUnfinished);
    // const [eventUnfinishedCount, setEventUnfinishedCount] = useState(mockForEventUnfinishedCount);
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            Promise.all([
                getEventList(params.clubId, 3),
                getEventsUnfinished(params.clubId),
                getUnclassfiedBillCount(params.clubId)
            ]).then((values) => {
                setEventList(values[0]);
                setEventUnfinished(values[1]);

                if(values[2].count > 0) {
                    setClubAlert([...clubAlert, {
                        id: -1,
                        type: "toast",
                        content: `분류되지 않은 입출금 내역이 ${values[2].count}건 있습니다.`,
                        color: "#8F94A8"
                    }]);
                }
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
                    clubAlert.map((item) => (
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
                    eventUnfinished.eventFundingListDto.length === 0 ? (
                        <p>접수중인 이벤트가 없습니다</p>
                    ) : (
                        eventUnfinished.eventFundingListDto.map((item) => (
                            <RemainedFee
                                key={item.eventId}
                                $title={item.name}
                                $duedate={item.paymentDeadline}
                                $amount={item.totalPaymentAmount}
                                $state={0}
                            />
                        ))
                    )
                }
            </RemainedFeeContainer>

            <Title>이벤트 목록 미리보기</Title>
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
            
            {/* <Button as={Button} onClick={handleButtonClick}>
                이벤트 바로가기 &gt;
            </Button> */}

        </MainContainer>
    )
}