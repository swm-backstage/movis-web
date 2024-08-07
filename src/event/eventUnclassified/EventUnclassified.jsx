import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UnclassifiedLog from "./components/UnclassifiedLog";

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
    "transactionHistoryDtoList": [
        {
            "transactionHistoryId": "uuid1",
            "status": "string",
            "id": "1",
            "name": "로딩중..",
            "amount": 0,
            "paidAt": "2024-07-23T07:36:28.983Z"
        }
    ]
}

export default function EventUnclassified (){
    const [billData, setBillData] = useState(mock);
    const { clubId } = useParams();
    
    return (
        <InfoContainer>
            <Title>미분류 내역</Title>
            <EventDescription>분류되지 않은 이벤트 내역들을 모아 정리했습니다</EventDescription>
            <NotFoundText>내역이 보이지 않나요?</NotFoundText>

            <ScrollContainer>
                {
                    billData.transactionHistoryDtoList.map((log, i) => (
                        <UnclassifiedLog e={log} key={i}/>
                    ))
                }
            </ScrollContainer>
            
        </InfoContainer>
    )
}