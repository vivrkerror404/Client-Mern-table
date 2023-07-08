function MenuParser(menus = []) {
  // TODO: no need to use menuparese if we use find({}) at BE side
  const menuCategories = menus.map((menu) => menu.categories);
  const allMenus = menuCategories.flat();
  return allMenus.map((menu) => ({ ...menu, oldPrice: menu.price })); // no need to do this if we create new column in model
}

export { MenuParser };
