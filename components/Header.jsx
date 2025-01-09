"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between px-6 mx-auto">
        {/* Logo and Branding */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              NextJS
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-accent/10 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>

        {/* Navigation Menu */}
        <div
          className={`
            absolute left-0 right-0 top-16 bg-background border-b md:border-none
            md:static md:block ${isMenuOpen ? "block" : "hidden"}
            transition-all duration-200 ease-in-out
          `}
        >
          <NavigationMenu className="w-full md:w-auto">
            <NavigationMenuList className="flex-col md:flex-row space-y-1 md:space-y-0 p-4 md:p-0">
              {links.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-9 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:pointer-events-none disabled:opacity-50 md:w-max">
                      {link.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
