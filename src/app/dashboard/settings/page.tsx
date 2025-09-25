'use client';

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Briefcase, Bot, Upload, User, Bell, Award, Settings, Palette } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center justify-between">
            <Link href="/" className="font-bold text-lg">HireLogic-AI</Link>
            <SidebarTrigger />
            </div>
            <ThemeToggle />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard">
                <SidebarMenuButton tooltip="Latest Job Updates" isActive={pathname === '/dashboard'}>
                  <Briefcase />
                  <span>Latest Job Updates</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/ai-trainer">
                <SidebarMenuButton tooltip="AI HR Interview Trainer" isActive={pathname === '/dashboard/ai-trainer'}>
                  <Bot />
                  <span>AI HR Interview Trainer</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/dashboard/resume-upload">
                  <SidebarMenuButton tooltip="Resume Upload" isActive={pathname === '/dashboard/resume-upload'}>
                    <Upload />
                    <span>Resume Upload</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/profile">
                  <SidebarMenuButton tooltip="Edit Profile" isActive={pathname === '/dashboard/profile'}>
                    <User />
                    <span>Edit Profile</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/applied-jobs">
                  <SidebarMenuButton tooltip="Applied Jobs Notifications" isActive={pathname === '/dashboard/applied-jobs'}>
                    <Bell />
                    <span>Applied Jobs</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/certifications">
                  <SidebarMenuButton tooltip="External Skill Certifications" isActive={pathname === '/dashboard/certifications'}>
                    <Award />
                    <span>Certifications</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/settings">
                  <SidebarMenuButton tooltip="Settings" isActive={pathname === '/dashboard/settings'}>
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">Manage your account and application settings.</p>
                </div>
            </div>
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>Customize the look and feel of the application.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-2'>
                                <Palette />
                                <span className='font-medium'>Theme</span>
                            </div>
                            <ThemeToggle />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
