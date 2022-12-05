import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface NavItemProps {
  name: string;
  path: string;
  active: boolean;
}

const NavItem = (props: NavItemProps) => {
  return (
    <Link
      to={props.path}
      className={classNames(
        props.active ? 'p-3 bg-slate-600 text-white' : 'p-3 bg-slate-200',
        'hover:bg-slate-300'
      )}
    >
      {props.name}
    </Link>
  );
};

export default NavItem;
