
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { JobApplicationForm } from '@/components/job-application-form';
import { getAllJobs, updateJob } from '@/lib/job-store';
import type { JobListing } from '@/lib/job-store';

export default function DashboardPage() {
    const [jobListings, setJobListings] = useState<JobListing[]>([]);
    const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        setJobListings(getAllJobs());
    }, []);

    const handleToggleSave = (id: number) => {
        const updatedJobs = jobListings.map(job => {
            if (job.id === id) {
                const newJob = { ...job, saved: !job.saved };
                updateJob(newJob);
                return newJob;
            }
            return job;
        });
        setJobListings(updatedJobs);
    };

    const handleApplySuccess = (id: number) => {
        const updatedJobs = jobListings.map(job => {
            if (job.id === id) {
                const newJob = { ...job, applied: true, status: 'Under Review' as const };
                updateJob(newJob);
                return newJob;
            }
            return job;
        });
        setJobListings(updatedJobs);
        setSelectedJob(null); // Close the dialog
        toast({
            title: 'Application Sent!',
            description: 'Your application has been successfully submitted.',
        });
    };

    return (
      <>
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
                  <Card key={job.id} className="flex flex-col transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
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
                        <Dialog open={selectedJob?.id === job.id} onOpenChange={(isOpen) => !isOpen && setSelectedJob(null)}>
                            <DialogTrigger asChild>
                                <Button className="w-full" onClick={() => setSelectedJob(job)} disabled={job.applied}>
                                    {job.applied ? 'Applied' : 'Apply Now'}
                                </Button>
                            </DialogTrigger>
                            {selectedJob?.id === job.id && (
                               <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Apply for {selectedJob.title}</DialogTitle>
                                        <DialogDescription>
                                            Submit your application for the position at {selectedJob.company}.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <JobApplicationForm 
                                        job={selectedJob} 
                                        onApplySuccess={() => handleApplySuccess(selectedJob.id)}
                                    />
                                </DialogContent>
                            )}
                        </Dialog>

                          <Button variant="outline" className="w-full" onClick={() => handleToggleSave(job.id)}>
                            {job.saved ? 'Unsave' : 'Save'}
                          </Button>
                      </CardFooter>
                  </Card>
              ))}
          </div>
      </>
    );
}
