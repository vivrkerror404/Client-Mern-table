import { useCallback, useEffect, useState } from "react";
import MenuTable from "components/menuTable";
import { fetchMenu } from "gateways/fetchMenu";
import { saveMenus, getMenus } from "utils/localState";

function App() {
  const [menu, setMenu] = useState([]);

  const fetchMenuItems = useCallback(async () => {
    const response = await fetchMenu();
    setMenu(response);
  }, []);

  const updateMenuPrice = useCallback((type, { row, updatedPrice }) => {
    setMenu((menus) => {
      const updatedMenuInd = menus.findIndex(
        (menu) => menu["_id"] === row?.original?._id
      );
      if (updatedMenuInd > -1) {
        menus[updatedMenuInd].price =
          type === "save" && updatedPrice ? updatedPrice : menus[updatedMenuInd].oldPrice;
        saveMenus(menus);
        return [...menus]
      }
      return menus;
    });
  }, []);

  const handleSave = useCallback(
    (row, updatedPrice) => updateMenuPrice("save", { row, updatedPrice }),
    [updateMenuPrice]
  );

  const handleReset = useCallback(
    (row) => updateMenuPrice("reset", { row }),
    [updateMenuPrice]
  );

  useEffect(() => {
    if(fetchMenuItems){
      const menus = getMenus("menus");
      menus ? setMenu(menus) : fetchMenuItems();
    }
  }, [fetchMenuItems]);

  return (
    <MenuTable data={menu} handleSave={handleSave} handleReset={handleReset} />
  );
}

export default App;
