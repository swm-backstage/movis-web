import styled from 'styled-components';
import { Section } from './common.styles';

export const Partners = styled(Section)`
  padding: 80px 0;
  background-color: #1a1a3a;
  text-align: center;
`;

export const PartnersTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 3rem;
`;

export const PartnerLogos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
`;

export const PartnerLogo = styled.img`
  max-height: 60px;
  max-width: 150px;
  /* filter: grayscale(100%) brightness(200%);
  transition: filter 0.3s ease;

  &:hover {
    filter: grayscale(0%) brightness(100%);
  } */
`;

export const TrustBadge = styled.div`
  margin-top: 3rem;
  font-size: 1.2rem;
  color: #b8b8b8;
`;