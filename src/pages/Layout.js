import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Button } from 'baseui/button';
import { Drawer, ANCHOR } from 'baseui/drawer';
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { Client as Styletron } from "styletron-engine-monolithic";
import dragonflyImage from "./images/dragonfly.png";
import { Menu } from 'baseui/icon';

const engine = new Styletron();

const Layout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem('Admin');
    if (admin) {
      setShowAdminButton(true);
    }
    window.showAdmin = () => setShowAdminButton(true);
  }, []); 

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'InsectiDex', to: '/insects' },
    { label: 'My Insects', to: '/myinsects' },
  ];

  if (showAdminButton) {
    navItems.push({ label: 'Admin', to: '/admin' });
  }

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <style>
          {`
            @media (max-width: 600px) {
              .navigation {
                display: none;
              }
              .drawer-button {
                display: block;
              }
            }

            @media (min-width: 601px) {
              .drawer-button {
                display: none;
              }
            }
          `}
        </style>

        <nav style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          padding: '10px', 
          alignItems: 'center',
        }}>
          <img 
            src={dragonflyImage} 
            alt="Logo" 
            style={{
              height: '90px',
              transition: 'height 0.3s ease-in-out',
            }} 
          />
          <div className="navigation">
            {navItems.map(item => (
              <Button key={item.label} $as={Link} to={item.to} kind='secondary' overrides={{ BaseButton: { style: { marginRight: '10px'} } }}>
                {item.label}
              </Button>
            ))}
          </div>
          <Button className="drawer-button" onClick={() => setIsDrawerOpen(!isDrawerOpen)} kind="minimal">
            <Menu size={32} />
          </Button>
        </nav>

        <Drawer
          isOpen={isDrawerOpen}
          autoFocus
          anchor={ANCHOR.right}
          onClose={() => setIsDrawerOpen(false)}
          overrides={{
            Root: { style: { zIndex: 2 } },
            DrawerBody: { style: { marginTop: '0px' } },
            DrawerContainer: { style: { width: '250px' } }
          }}
        >
          <ul style={{ padding: '0', margin: '0' }}>
            {navItems.map(item => (
              <li key={item.label} style={{ listStyleType: 'none', padding: '10px 0' }}>
                <Link to={item.to} onClick={() => setIsDrawerOpen(false)} style={{ textDecoration: 'none', color: 'inherit', padding: '10px 20px', display: 'block' }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Drawer>

        <Outlet />
      </BaseProvider>
    </StyletronProvider>
  );
};

export default Layout;
