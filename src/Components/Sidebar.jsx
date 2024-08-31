import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from './Header';
import img from '../Image/profile.svg'
import "../CSS/Sidebar.css"

const Sidebar = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="text-center">
          <img src={img} alt="" width={"50%"}/>
          <p className='fw-semibold pt-2 tag-clr'>COMPANY <span className='tag-clr'>MANAGEMENT</span></p>
        </div>
        <ul className="sidebar-menu">
          <li className="menu-item">
            <Link to="/dashboard" className='fw-normal fs-6'>Dashboard</Link>
          </li>
          <li className="menu-item">
            <Link to="/manager" className='fw-normal fs-6'>Manager</Link>
          </li>
          <li className="menu-item">
            <Link to="/employee" className='fw-normal fs-6'>Employee</Link>
          </li>
          <li className="menu-item">
            <Link to="/clients" className='fw-normal fs-6'>Clients</Link>
          </li>
          <li className="menu-item">
            <Link to="/projects" className='fw-normal fs-6'>Projects</Link>
          </li>
          <li className="menu-item">
            <Link to="/attendance" className='fw-normal fs-6'>Attendance</Link>
          </li>
          <li className="menu-item">
            <Link to="/profile" className='fw-normal fs-6'>Company setting</Link>
          </li>
        </ul>
      </aside>
      <div className="main-content">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
