import styled from "styled-components";
import Modal from "../../../components/Modal";
import { useEffect, useState } from "react";
import { getBillDetail, getUnclassifiedBillList } from "../../../server/bills";

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
    id: 1,
    name: "로딩중",
    date: "2000-01-01T00:00",
    cash: 10000,
    imageUrl: null,
    details: "로딩중입니다.",
};

export default function ModalForUnclassifiedLog({ onModal, logId }) {
    const [billData, setBillData] = useState(mock);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUnclassifiedBillList(logId);
            setBillData(response);
        };
        fetchData();
    }, [logId]);

    const formattedDate = new Date(billData.date).toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    if (!onModal.enabled) return null;

    return (
        <Modal onClose={() => onModal.enable(false)}>
            <ModalTitle>{billData.name}</ModalTitle>
            <ModalContent>
                <TextContainer>
                    <p>날짜</p>
                    <p>{formattedDate}</p>
                </TextContainer>

                <TextContainer>
                    <p>금액</p>
                    <p>{billData.cash} 원</p>
                </TextContainer>

                <TextContainer>
                    <p>영수증</p>
                    <ChangeButton>이미지 변경</ChangeButton>
                </TextContainer>
                <ImageArea $imageurl={billData.imageUrl} />

                <TextContainer>
                    <p>상세</p>
                    <ChangeButton>내용 변경</ChangeButton>
                </TextContainer>
                <DetailArea>
                    {billData.details}
                </DetailArea>

            </ModalContent>
        </Modal>
    );
}
