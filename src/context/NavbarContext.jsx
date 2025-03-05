import { createContext, useContext, useState } from "react";

const NavbarContext = createContext(null);

export function NavbarProvider({ children }) {
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  function handleToggleNavbar() {
    setIsNavbarActive((prev) => !prev);
  }
  return (
    <NavbarContext.Provider
      value={{
        isNavbarActive,
        handleToggleNavbar,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  return useContext(NavbarContext);
}
