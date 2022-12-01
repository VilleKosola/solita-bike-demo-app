import classNames from 'classnames';

interface TableHeaderProps {
  clickFn: { (): void };
  label: string;
  ordering: 'DESC' | 'ASC';
  active: boolean;
  className: string[];
}

const TableHeader = (props: TableHeaderProps) => {
  const { clickFn, label, ordering, active, className } = props;
  return (
    <p
      className={classNames('flex', 'items-center', className)}
      onClick={clickFn}
    >
      {` ${label} `}
      {active && <i className={classNames('ml-2', 'ordering', ordering)}></i>}
    </p>
  );
};

export default TableHeader;
