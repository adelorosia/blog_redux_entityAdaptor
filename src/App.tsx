import { Outlet } from "react-router-dom";
import MainMenu from "./components/navbar/MainMenu";

const App = () => {
  return (
    <div className="wrapper bg-BACKGROUND text-FOREGROUND min-h-screen">
      <header className="bg-FOREGROUND py-2 text-BACKGROUND fixed left-0 right-0 top-0 shadow-lg">
        <MainMenu />
      </header>
      <main className="mt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
