import styled from 'styled-components';
import { Section } from './common.styles';

export const ServiceInfo = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 100px 0;
`;

export const ServiceInfoTitle = styled.h2`
  font-size: 5rem;
  font-weight: bold;
`;

export const ServiceInfoDescription = styled.p`
  font-size: 1.5rem;
  color: #b8b8b8;
`;

export const EnterForm = styled.form`
  display: flex;
  gap: 1rem;
`;

export const InputBox = styled.input`
  width: 15rem;
  height: 3rem;
  padding: 0 1rem;
  border: none;
  border-radius: 5px;
`;

export const EnterButton = styled.button`
  width: 5rem;
  height: 3rem;
  border: none;
  border-radius: 5px;
  background-color: #ee5454;
  color: white;
`;