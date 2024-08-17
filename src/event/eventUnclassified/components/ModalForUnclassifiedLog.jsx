import styled from "styled-components";
import Modal from "../../../components/Modal";
import { useEffect, useState } from "react";
import { getBillDetail } from "../../../server/bills";

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const ImageArea = styled.div`
    width: 100%;
    height: 300px;
    background-image: url(${(props) => props.$imageurl});
    background-color: lightgray;
`

const DetailArea = styled.div`
    width: calc(100% - padding);
    padding: 10px;

    border: 1px solid black;
    /* background-color: lightgray; */
`

const ChangeButton = styled.button`
    min-width: 100px;
`

const ModalTitle = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
`

const mock = {
    payName: "로딩중",
    paidAt: "2000-01-01T00:00",
    amount: 10000,
    image: null,
    explanation: "로딩중입니다.",
};

export default function ModalForUnclassifiedLog({ onModal, logId, type }) {
    const [billData, setBillData] = useState(mock);
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await getBillDetail(logId, type);
            setBillData(response);
        };
        fetchData();
    }, [logId]);

    useEffect(() => {
        setFormattedDate(new Date(billData.paidAt).toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }));
    }, [billData]);

    if (!onModal.enabled) return null;

    return (
        <Modal onClose={() => onModal.enable(false)}>
            <ModalTitle>{billData.payName}</ModalTitle>
            <ModalContent>
                <TextContainer>
                    <p>날짜</p>
                    <p>{formattedDate}</p>
                </TextContainer>

                <TextContainer>
                    <p>금액</p>
                    <p>{billData.amount} 원</p>
                </TextContainer>

                <TextContainer>
                    <p>영수증</p>
                    <ChangeButton>이미지 변경</ChangeButton>
                </TextContainer>
                <ImageArea $imageurl={billData.image} />

                <TextContainer>
                    <p>상세</p>
                    <ChangeButton>내용 변경</ChangeButton>
                </TextContainer>
                <DetailArea>
                    {billData.explanation}
                </DetailArea>

            </ModalContent>
        </Modal>
    );
}
