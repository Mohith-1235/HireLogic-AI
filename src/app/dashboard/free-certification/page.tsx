
'use client';

import { ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const freeCertifications = [
    {
        id: 1,
        title: 'Google Analytics for Beginners',
        issuer: 'Google',
        url: '#',
        category: 'Marketing',
    },
    {
        id: 2,
        title: 'Introduction to Python',
        issuer: 'DataCamp',
        url: '#',
        category: 'Programming',
    },
    {
        id: 3,
        title: 'Social Media Marketing',
        issuer: 'HubSpot Academy',
        url: '#',
        category: 'Marketing',
    },
    {
        id: 4,
        title: 'JavaScript Algorithms and Data Structures',
        issuer: 'freeCodeCamp',
        url: '#',
        category: 'Programming',
    },
];

export default function FreeCertificationPage() {
  return (
    <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Free Certifications</h1>
                <p className="text-muted-foreground">Explore free certifications to boost your skills.</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeCertifications.map((cert) => (
                <Card key={cert.id} className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>{cert.title}</CardTitle>
                            <Badge variant="secondary">{cert.category}</Badge>
                        </div>
                        <CardDescription>Issued by {cert.issuer}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        {/* Can add more details here if needed */}
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Button asChild variant="default" className="w-full">
                            <a href={cert.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Start Course
                            </a>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </>
  );
}
