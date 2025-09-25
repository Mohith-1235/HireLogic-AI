'use client';

import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const jobListings = [
    { id: 1, title: 'Frontend Developer', company: 'Innovate Inc.', location: 'Remote', saved: false, applied: true, postedAt: '2 hours ago' },
    { id: 2, title: 'Backend Engineer', company: 'Data Systems', location: 'New York, NY', saved: true, applied: false, postedAt: '1 day ago' },
    { id: 3, title: 'AI/ML Specialist', company: 'Future AI', location: 'San Francisco, CA', saved: false, applied: false, postedAt: '3 days ago' },
    { id: 4, title: 'DevOps Engineer', company: 'CloudWorks', location: 'Austin, TX', saved: false, applied: false, postedAt: '5 days ago' },
    { id: 5, title: 'UI/UX Designer', company: 'Creative Solutions', location: 'Remote', saved: true, applied: true, postedAt: '1 week ago' },
];

export default function DashboardPage() {
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
      </>
    );
}
