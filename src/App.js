import logo from "./logo.svg";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import MenuTable from "components/menuTable";
import { fetchMenu } from "gateways/fetchMenu";

function App() {
  const [menu, setMenu] = useState([]);

  const fetchMenuItems = useCallback(async () => {
    const response = await fetchMenu();
    console.log("resonse is  === ", response);
    setMenu(response);
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  return <MenuTable data={menu} />;
}

export default App;
