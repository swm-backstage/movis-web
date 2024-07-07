import { styled } from "styled-components";
import EventLog from "./components/EventLog";
import MenuItem from "./components/MenuItem";
import { useEffect, useState } from "react";
import { getAlert } from "../../server/alert";

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* max-width: 400px; */
    gap:15px;
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

export default function EventInfo(){
    const [eventData, setEventData] = useState({
        alertList : [{
            id: 1,
            name: "로딩중",
            contents: "",
            cash: 0,
            billType: "deposit",
            bankNumber: "1234",
            bankCode: "090",
            createdAt: "2000-01-01T00:00:00"
        }]
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAlert();
            setEventData(response);
        }
        fetchData();
    }, [])

    const menuItems = [
        { label: '이벤트 회비 관리', to: '/events/info' },
        { label: '이벤트 회원 관리', to: '/events/info' },
        { label: '총 입출금 관리', to: '/events/info' },
    ];

    
    
    return (
        <InfoContainer>
            <Title>이벤트 A</Title>
            <EventDescription>이 이벤트에서 발생한 모든 거래내역 입니다.</EventDescription>
            <NotFoundText>내역이 보이지 않나요?</NotFoundText>

            {/* 나중에 스크롤 가능한 리스트로 변경해야 함! */}
            <div>
                {
                    eventData.alertList.map((log, i) => (
                        <EventLog e={log} key={i}/>
                    ))
                }
            </div>

            <Title>기능 바로가기</Title>
            <MenuContainer>
                {menuItems.map((e, i) => (
                    <MenuItem key={i} label={e.label} to={e.to} />
                ))}
            </MenuContainer>
            
        </InfoContainer>
    )
}