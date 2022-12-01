const AppHeader = (props: { headerTitle: string }) => {
  return (
    <header className="App-header h-10 flex justify-center">
      {props.headerTitle}
    </header>
  );
};

export default AppHeader;
