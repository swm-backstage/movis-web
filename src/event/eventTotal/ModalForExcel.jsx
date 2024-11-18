import React from 'react';
import styled, { keyframes } from 'styled-components';

// 배경 오버레이 스타일
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 창 스타일
const ModalContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  position: relative;
`;

// 로딩 스피너 애니메이션
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// 스피너 스타일
const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #9747FF;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${rotate} 1s linear infinite;
  margin: 0 auto 20px auto;
`;

// 닫기 버튼 스타일
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ModalForExcel = ({ setIsModalOpen }) => {
  return (
    <Overlay>
      <ModalContainer>
        {/* <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton> */}
        <Spinner />
        <p>엑셀 파일을 다운로드 중입니다...</p>
      </ModalContainer>
    </Overlay>
  );
};

export default ModalForExcel;