const changMyClass = (userPathname, ADMIN_PAGE, menuState) => {
    if (userPathname !== ADMIN_PAGE) {
      return menuState ? 'side-menu-container aside-menu-show' : 'side-menu-container aside-menu-hide'
    }
    return menuState ? 'admin-side-bar-container aside-menu-show' : 'admin-side-bar-container aside-menu-hide'
  } 

  export default changMyClass;