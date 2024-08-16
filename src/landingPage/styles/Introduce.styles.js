import styled from 'styled-components';
import { Section } from './common.styles';

export const Introduce = styled(Section)`
  padding: 80px 0;
  background-color: #1a1a3a;
  text-align: center;
`;

export const IntroduceTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

export const FeatureContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
`;

export const FeatureCard = styled.div`
  background-color: #2a2a4a;
  padding: 2rem;
  border-radius: 10px;
  width: 25%;
`;

export const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const FeatureDescription = styled.p`
  color: #b8b8b8;
`;