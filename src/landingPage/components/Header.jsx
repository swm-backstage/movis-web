import styled from 'styled-components';

const Header = () => (
  <HeaderWrapper>
    <LogoBox>
      <ButtonIcon src="logo.svg" alt="Movis" />
      <Logo>movis</Logo>
    </LogoBox>
    <DownloadButton>앱 다운로드</DownloadButton>
  </HeaderWrapper>
);

const LogoBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`
const ButtonIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const DownloadButton = styled.button`
  background-color: #5e3bf5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
`;

export default Header;