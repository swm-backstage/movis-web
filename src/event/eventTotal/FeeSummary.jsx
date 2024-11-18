import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getExcelFile } from '../../server/excel';
import ModalForExcel from './ModalForExcel';

const SummaryWrapper = styled.div`
  padding: 20px 0px;
  border-top: 3px solid #9747FF;
  border-bottom: 2px solid #9747FF;
`
const TotalSummary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const DetailInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const Title = styled.p`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin: 0 0 10px;
`;

const TotalAmount = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #6c5ce7;
  /* margin: 0 0 20px; */
`;

const DownloadButton = styled.button`
  height: 40px;
  background-color: #28a745;
  color: white;
  padding: 0px 15px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
`;

const DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const DetailLabel = styled.span`
  font-size: 16px;
  color: #333;
`;

const DetailAmount = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${({ color }) => color || '#333'};
`;

const SubDetail = styled.span`
  font-size: 12px;
  color: #999;
  margin-left: 5px;
`;

function FeeSummary({totalInfo}) {
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  const [isFileDownloading, setIsFileDownloading] = useState(false);
  const clubId = useParams().clubId;

  useEffect(() => {
    if (totalInfo) {
      setTotalBalance(totalInfo.totalBalance);
      setTotalDeposit(totalInfo.totalClassifiedDeposit + totalInfo.totalUnClassifiedDeposit);
      setTotalWithdrawal(totalInfo.totalClassifiedWithdrawal + totalInfo.totalUnClassifiedWithdrawal);
    }
  }, [totalInfo]);

  const handleExcelClick = () => {
    setIsFileDownloading(true);
    const downloadFile = async () => {
      await getExcelFile(clubId);
      setIsFileDownloading(false);
    }
    downloadFile();
  }

  return (
    <SummaryWrapper>
      { isFileDownloading && <ModalForExcel setIsModalOpen={setIsFileDownloading}/> }
      <TotalSummary>
        <div>
          <Title>입출 총액</Title>
          <TotalAmount>{totalBalance?.toLocaleString('ko-KR')} 원</TotalAmount>
        </div>
        <DownloadButton onClick={() => handleExcelClick()}>엑셀 다운로드</DownloadButton>
      </TotalSummary>
      <DetailWrapper>
        <DetailInfo>
          <DetailLabel>총 입금</DetailLabel>
          <div>
            <DetailAmount color="#007bff">{totalDeposit.toLocaleString('ko-KR')} 원</DetailAmount>
            <SubDetail>(미분류 {totalInfo?.totalUnClassifiedDeposit?.toLocaleString('ko-KR')}원 포함)</SubDetail>
          </div>
        </DetailInfo>
      </DetailWrapper>
      <DetailWrapper>
        <DetailInfo>
          <DetailLabel>총 출금</DetailLabel>
          <div>
            <DetailAmount color="#dc3545">{totalWithdrawal.toLocaleString('ko-KR')} 원</DetailAmount>
            <SubDetail>(미분류 {totalInfo?.totalUnClassifiedWithdrawal?.toLocaleString('ko-KR')}원 포함)</SubDetail>
          </div>
        </DetailInfo>
      </DetailWrapper>
    </SummaryWrapper>
  );
}

export default FeeSummary;