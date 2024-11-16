import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import { ModalForLog } from '../components/ModalForLog';

const FeeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f4f4f4;
  &:last-child {
    border-bottom: none;
  }
`;

const FeeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeeName = styled.p`
  font-size: 14px;
  margin: 0;
  color: #333;
`;

const FeeDate = styled.span`
  font-size: 12px;
  color: #999;
`;

const Amount = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  color: #8C8C8C; /* 회색으로 수정 */
`;

function FeeList({totalInfo}) {
  const [feeElements, setFeeElements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  useEffect(() => {
    if (totalInfo) {
      setFeeElements(totalInfo.feeElements);
    }
  }, [totalInfo]);

  if (!feeElements) {
    return <div>아직 입출 내역이 없습니다.</div>;
  }

  const handleFeeClick = (fee) => {
    setSelectedFee(fee);
    setIsModalOpen(true);
  }

  return (
    <div>
      {feeElements?.map((fee, index) => (
        <FeeItem key={index} onClick={() => handleFeeClick(fee)}>
          <FeeInfo>
            <FeeName>{fee.name}</FeeName>
            <FeeDate>{fee.date}</FeeDate>
          </FeeInfo>
          <Amount>{fee.amount} 원</Amount>
        </FeeItem>
      ))}

      {isModalOpen && <ModalForLog fee={selectedFee} setIsModalOpen={setIsModalOpen}/>}
    </div>
  );
}

export default FeeList;