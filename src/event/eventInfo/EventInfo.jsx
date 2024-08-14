import { styled } from "styled-components";
import EventLog from "../components/EventLog";
import MenuItem from "./components/MenuItem";
import { useEffect, useState } from "react";
import { getBillList } from "../../server/bills";
import { useParams } from "react-router-dom";
import { getEventInfo } from "../../server/event";

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap:15px;
`

const ScrollContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
`

const EventDescription = styled.p`
    color: #8b8b8b;
`

const NotFoundText = styled.p`
    text-align: end;
    text-decoration: underline;
`

const mockBillData = {
    "feeElements": [
        {
            "transactionHistoryId": "uuid1",
            "status": "BILL",
            "id": "1",
            "name": "로딩중",
            "amount": 10000,
            "paidAt": "2024-06-24T16:11:00"
        }
    ]
}

const mockEventData = {
    "name": "로딩중",
    "balance": 0,
    "totalPaymentAmount": 0,
    "paymentDeadline": null
}

export default function EventInfo(){
    const [billData, setBillData] = useState(mockBillData);
    const [eventData, setEventData] = useState(mockEventData);
    const { eventId, clubId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            Promise.all([
                getBillList(eventId, "2000-01-01T00:00:00", "first", 20),
                getEventInfo(eventId)
            ]).then(([billResponse, eventResponse]) => {
                setBillData(billResponse);
                setEventData(eventResponse);
            });
        }
        fetchData();
    }, [])

    const menuItems = [
        { label: '이벤트 회비 관리', to: `settings` },
        { label: '회원 납부 현황', to: `memberInfo` },
        { label: '이벤트 거래내역 엑셀 내보내기', to: `excel` },
    ];

    
    
    return (
        <InfoContainer>
            <Title>{eventData.name}</Title>
            <EventDescription>이 이벤트에서 발생한 모든 거래내역 입니다.</EventDescription>
            <NotFoundText>내역이 보이지 않나요?</NotFoundText>

            <ScrollContainer>
                {
                    billData.feeElements.map((log, i) => (
                        <EventLog e={log} key={i}/>
                    ))
                }
            </ScrollContainer>

            <Title>기능 바로가기</Title>
            <MenuContainer>
                {menuItems.map((e, i) => (
                    <MenuItem key={i} label={e.label} to={e.to} />
                ))}
            </MenuContainer>
            
        </InfoContainer>
    )
}