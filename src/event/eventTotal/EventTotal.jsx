import { styled } from "styled-components";
import EventLog from "../components/EventLog";
import { useEffect, useState } from "react";
import { getAllBillList } from "../../server/bills";
import { useParams } from "react-router-dom";

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    height: 100%;
`

const ScrollContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
`

const EventDescription = styled.p`
    color: #8b8b8b;
`

const SummaryContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 10px;

    & > :first-child {
        grid-column: span 2;
    }
`

const ExcelButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;

    color: white;
    background-color: green;
`

const SummaryItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: ${props => props.fontSize || "1.2rem"};
`

const SummaryValue = styled.span`
    /* font-size: 20px; */
    font-weight: bold;
    color: ${props => props.color || "#000"};
`

const mock = {
    "feeElements": [
        {
            "transactionHistoryId": "uuid1",
            "status": "BILL",
            "id": "uuid1",
            "name": "로딩중",
            "amount": 0,
            "paidAt": "2000-01-01T00:00:00"
        }
    ],
    "isLast": false,
    "totalBalance": -1,
    "totalClassifiedDeposit": -1,
    "totalUnClassifiedDeposit": -1,
    "totalClassifiedWithdrawal": -1,
    "totalUnClassifiedWithdrawal": 0
}

export default function EventTotal() {
    const [totalData, setTotalData] = useState(mock);
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const now = new Date();
            const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
            const formattedDateTime = kstNow.toISOString().split('.')[0];
    
            const response = await getAllBillList(params.clubId, formattedDateTime, "first", 20);
            setTotalData(response);
        }
        fetchData();
    }, []);

    return (
        <InfoContainer>
            <Title>전체 장부</Title>
            <EventDescription>전체 회비에 대한 이벤트들의 입출금 내역입니다!</EventDescription>

            <ScrollContainer>
                {
                    totalData.feeElements.map((log, i) => (
                        <EventLog e={log} key={i} />
                    ))
                }
            </ScrollContainer>

            <ExcelButton>엑셀 변환하기</ExcelButton>

            <SummaryContainer>
                <SummaryItem fontSize={"1.6rem"}>
                    <span>총계 (모임통장 기준)</span>
                    <SummaryValue color="#8000ff">{totalData.totalBalance.toLocaleString()}원</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                    <span>총 입금</span>
                    <SummaryValue color="#00a000">{(totalData.totalClassifiedDeposit + totalData.totalUnClassifiedDeposit)?.toLocaleString()}원</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                    <span>총 출금</span>
                    <SummaryValue color="#ff0000">{(totalData.totalClassifiedWithdrawal + totalData.totalUnClassifiedWithdrawal)?.toLocaleString()}원</SummaryValue>
                </SummaryItem>
            </SummaryContainer>
        </InfoContainer>
    )
}