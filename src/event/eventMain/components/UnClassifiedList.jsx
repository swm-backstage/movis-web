import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import { getUnclassifiedBillList } from '../../../server/bills';
import { useNavigate } from 'react-router-dom';
import { sendMessageToNative } from '../../../server/reactNative';
import { messageToUnClassified } from '../../../constants/messageToRN';

const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #dc3545;
  margin: 0;
`;

const AlertIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #EE5648;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const ItemList = styled.div`
  margin-bottom: 15px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f4f4f4;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const CircleIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
  margin-right: 10px;
`;

const Name = styled.p`
  font-size: 14px;
  margin: 0;
`;

const Amount = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
`;

const MoreOptions = styled.div`
  display: flex;
  align-items: center;
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

function Details({clubId}) {
  const [unClassifiedList, setUnClassifiedList] = useState([]);
  const navigate = useNavigate();
  const colorBoard = {
    FEE: '#007bff',
    BILL: '#dc3545',
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUnclassifiedBillList(clubId);
      setUnClassifiedList(data?.transactionHistoryDtoList);
    }
    fetchData();
  }, []);

  // if (unClassifiedList.length === 0) {
  //   return ;
  // }

  return (
    <Wrapper>
      <SectionTitle>
        <Title>미분류 내역 {unClassifiedList.length}건</Title>
        <AlertIcon>!</AlertIcon>
      </SectionTitle>
      <ItemList>
        {unClassifiedList.map((item, index) => (
          <Item key={index}>
            <Left>
              <CircleIcon color={colorBoard[item.status]}>{item.status === 'FEE' ? '입금' : '출금'}</CircleIcon>
              <Name>{item.name}</Name>
            </Left>
            <Amount>{item.amount.toLocaleString('ko-KR')}원</Amount>
          </Item>
        ))}
      </ItemList>
      <MoreOptions onClick={() => sendMessageToNative(messageToUnClassified(clubId))}>
        <MoreIcon>...</MoreIcon>
        미분류 이벤트 전체보기
      </MoreOptions>
    </Wrapper>
  );
}

export default Details;