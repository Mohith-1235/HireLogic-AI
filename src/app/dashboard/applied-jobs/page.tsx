
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { FileText, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { getAppliedJobs, JobListing } from '@/lib/job-store';

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
    const [appliedJobs, setAppliedJobs] = useState<JobListing[]>([]);

    useEffect(() => {
        setAppliedJobs(getAppliedJobs());
    }, []);

  return (
    <>
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Applied Jobs</h1>
                <p className="text-muted-foreground">Track the status of your applications.</p>
            </div>
        </div>
        {appliedJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {appliedJobs.map((job) => (
                    <Card key={job.id} className="transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                        <CardHeader>
                            <CardTitle>{job.title}</CardTitle>
                            <CardDescription>{job.company} - {job.location}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge className={getStatusColor(job.status || 'Under Review')}>{job.status || 'Under Review'}</Badge>
                            </div>
                            <div>
                                <Progress value={job.progress || 25} className="h-2" />
                                <p className="text-xs text-muted-foreground mt-1">{job.progress || 25}% complete</p>
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
                                            <p className='text-sm text-muted-foreground'>{job.status || 'Under Review'} ({job.progress || 25}% complete)</p>
                                        </div>
                                        <div>
                                            <h3 className='font-semibold'>Next Step</h3>
                                            <p className='text-sm text-muted-foreground'>{job.nextStep || 'The hiring team is currently reviewing your application.'}</p>
                                        </div>
                                        <div>
                                            <h3 className='font-semibold'>Submitted Documents</h3>
                                            <div className='flex flex-col gap-2 mt-2'>
                                                {job.documents?.map(doc => (
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
        ) : (
            <Card>
                <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">You haven't applied for any jobs yet.</p>
                </CardContent>
            </Card>
        )}
    </>
  );
}
