import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import { getTotalInfo } from '../../../server/bills';
import { useNavigate } from 'react-router-dom';

const Title = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0;
`;

const TotalAmount = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: #000;
  margin: 10px 0;
`;

const AmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0;
`;

const AmountLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0px;
`;

const AmountIcon = styled.div`
  padding: 5px 8px;
  font-size: 12px;
  color: white;
  border-radius: 4px;
  background-color: ${({ color }) => color};
`;

const AmountText = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

const MoreOptions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  font-size: 14px;
  color: #888;
  cursor: pointer;
`;

const MoreIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  border-radius: 50%;
  margin-right: 8px;
`;

function Summary({clubId}) {
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchTotalInfo = async () => {
      const result = await getTotalInfo(clubId);
      setTotalBalance(result.totalBalance);
      setTotalDeposit(result.totalClassifiedDeposit + result.totalUnClassifiedDeposit);
      setTotalWithdrawal(result.totalClassifiedWithdrawal + result.totalUnClassifiedWithdrawal);
    }
    fetchTotalInfo();
  }, [])

  return (
    <Wrapper>
      <Title>모임 총액</Title>
      <TotalAmount>{totalBalance.toLocaleString('ko-KR')}원</TotalAmount>
      <AmountWrapper>
        <AmountLabel>
          <AmountIcon color="#0064FF">입금</AmountIcon>
          <AmountText>{totalDeposit.toLocaleString('ko-KR')}원</AmountText>
        </AmountLabel>
        <AmountLabel>
          <AmountIcon color="#EE5648">출금</AmountIcon>
          <AmountText>{totalWithdrawal.toLocaleString('ko-KR')}원</AmountText>
        </AmountLabel>
      </AmountWrapper>
      <MoreOptions onClick={() => navigate(`/clubs/${clubId}/total`)}>
        <MoreIcon>...</MoreIcon>
        장부 전체보기
      </MoreOptions>
    </Wrapper>
  );
}

export default Summary;