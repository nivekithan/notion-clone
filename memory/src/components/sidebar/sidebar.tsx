import { ReactNode } from "react";

export type SidebarProps = {
  children: ReactNode;
};

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <section className="inline-flex flex-col h-full bg-black-sidebar-normal gap-y-2 pb-2-px ">
      {children}
    </section>
  );
};
