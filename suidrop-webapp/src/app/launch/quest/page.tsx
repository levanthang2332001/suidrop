'use client'
import React, { useState } from 'react';
import { AppSidebar } from '@/app/components/launch-quest/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SiteHeader } from '@/app/components/launch-quest/side-header';
import Navbar from '../../layout/Navbar';

const Page = () => {
  const [activeNav, setActiveNav] = useState('quick-quests');
    return (
      <>
      {/* <Navbar /> */}
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar onNavChange={setActiveNav} />
        <SidebarInset>
          <SiteHeader activeNav={activeNav} />
        </SidebarInset>
      </SidebarProvider>
      </>
    )
}

export default Page;