import React, { useState } from 'react';
import styled from 'styled-components';
import NavItem from './NavItem';
import { FaBookOpen, FaHome } from 'react-icons/fa';
import { MdEventNote } from 'react-icons/md';
import { useLocation, useParams } from 'react-router-dom';

const NavBar = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  max-width: 393px;
  bottom: 0;
  padding: 0.7rem 1rem;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
`;

const navItems = [
  { label: '홈', icon: FaHome, path: "" },
  { label: '이벤트', icon: MdEventNote, path: "/events" },
  { label: '장부', icon: FaBookOpen, path: "/total" },
];

export default function NavigationBar() {
  const { clubId } = useParams();
  const location = useLocation();
  const basePath = `/clubs/${clubId}`;

  const activeItemIndex = navItems.findIndex(item => {
    if (item.path === "") {
      return location.pathname === basePath;
    }
    return location.pathname.startsWith(`${basePath}${item.path}`);
  });

  return (
    <NavBar>
      {navItems.map((item, index) => (
        <NavItem
          key={index}
          now={index}
          Icon={item.icon}
          active={activeItemIndex === index}
          path={`${basePath}${item.path}`}
        >
          {item.label}
        </NavItem>
      ))}
    </NavBar>
  );
}