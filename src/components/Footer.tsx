import type { FC } from "react";

const Footer: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="text-sm text-gray-400">{children}</div>;
};

export default Footer;
