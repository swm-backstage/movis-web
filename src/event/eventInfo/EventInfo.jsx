import { styled } from "styled-components";
import EventLog from "../components/EventLog";
import MenuItem from "./components/MenuItem";
import { useEffect, useState } from "react";
import { getAlert } from "../../server/alert";
import { getBillList } from "../../server/bills";
import { useParams } from "react-router-dom";

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

const mock = {
    billList : [{
        id: 1,
        name: "로딩중",
        contents: "",
        cash: 0,
        billType: "deposit",
        bankNumber: "1234",
        bankCode: "090",
        createdAt: "2000-01-01T00:00:00"
    }]
}

export default function EventInfo(){
    const [billData, setBillData] = useState(mock);
    const eventId = useParams().id;

    useEffect(() => {
        const fetchData = async () => {
            const response = await getBillList(eventId);
            setBillData(response);
        }
        fetchData();
    }, [])

    const menuItems = [
        { label: '이벤트 회비 관리', to: '/events/info' },
        { label: '회원 납부 현황', to: '/events/info' },
        { label: '이벤트 거래내역 엑셀 내보내기', to: '/events/info' },
    ];

    
    
    return (
        <InfoContainer>
            <Title>이벤트 A</Title>
            <EventDescription>이 이벤트에서 발생한 모든 거래내역 입니다.</EventDescription>
            <NotFoundText>내역이 보이지 않나요?</NotFoundText>

            <ScrollContainer>
                {
                    billData.billList.map((log, i) => (
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