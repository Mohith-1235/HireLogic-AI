'use client';

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Briefcase, Bot, Upload, User, Bell, Award, ExternalLink, Settings } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

const certifications = [
    {
        id: 1,
        title: 'React - The Complete Guide',
        issuer: 'Udemy',
        url: '#',
    },
    {
        id: 2,
        title: 'Google UX Design Professional Certificate',
        issuer: 'Coursera',
        url: '#',
    },
    {
        id: 3,
        title: 'Certified JavaScript Developer',
        issuer: 'W3Schools',
        url: '#',
    },
];

export default function CertificationsPage() {
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
                    <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
                    <p className="text-muted-foreground">Manage your external skill certifications.</p>
                </div>
                <Button>Add New Certification</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert) => (
                    <Card key={cert.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{cert.title}</CardTitle>
                            <CardDescription>Issued by {cert.issuer}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            {/* Can add more details here if needed */}
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline" className="w-full">
                                <a href={cert.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    View Credential
                                </a>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
