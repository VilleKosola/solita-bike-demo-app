import React from 'react';
import { Outlet } from 'react-router-dom';
import NavItem from '../../components/navitem';

const Navigation = () => {
  const [path, setPath] = React.useState(window.location.pathname);

  return (
    <>
      <nav>
        <ul role="tablist" className="flex justify-center p-3">
          {/* TODO: Add aria-role */}
          <li
            role="tab"
            className="cursor-pointer"
            onClick={() => setPath('/journeys')}
          >
            <NavItem
              name={'Journeys'}
              path={'/journeys'}
              active={path === '/journeys'}
            />
          </li>
          <li
            role="tab"
            className="cursor-pointer"
            onClick={() => setPath('/stations')}
          >
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
