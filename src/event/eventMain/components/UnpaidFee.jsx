import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import { useParams } from 'react-router-dom';
import { getEventsUnfinished } from '../../../server/event';

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

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.p`
  font-size: 14px;
  margin: 0;
  color: #333;
`;

const ItemDate = styled.span`
  font-size: 12px;
  color: #999;
`;

const AmountAndStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Amount = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
`;

const Status = styled.span`
  font-size: 12px;
  background-color: #ffcccc;
  color: #dc3545;
  padding: 2px 6px;
  border-radius: 12px;
  margin-top: 5px;
`;

function UnpaidFee() {
  const [unpaidFeeList, setUnpaidFeeList] = useState([]);
  const clubId = useParams().clubId;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getEventsUnfinished(clubId);
      setUnpaidFeeList(response?.eventFundingListDto);
    }
    fetchData();
  }, []);

  if (unpaidFeeList.length === 0) {
    return ;
  }

  return (
    <Wrapper>
      <SectionTitle>
        <Title>납부 진행중인 모임 이벤트 {unpaidFeeList.length}건</Title>
        <AlertIcon>!</AlertIcon>
      </SectionTitle>
      <ItemList>
        {unpaidFeeList.map((event, index) => {
          const diffTime = Math.abs(new Date((new Date()).getTime() + 9 * 60 * 60 * 1000) - new Date(event.paymentDeadline));
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const eventDate = diffDays === 0 ? '오늘' : `${diffDays}일 전`;
          return (
            <>
              <Item key={index}>
                <ItemInfo>
                  <ItemName>{event.name}</ItemName>
                  <ItemDate>{eventDate}</ItemDate>
                </ItemInfo>
                <AmountAndStatus>
                  <Amount>{event.totalPaymentAmount}원</Amount>
                  <Status>납부 대기중</Status>
                </AmountAndStatus>
              </Item>
            </>
          )
          }
        )}
      </ItemList>
    </Wrapper>
  );
}

export default UnpaidFee;