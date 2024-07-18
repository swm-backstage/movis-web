import { styled } from "styled-components";
import EventLog from "../components/EventLog";
import { useEffect, useState } from "react";
import { getAllBillList } from "../../server/bills";

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const ScrollContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 400px;
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
    billList: [{
        id: 1,
        name: "로딩중",
        contents: "",
        cash: 0,
        billType: "deposit",
        bankNumber: "1234",
        bankCode: "090",
        createdAt: "2000-01-01T00:00:00"
    }],
    totalBalance: 7000000,
    totalDeposit: 10000000,
    totalWithdrawal: 3000000
}

export default function EventTotal() {
    const [billData, setBillData] = useState(mock);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllBillList();
            setBillData(response);
        }
        fetchData();
    }, []);

    return (
        <InfoContainer>
            <Title>전체 장부</Title>
            <EventDescription>전체 회비에 대한 이벤트들의 입출금 내역입니다!</EventDescription>

            <ScrollContainer>
                {
                    billData.billList.map((log, i) => (
                        <EventLog e={log} key={i} />
                    ))
                }
            </ScrollContainer>

            <SummaryContainer>
                <SummaryItem fontSize={"1.6rem"}>
                    <span>총계 (모임통장 기준)</span>
                    <SummaryValue color="#8000ff">{billData.totalBalance.toLocaleString()}원</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                    <span>총 입금</span>
                    <SummaryValue color="#00a000">{billData.totalDeposit?.toLocaleString()}원</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                    <span>총 출금</span>
                    <SummaryValue color="#ff0000">{billData.totalWithdrawal?.toLocaleString()}원</SummaryValue>
                </SummaryItem>
            </SummaryContainer>
        </InfoContainer>
    )
}