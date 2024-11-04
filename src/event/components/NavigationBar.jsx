import React, { useState } from 'react';
import styled from 'styled-components';
import NavItem from './NavItem';
import { FaBookOpen, FaHome } from 'react-icons/fa';
import { MdEventNote } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const NavBar = styled.nav`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  bottom: 0;
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const navItems = [
  { label: '메인페이지', 'icon': FaHome, 'path': "" },
  { label: '이벤트 관리', 'icon': MdEventNote, 'path': "/events" },
  { label: '전체 장부', 'icon': FaBookOpen, 'path': "/total"},
  // { label: '설정', 'icon': IoMdSettings, 'component': <Settings/> },
];

export default function NavigationBar() {
  const [activeItem, setActiveItem] = useState(0);
  const { clubId } = useParams();

  return (
    <NavBar>
      {navItems.map((item, index) => (
        <NavItem
          key={index} now={index}
          Icon={item.icon}
          active={{item: activeItem, setItem: setActiveItem}}
          path={"/clubs/"+clubId+navItems[index].path}
        >
          {item.label}
        </NavItem>
      ))}
    </NavBar>
  );
}
