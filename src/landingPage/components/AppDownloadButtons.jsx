import styled from 'styled-components';

const AppDownloadButtons = () => (
  <AppLinks>
    <AppButton>
      <ButtonIcon src="oneStore.svg" alt="App Store" />
      <div>
        <p>Download on</p>
        <p>One Store</p>
      </div>
    </AppButton>
    <AppButton>
      <ButtonIcon src="playStore.svg" alt="Google Play" />
      <div>
        <p>GET IT ON</p>
        <p>Google Play</p>
      </div>
    </AppButton>
  </AppLinks>
);



const AppLinks = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 16px;
`;

const AppButton = styled.button`
    display: flex;
    align-items: center;
    background: #fff;
    border: 1px solid #ccc;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    text-align: start;
`;

const ButtonIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 8px;
`;

export default AppDownloadButtons;