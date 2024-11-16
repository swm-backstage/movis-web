import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FeeSummary from './FeeSummary';
import FeeList from './FeeList';
import { useParams } from 'react-router-dom';
import { getAllBillList } from '../../server/bills';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

function FeeTotalPage() {
  const [totalInfo, setTotalInfo] = useState({});
  const clubId = useParams().clubId;

  useEffect(()=>{
    const fetchTotalInfo = async () => {
      const result = await getAllBillList(clubId, new Date().toISOString().split('Z')[0], "first", 999);
      setTotalInfo(result);
    }
    fetchTotalInfo();
  }, [])

  return (
    <PageWrapper>
        <Title>전체 장부</Title>
        <FeeSummary totalInfo={totalInfo}/>
        <FeeList totalInfo={totalInfo}/>
    </PageWrapper>
  );
}

export default FeeTotalPage;