import React from "react";
import { SidebarNav } from "./SidebarNav";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white">Menu</h2>
        </div>
        <nav className="mt-8">
          <SidebarNav onLinkClick={onClose} />
        </nav>
      </aside>
    </>
  );
}