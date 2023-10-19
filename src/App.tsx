import { Outlet } from "react-router-dom";
import MainMenu from "./components/navbar/MainMenu";

const App = () => {
  return (
    <div className="wrapper bg-BACKGROUND text-FOREGROUND min-h-screen">
      <header className="py-3">
        <MainMenu />
      </header>
      <main className="mt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
