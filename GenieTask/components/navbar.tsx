import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

export const Navbar = () => {
 

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="border shadow">
      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="center">
    
    <NavbarItem as={NextLink} href="/" className="flex items-center">
    Kanban
      </NavbarItem>  
      <NavbarItem as={NextLink} href="/customers" className="flex items-center">
    Customers
      </NavbarItem>  
       </NavbarContent>
   
      
    
    </HeroUINavbar>
  );
};
