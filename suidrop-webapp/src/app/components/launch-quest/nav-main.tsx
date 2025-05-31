"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { navDocumentsData } from "./nav-document"
import { useState } from "react"

interface SidebarProps {
  avtiveNav: string
}

export function NavMain({
  items,
  activeNav,
  onNavChange,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
  activeNav: string
  onNavChange: (nav: string) => void
}) {
  console.log(activeNav);
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
              onClick={() => onNavChange('quick-quests')}
            >
              <IconCirclePlusFilled />
              <span className={`flex items-center gap-2 ${activeNav === 'quick-quests' ? 'text-white' : ''}`}>
                Quick Quests
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                onClick={() => onNavChange(item.url)}
                tooltip={item.title}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
