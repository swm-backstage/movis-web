import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getBillList } from '../../server/bills';
import { ModalForLog } from '../components/ModalForLog';

const ListWrapper = styled.div`
  padding: 10px;
`;

const DateHeader = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
  color: #555;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
`;

const EventItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f4f4f4;
  &:last-child {
    border-bottom: none;
  }
`;

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const EventName = styled.p`
  font-size: 16px;
  margin: 0;
  color: #333;
`;

const EventTime = styled.span`
  font-size: 14px;
  color: #999;
`;

const Amount = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: ${({ color }) => color};
`;

function BillList() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const billsData = await getBillList(eventId, new Date().toISOString().split('Z')[0]);
        setBills(billsData.feeElements);
      } catch (err) {
        console.error(err);
        setError('청구 내역을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventId]);

  // 내역 날짜별 그룹화
  const groupBillsByDate = (bills) => {
    return bills.reduce((groups, bill) => {
      const dateObj = new Date(bill.paidAt);
      const dateKey = dateObj.toISOString().split('T')[0]; // 'YYYY-MM-DD'

      // 'HH:MM'으로 포맷팅
      const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push({ ...bill, time });
      return groups;
    }, {});
  };

  const groupedBills = groupBillsByDate(bills);

  // 날짜 순서 최신순 정렬
  const sortedDateKeys = Object.keys(groupedBills).sort((a, b) => new Date(b) - new Date(a));

  const handleBillClick = (bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  }

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (bills.length === 0) {
    return <div>아직 이벤트에 내역이 없습니다.</div>;
  }

  return (
    <ListWrapper>
      {sortedDateKeys.map((dateKey) => {
        const dateObj = new Date(dateKey);
        const formattedDate = dateObj.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        return (
          <div key={dateKey}>
            <DateHeader>{formattedDate}</DateHeader>
            {groupedBills[dateKey].map((bill) => (
              <EventItem key={bill.elementId} onClick={() => handleBillClick(bill)}>
                <EventInfo>
                  <EventName>{bill.name}</EventName>
                  <EventTime>{bill.time}</EventTime>
                </EventInfo>
                <Amount color={bill.amount >= 0 ? '#007bff' : '#dc3545'}>
                  {bill.amount} 원
                </Amount>
              </EventItem>
            ))}
          </div>
        );
      })}

      {isModalOpen && <ModalForLog fee={selectedBill} setIsModalOpen={setIsModalOpen}/>}
    </ListWrapper>
  );
}

export default BillList;