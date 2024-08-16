import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavItem from './NavItem';
import { FaBookOpen, FaHome } from 'react-icons/fa';
import { MdEventNote } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import EventMain from '../eventMain/EventMain';
import EventList from '../eventList/EventList';
import EventTotal from '../eventTotal/EventTotal';
import Settings from '../Settings';
import { useParams } from 'react-router-dom';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const navItems = [
  { label: '메인페이지', 'icon': FaHome, 'component': <EventMain /> },
  { label: '이벤트 관리', 'icon': MdEventNote, 'component': <EventList/> },
  { label: '전체 장부', 'icon': FaBookOpen, 'component': <EventTotal/> },
  // { label: '설정', 'icon': IoMdSettings, 'component': <Settings/> },
];

export default function NavigationBar({ handleSelectedBody }) {
  const [activeItem, setActiveItem] = useState(0);
  const { clubId } = useParams();

  useEffect(() => {
    handleSelectedBody(navItems[activeItem].component)
  }, [activeItem]);

  return (
    <NavBar>
      {navItems.map((item, index) => (
        <NavItem
          key={index} now={index}
          Icon={item.icon}
          active={{item: activeItem, setItem: setActiveItem}}
          clubId={clubId}
        >
          {item.label}
        </NavItem>
      ))}
    </NavBar>
  );
}
