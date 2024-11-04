import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { verifyMember } from '../../server/entry';

export default function EntryCodeForm() {
  // 입장에 필요한 정보
  const [entryCode, setEntryCode] = useState('')
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // 반환 값
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setEntryCode(event.target.value);
  }

  const handleEntry = async () => {
    if (!entryCode) {
      setError('입장코드를 입력해주세요');
      return;
    }
    if (!name || !phoneNumber) {
      setError('이름과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      removeToken();
      const {clubId, accessToken, refreshToken} = await verifyMember(name, phoneNumber, entryCode);
      setTokenToSesssionStorage(accessToken, refreshToken);
      
      if (!clubId){
        throw Error()
      }
      navigate(`/clubs/${clubId}`);

    } catch (err) {
      setError(err.message || '입장에 실패했습니다.');
    }
  };

  const removeToken = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  }

  const setTokenToSesssionStorage = (accessToken, refreshToken) => {
    if (accessToken) {
      sessionStorage.setItem('accessToken', accessToken);
    }
    if (refreshToken) {
      sessionStorage.setItem('refreshToken', refreshToken);
    }
  }

  return (
    <FormWrapper>
      <FormTitle>
        초대받은 <Highlight>모임코드</Highlight>가 있나요?
      </FormTitle>
      <Subtitle>모임코드를 입력하고 모비스를 시작해 보세요!</Subtitle>
      {error && <ErrorText>{error}</ErrorText>}
      <Form>
        <Input 
          type="text"
          value={entryCode}
          placeholder="입장 코드 입력" 
          onChange={handleInputChange}
        />
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름 입력"
        />
        <Input
          id="phoneNumber"
          type="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="전화번호 입력"
        />
        <SubmitButton onClick={handleEntry}>시작하기</SubmitButton>
      </Form>
    </FormWrapper>
  )
  
};

const FormWrapper = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: #fff;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #000;
`;

const Highlight = styled.span`
  color: #5e3bf5;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 55px;
  max-width: 360px;
  padding: 12px 16px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  width: 100%;
  max-width: 360px;
  padding: 12px 16px;
  background-color: #5e3bf5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
`;

const ErrorText = styled.p`
    color: red;
    font-size: 0.9em;
    margin-bottom: 20px;
`;