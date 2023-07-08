const getMenus = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
};

const saveMenus = (menus,key="menus") => {
  localStorage.setItem(key, JSON.stringify(menus));
};

const clearMenus = () => {
  localStorage.removeItem("menus");
};

export {getMenus, saveMenus, clearMenus };
