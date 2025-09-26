

'use client';

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Briefcase, Bot, Upload, User, Bell, Award, Settings, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function DashboardHeader() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <div className="flex items-center gap-4 p-4 sm:p-6 lg:p-8">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex items-center gap-4 p-4 sm:p-6 lg:p-8">
      <Avatar className="h-16 w-16">
        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
        <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{user.displayName || 'User'}</h1>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If user is not logged in and we're done loading, redirect to home
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);


  // Don't render anything until we know the user's auth state
  if (isUserLoading || !user) {
    return null; // Or a loading spinner
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center justify-between">
            <Link href="/" className="font-bold text-lg">HireLogic-AI</Link>
            <SidebarTrigger />
            </div>
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
                <Link href="/dashboard/free-certification">
                  <SidebarMenuButton tooltip="Free Certification" isActive={pathname === '/dashboard/free-certification'}>
                    <GraduationCap />
                    <span>Free certification</span>
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
        <DashboardHeader />
        <main className="p-4 sm:p-6 lg:p-8 pt-0 space-y-6">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
