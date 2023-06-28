import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import '../../Styles/navbar.css';
import { useGlobalContext } from '../../Context/sidebar.context';

//need to add open modal here - with redux

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  return (
    <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
      <div className="sidebar-header">
        <button className="close-btn" type="button" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>
      <ul className="links">
        <li>
          <Link to="/" onClick={closeSidebar}>
            home
          </Link>
        </li>
        <li>
          <Link to="link" onClick={closeSidebar}>
            link1
          </Link>
        </li>
        <li>
          <Link to="/">link2</Link>
        </li>
      </ul>

      <ul className="links">
        <li>
          <Link to="/">log in / log out</Link>
        </li>
        <li>
          <Link to="createUser" className="sign-up-small">
            sign up
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
