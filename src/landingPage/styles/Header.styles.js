import styled from 'styled-components';
import { Section } from './common.styles';

export const Header = styled(Section)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 10px;
  background-color: #101032;
`;

export const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const HeaderDescription = styled.p`
  color: #8b8b8b;
`;