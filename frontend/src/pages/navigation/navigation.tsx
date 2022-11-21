import React from 'react';
import { Outlet } from 'react-router-dom';
import NavItem from '../../components/navitem/navitem';

const Navigation = () => {
  const [path, setPath] = React.useState(window.location.pathname);

  return (
    <>
      <nav>
        <ul className="flex justify-center p-3 cursor-pointer">
          <li onClick={() => setPath('/journeys')}>
            <NavItem
              name={'Journeys'}
              path={'/journeys'}
              active={path === '/journeys'}
            />
          </li>
          <li onClick={() => setPath('/stations')}>
            <NavItem
              name={'Stations'}
              path={'/stations'}
              active={path === '/stations'}
            />
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Navigation;
