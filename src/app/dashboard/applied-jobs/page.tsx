'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const appliedJobs = [
    { 
        id: 1, 
        title: 'Frontend Developer', 
        company: 'Innovate Inc.', 
        location: 'Remote', 
        status: 'Interviewing', 
        progress: 75,
        appliedAt: '2 weeks ago',
    },
    { 
        id: 5, 
        title: 'UI/UX Designer', 
        company: 'Creative Solutions', 
        location: 'Remote', 
        status: 'Under Review', 
        progress: 25,
        appliedAt: '1 week ago',
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
                        <Button variant="outline" className="w-full">View Application</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </>
  );
}
