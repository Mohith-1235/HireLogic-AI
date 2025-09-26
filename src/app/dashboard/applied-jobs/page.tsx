
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { FileText, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';


const appliedJobs = [
    { 
        id: 1, 
        title: 'Frontend Developer', 
        company: 'Innovate Inc.', 
        location: 'Remote', 
        status: 'Interviewing', 
        progress: 75,
        appliedAt: '2 weeks ago',
        description: 'Innovate Inc. is seeking a passionate Frontend Developer to build beautiful and performant user interfaces for our next-generation products. You will work with React, Next.js, and Tailwind CSS.',
        documents: [ { name: 'Resume.pdf', url: '#' } ],
        nextStep: 'Second Round Interview: Technical Assessment on March 15th, 2024'
    },
    { 
        id: 5, 
        title: 'UI/UX Designer', 
        company: 'Creative Solutions', 
        location: 'Remote', 
        status: 'Under Review', 
        progress: 25,
        appliedAt: '1 week ago',
        description: 'Creative Solutions is looking for a talented UI/UX Designer to create intuitive and engaging experiences for our clients. You will be responsible for the entire design process from concept to final hand-off.',
        documents: [ { name: 'Resume.pdf', url: '#' }, { name: 'Portfolio.pdf', url: '#' } ],
        nextStep: 'The hiring team is currently reviewing your application.'
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Interviewing':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
        case 'Under Review':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
}

export default function AppliedJobsPage() {
  return (
    <>
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Applied Jobs</h1>
                <p className="text-muted-foreground">Track the status of your applications.</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appliedJobs.map((job) => (
                <Card key={job.id}>
                    <CardHeader>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>{job.company} - {job.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Status</span>
                            <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                        </div>
                        <div>
                            <Progress value={job.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">{job.progress}% complete</p>
                        </div>
                        <p className="text-sm text-muted-foreground">Applied {job.appliedAt}</p>
                    </CardContent>
                    <CardFooter>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full">View Application</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg">
                                <DialogHeader>
                                    <DialogTitle className='text-2xl'>{job.title}</DialogTitle>
                                    <DialogDescription>
                                        {job.company} - {job.location}
                                    </DialogDescription>
                                </DialogHeader>
                                <Separator />
                                <div className='space-y-4'>
                                    <div>
                                        <h3 className='font-semibold'>Job Description</h3>
                                        <p className='text-sm text-muted-foreground'>{job.description}</p>
                                    </div>
                                    <div>
                                        <h3 className='font-semibold'>Application Status</h3>
                                        <p className='text-sm text-muted-foreground'>{job.status} ({job.progress}% complete)</p>
                                    </div>
                                     <div>
                                        <h3 className='font-semibold'>Next Step</h3>
                                        <p className='text-sm text-muted-foreground'>{job.nextStep}</p>
                                    </div>
                                    <div>
                                        <h3 className='font-semibold'>Submitted Documents</h3>
                                        <div className='flex flex-col gap-2 mt-2'>
                                            {job.documents.map(doc => (
                                                <Link key={doc.name} href={doc.url} className='text-sm text-primary hover:underline flex items-center gap-2'>
                                                    <FileText size={16} /> {doc.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </>
  );
}
