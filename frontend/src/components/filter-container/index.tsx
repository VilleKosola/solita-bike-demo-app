const FilterContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-wrap justify-between items-center">
      {children}
    </div>
  );
};

export default FilterContainer;
