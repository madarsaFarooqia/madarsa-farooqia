import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLanguage } from "../../lib/LanguageContext";

export default function Layout() {
  const { currentLang } = useLanguage();
  return (
    <div dir={currentLang.dir} className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
