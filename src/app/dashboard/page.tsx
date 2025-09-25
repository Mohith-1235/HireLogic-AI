'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import { useEffect, useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Briefcase, Bot, Upload, User, Bell, Award, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type DocumentStatus = 'Not Uploaded' | 'Ready to Verify' | 'Verifying...' | 'Genuine' | 'Fraud' | 'Error';
interface DocumentState {
  id: string;
  title: string;
  mandatory: boolean;
  status: DocumentStatus;
}
const mandatoryDocIds = ['tenth', 'twelfth', 'degree'];

const jobListings = [
    { id: 1, title: 'Frontend Developer', company: 'Innovate Inc.', location: 'Remote', saved: false, applied: true, postedAt: '2 hours ago' },
    { id: 2, title: 'Backend Engineer', company: 'Data Systems', location: 'New York, NY', saved: true, applied: false, postedAt: '1 day ago' },
    { id: 3, title: 'AI/ML Specialist', company: 'Future AI', location: 'San Francisco, CA', saved: false, applied: false, postedAt: '3 days ago' },
    { id: 4, title: 'DevOps Engineer', company: 'CloudWorks', location: 'Austin, TX', saved: false, applied: false, postedAt: '5 days ago' },
    { id: 5, title: 'UI/UX Designer', company: 'Creative Solutions', location: 'Remote', saved: true, applied: true, postedAt: '1 week ago' },
];


export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const codingImage = PlaceHolderImages.find(p => p.id === 'document-verification-image');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // If user is not logged in and we're done loading, redirect to home
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    // This effect runs only on the client side
    try {
      const savedState = localStorage.getItem('hirelogic_doc_verification_state');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        const savedDocs: DocumentState[] = parsedState.documents || [];
        
        const allMandatoryVerified = mandatoryDocIds.every(id => {
            const doc = savedDocs.find(d => d.id === id);
            return doc?.status === 'Genuine';
        });

        setIsVerified(allMandatoryVerified);
      }
    } catch (e) {
      console.error("Failed to read verification state from localStorage", e);
    }
  }, []);

  // Don't render anything until we know the user's auth state
  if (isUserLoading || !user) {
    return null;
  }

  if (isVerified) {
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
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
             <main className="p-4 sm:p-6 lg:p-8 space-y-6">
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center p-4">
      <div className="flex flex-col items-center gap-8 max-w-md">
        {codingImage && (
          <div className="relative h-48 w-48">
            <Image
              src={codingImage.imageUrl}
              alt={codingImage.description}
              data-ai-hint={codingImage.imageHint}
              fill
              className="object-cover rounded-full shadow-lg"
            />
          </div>
        )}
        <div className="space-y-4">
            <h1 className="font-headline text-3xl font-bold sm:text-4xl">
                Welcome, {user.displayName || 'User'}!
            </h1>
            <p className="text-muted-foreground sm:text-lg">
                Ready to get started? Let's verify your documents to complete your profile.
            </p>
        </div>
        <Button asChild size="lg">
            <Link href="/document-verification">Start Verification</Link>
        </Button>
      </div>
    </div>
  );
}
