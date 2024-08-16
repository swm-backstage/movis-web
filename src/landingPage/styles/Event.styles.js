import styled from 'styled-components';
import { Section, CTAButton } from './common.styles';

export const Event = styled(Section)`
  padding: 80px 0;
  background-color: #0f0f23;
`;

export const EventTitle = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
`;

export const EventCardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

export const EventCard = styled.div`
  background-color: #1a1a3a;
  border-radius: 10px;
  overflow: hidden;
  width: 300px;
`;

export const EventImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const EventContent = styled.div`
  padding: 1.5rem;
`;

export const EventName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const EventDescription = styled.p`
  color: #b8b8b8;
  margin-bottom: 1rem;
`;

export const EventDate = styled.p`
  font-size: 0.9rem;
  color: #8b8b8b;
`;

export const EventButton = styled(CTAButton)`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
`;