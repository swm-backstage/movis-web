// MenuItem.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 18px;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const MenuItem = ({ to, label }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(to);
  };

  return (
    <Item onClick={handleNavigation}>
      {label}
      <IoIosArrowForward />
    </Item>
  );
};

export default MenuItem;
