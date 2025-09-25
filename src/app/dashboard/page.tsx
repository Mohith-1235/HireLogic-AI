'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import { useEffect } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Briefcase, Bot, Upload, User, Bell, Award, Search, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

const jobListings = [
    { id: 1, title: 'Frontend Developer', company: 'Innovate Inc.', location: 'Remote', saved: false, applied: true, postedAt: '2 hours ago' },
    { id: 2, title: 'Backend Engineer', company: 'Data Systems', location: 'New York, NY', saved: true, applied: false, postedAt: '1 day ago' },
    { id: 3, title: 'AI/ML Specialist', company: 'Future AI', location: 'San Francisco, CA', saved: false, applied: false, postedAt: '3 days ago' },
    { id: 4, title: 'DevOps Engineer', company: 'CloudWorks', location: 'Austin, TX', saved: false, applied: false, postedAt: '5 days ago' },
    { id: 5, title: 'UI/UX Designer', company: 'Creative Solutions', location: 'Remote', saved: true, applied: true, postedAt: '1 week ago' },
];

function DashboardHeader() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
        <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Welcome back, {user.displayName || 'User'}!</h1>
        <p className="text-muted-foreground">{user.email}</p>
      </div>
    </div>
  )
}


export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If user is not logged in and we're done loading, redirect to home
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);


  // Don't render anything until we know the user's auth state
  if (isUserLoading || !user) {
    return null;
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
                <DashboardHeader />
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Latest Job Updates</h1>
                        <p className="text-muted-foreground">Fresh opportunities curated for you.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search jobs..." className="pl-9" />
                        </div>
                        <Button>Search</Button>
                    </div>
                </div>

                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobListings.map((job) => (
                        <Card key={job.id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle>{job.title}</CardTitle>
                                <CardDescription>{job.company} - {job.location}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>Posted {job.postedAt}</span>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    {job.applied && <Badge variant="secondary">Applied</Badge>}
                                    {job.saved && <Badge variant="outline">Saved</Badge>}
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                <Button className="w-full">Apply Now</Button>
                                <Button variant="outline" className="w-full">{job.saved ? 'Unsave' : 'Save'}</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </SidebarInset>
      </SidebarProvider>
    );
}
