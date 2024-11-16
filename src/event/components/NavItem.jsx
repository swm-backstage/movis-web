import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  text-align: center;
  padding: 0.5rem 0;
  gap: 5px;
  cursor: pointer;
  color: #999999;
  font-size: 12px;

  &:hover {
    background-color: #f9f9f9;
  }

  &.active {
    color: #5F47F1;
    font-weight: bold;
  }
`;

const NavIcon = styled.div`
  font-size: 24px;
`;

const NavItem = ({ Icon, active, children, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path, { replace: true });
  };

  return (
    <StyledNavItem 
      onClick={handleClick}
      className={active ? 'active' : ''}
    >
      <NavIcon>
        <Icon />
      </NavIcon>
      {children}
    </StyledNavItem>
  );
};

export default NavItem;