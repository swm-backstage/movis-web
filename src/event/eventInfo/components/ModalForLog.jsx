import styled from "styled-components";
import Modal from "../../../components/Modal";

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
    background-image: url(${(props) => props.imageUrl});
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

export default function ModalForLog({ onModal, logId }) {
    if (!onModal.enabled) return null;

    // API 붙여야 함
    const mock = {
        id: 1,
        name: "임시 기록1",
        date: "2024-06-30T00:00",
        cash: 10000,
        imageUrl: null,
        details: "임시 기록1의 상세 내용입니다.",
    };

    const formattedDate = new Date(mock.date).toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return (
        <Modal onClose={() => onModal.enable(false)}>
            <ModalTitle>{mock.name}</ModalTitle>
            <ModalContent>
                <TextContainer>
                    <p>날짜</p>
                    <p>{formattedDate}</p>
                </TextContainer>

                <TextContainer>
                    <p>금액</p>
                    <p>{mock.cash} 원</p>
                </TextContainer>

                <TextContainer>
                    <p>영수증</p>
                    <ChangeButton>이미지 변경</ChangeButton>
                </TextContainer>
                <ImageArea imageUrl={mock.imageUrl} />

                <TextContainer>
                    <p>상세</p>
                    <ChangeButton>내용 변경</ChangeButton>
                </TextContainer>
                <DetailArea>
                    {mock.details}
                </DetailArea>

            </ModalContent>
        </Modal>
    );
}
