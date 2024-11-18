import styled from "styled-components";
import Modal from "../../components/Modal";
import { useEffect, useState } from "react";
import { getBillDetail } from "../../server/bills";

const ModalContent = styled.div`
  padding: 20px;
  max-height: 55vh;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  text-align: center;
`;

const ReceiptImage = styled.img`
  width: 100%;
  height: 300px; /* 원하는 고정 높이 */
  object-fit: cover; /* 이미지를 높이에 맞게 조정 */
  margin-top: 20px;
  border-radius: 10px;
`;

const Label = styled.p`
  font-size: 14px;
  color: #333;
  margin: 20px 0 5px;
`;

const Input = styled.div`
  font-size: 16px;
  color: #666;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f9f9f9;
`;


export function ModalForLog({fee, setIsModalOpen}) {
  const [feeDetail, setFeeDetail] = useState({payName: "", amount: 0, paidAt: "", explanation: ""});
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchFeeDetail = async () => {
      const result = await getBillDetail(fee.elementId, fee.status);
      setFeeDetail(result);
    }
    fetchFeeDetail();
  }, [fee]);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(`https://movis-bucket.s3.ap-northeast-2.amazonaws.com/billImage/${fee.elementId}.png`);
      
      if (response.ok) {
        setImage(response.url);
      }
    }
    fetchImage();
  }, [fee]);

  return (
      <Modal onClose={() => setIsModalOpen(false)}>
          <ModalContent>
            <Title>{feeDetail.payName}</Title>
            <Label>영수증</Label>
            {
              image 
              ? <ReceiptImage src={image} alt="영수증 이미지" />
              : <p>등록된 이미지가 없습니다.</p>
            }
            <Label>금액</Label>
            <Input>{feeDetail.amount.toLocaleString('ko-KR')} 원</Input>
            <Label>날짜</Label>
            <Input>{feeDetail.paidAt}</Input>
            <Label>상세 내역</Label>
            {
              feeDetail.explanation === null 
              ? <Input>상세 내역이 없습니다.</Input>
              : <Input>{feeDetail.explanation}</Input>
            }
          </ModalContent>
      </Modal>
  )
}