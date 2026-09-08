import type { FC } from "react";

const Header: FC<{ children : React.ReactNode }> = ({ children }) => {
  return (
    <h1 className="text-4xl font-bold mb-8">
      {children}
    </h1>
  );
};

export default Header;