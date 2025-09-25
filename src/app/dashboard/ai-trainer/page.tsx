
import { AiHrInterviewTrainer } from '@/components/ai-hr-interview-trainer';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Briefcase, Bot, Upload, User, Bell, Award } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export default function AiTrainerPage() {
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
              <Link href="/dashboard" legacyBehavior passHref>
                <SidebarMenuButton tooltip="Latest Job Updates">
                  <Briefcase />
                  <span>Latest Job Updates</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/ai-trainer" legacyBehavior passHref>
                <SidebarMenuButton tooltip="AI HR Interview Trainer">
                  <Bot />
                  <span>AI HR Interview Trainer</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/dashboard/resume-upload" legacyBehavior passHref>
                  <SidebarMenuButton tooltip="Resume Upload">
                    <Upload />
                    <span>Resume Upload</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/profile" legacyBehavior passHref>
                  <SidebarMenuButton tooltip="Edit Profile">
                    <User />
                    <span>Edit Profile</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/applied-jobs" legacyBehavior passHref>
                  <SidebarMenuButton tooltip="Applied Jobs Notifications">
                    <Bell />
                    <span>Applied Jobs</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/certifications" legacyBehavior passHref>
                  <SidebarMenuButton tooltip="External Skill Certifications">
                    <Award />
                    <span>Certifications</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-8">
            <AiHrInterviewTrainer />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
