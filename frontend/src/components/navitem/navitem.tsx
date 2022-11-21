import { Link } from 'react-router-dom';

interface navitemprops {
  name: string;
  path: string;
  active: boolean;
}

const NavItem = (props: navitemprops) => {
  return (
    <Link
      to={props.path}
      className={
        props.active ? 'p-3 bg-slate-600 text-white' : 'p-3 bg-slate-200'
      }
    >
      {props.name}
    </Link>
  );
};

export default NavItem;
