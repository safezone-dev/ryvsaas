"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type SidebarContextType = {
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;

  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

const SidebarContext =
  createContext<SidebarContextType | null>(null);

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [collapsed, setCollapsed] =
    useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "sidebar-collapsed"
      );

    if (saved === "true") {
      setCollapsed(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "sidebar-collapsed",
      String(collapsed)
    );
  }, [collapsed]);

  return (
    <SidebarContext.Provider
      value={{
        mobileOpen,
        setMobileOpen,

        collapsed,
        setCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context =
    useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "useSidebar debe estar dentro de SidebarProvider"
    );
  }

  return context;
}