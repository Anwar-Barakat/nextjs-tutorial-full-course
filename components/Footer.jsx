import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: <BsGithub /> },
    { name: "Twitter", href: "https://twitter.com", icon: <BsTwitter /> },
    { name: "LinkedIn", href: "https://linkedin.com", icon: <BsLinkedin /> },
  ];

  return (
    <footer className="bg-card mt-auto">
      <div className="container px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Image src="/next.svg" alt="Logo" width={100} height={24} />
            <p className="mt-4 text-muted-foreground">
              Building the future of web development with Next.js
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
