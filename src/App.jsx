import "./App.css";
import { Menu } from "./Components/Menu/Menu";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { useState } from "react";
import cookie from "react-cookies";
function App() {
  cookie.load("expense_currency")
    ? ""
    : cookie.save("expense_currency", JSON.stringify({ currency: "RS." }));

  const [menuSelected, setMenuSelected] = useState(<Dashboard />);
  const selectMenu = (menu) => {
    setMenuSelected(menu);
  };
  return (
    <div className="h-full grid">
      <div>
        <Menu menuselected={selectMenu} />
      </div>
      <div className="m-4 border-2 bg-slate-50 pl-2 pr-2 pt-2">
        {menuSelected}
      </div>
    </div>
  );
}

export default App;
