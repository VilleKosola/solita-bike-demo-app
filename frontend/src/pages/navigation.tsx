import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav>
        <ul className="flex justify-center p-3 cursor-pointer">
          <li>
            <Link to="/journeys" className={window.location.pathname === '/journeys' ? 'p-3 bg-slate-600 text-white' : 'p-3 bg-slate-200'}>Journeys</Link>
          </li>
          <li>
            <Link to="/stations"  className={window.location.pathname === '/stations' ? 'p-3 bg-slate-600 text-white' : 'p-3 bg-slate-200'}>Stations</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Navigation;