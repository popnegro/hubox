import React from "react";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-shrink-0 bg-gray-900 text-white lg:block">
      <div className="flex h-16 items-center justify-center">
        <h1 className="text-2xl font-bold text-white">HuBox</h1>
      </div>
      <nav className="mt-8">
        <SidebarNav />
      </nav>
    </aside>
  );
}