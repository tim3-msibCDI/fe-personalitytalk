"use client";

import { ADMIN_MENU, PSIKOLOG_MENU } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function SidebarMenu({ menuType }) {
  // Pilih menu berdasarkan `menuType` yang diterima dari `Sidebar`
  const menu = menuType === "admin" ? ADMIN_MENU : PSIKOLOG_MENU;

  // State untuk melacak menu utama dan submenu yang aktif
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  // Fungsi untuk menangani klik pada menu utama
  const handleMenuClick = (id) => {
    setActiveMenu(id);
    setActiveDropdown(id === activeDropdown ? null : id); // Toggle dropdown jika ada submenu
    setActiveSubMenu(null); // Reset submenu yang aktif ketika menu utama diklik
  };

  // Fungsi untuk menangani klik pada submenu
  const handleSubMenuClick = (id) => {
    setActiveSubMenu(id);
  };

  return (
    <div>
      <div className="px-6">
        {/* Logo */}
        <div className="py-10">
          <Image
            src="/image/logo.webp"
            alt="Logo"
            width={180}
            height={66}
          />
        </div>
      </div>
      <hr />
      <div>
        <div className="mt-5 text-s text-textdarkchoco">
          {/* Menu Item */}
          {menu.map((item) => (
            <div key={item.id}>
              {/* Menu Utama */}
              <div
                className={`cursor-pointer py-3 px-6 group flex gap-3 items-center 
                  ${activeMenu === item.id ? 'bg-primary text-white font-semibold' : ''}`}
                onClick={() => handleMenuClick(item.id)}
              >
                <Image
                  src={activeMenu === item.id ? item.iconhover : item.icon}
                  alt={item.title}
                  width={20}
                  height={20}
                  className="transition-all duration-300"
                />
                <span className="transition-all duration-300">{item.title}</span>

                {/* Ikon Dropdown dengan rotasi */}
                {item.subMenu && (
                  <Image
                    src="/icons/sidebar/arrow.svg"
                    alt="Dropdown Icon"
                    width={16}
                    height={16}
                    className={`ml-auto transition-transform duration-300 ${activeDropdown === item.id ? "rotate-180" : ""
                      }`}
                  />
                )}
              </div>

              {/* Submenu */}
              {item.subMenu && activeDropdown === item.id && (
                <div className="mt-2">
                  {item.subMenu.map((subItem) => (
                    <Link key={subItem.id} href={subItem.url}>
                      <div
                        onClick={() => handleSubMenuClick(subItem.id)}
                        className={`flex gap-3 pl-12 py-2 px-6 cursor-pointer transition-all duration-300 
                          ${activeSubMenu === subItem.id ? 'bg-primary text-white font-semibold' : ''}`}
                      >
                        <Image
                          src={activeSubMenu === subItem.id ? subItem.iconhover : subItem.icon}
                          alt={subItem.title}
                          width={20}
                          height={20}
                          className="transition-all duration-300"
                        />
                        <span>{subItem.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
