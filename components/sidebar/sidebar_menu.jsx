"use client";

import { ADMIN_MENU, PSIKOLOG_MENU } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function SidebarMenu({ menuType }) {
  const menu = menuType === "admin" ? ADMIN_MENU : PSIKOLOG_MENU;

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleMenuClick = (id, hasSubMenu) => {
    setActiveMenu(id);
    setActiveDropdown(hasSubMenu ? (id === activeDropdown ? null : id) : null); 
    setActiveSubMenu(null);
  };

  const handleSubMenuClick = (id) => {
    setActiveSubMenu(id);
  };

  return (
    <div>
      <div className="px-6">
        <div className="py-10">
          <Image src="/image/logo.webp" alt="Logo" width={180} height={66} />
        </div>
      </div>
      <hr />
      <div>
        <div className="mt-5 text-s text-textdarkchoco">
          {menu.map((item) => (
            <div key={item.id}>
              <Link href={item.url} passHref>
                <div
                  className={`cursor-pointer py-3 px-6 group flex gap-3 items-center
                    ${!item.subMenu && activeMenu === item.id ? 'bg-primary text-white font-semibold' : ''}`}
                  onClick={() => handleMenuClick(item.id, item.subMenu)}
                >
                  <Image
                    src={
                      !item.subMenu && activeMenu === item.id
                        ? item.iconhover
                        : item.icon
                    }
                    alt={item.title}
                    width={20}
                    height={20}
                    className="transition-all duration-300"
                  />
                  <span className="transition-all duration-300">{item.title}</span>

                  {item.subMenu && (
                    <Image
                      src="/icons/sidebar/arrow.svg"
                      alt="Dropdown Icon"
                      width={16}
                      height={16}
                      className={`ml-auto transition-transform duration-300 ${
                        activeDropdown === item.id ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </Link>

              {item.subMenu && activeDropdown === item.id && (
                <div className="mt-2">
                  {item.subMenu.map((subItem, subIndex) => (
                    <Link key={subIndex} href={subItem.url} passHref>
                      <div
                        onClick={() => handleSubMenuClick(subIndex)}
                        className={`flex gap-3 pl-12 py-2 px-6 cursor-pointer transition-all duration-300 
                          ${activeSubMenu === subIndex ? 'bg-primary text-white font-semibold' : ''}`}
                      >
                        <Image
                          src={
                            activeSubMenu === subIndex
                              ? subItem.iconhover
                              : subItem.icon
                          }
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
