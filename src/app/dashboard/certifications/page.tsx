
'use client';

import { ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const certifications = [
    {
        id: 1,
        title: 'React - The Complete Guide',
        issuer: 'Udemy',
        url: '#',
    },
    {
        id: 2,
        title: 'Google UX Design Professional Certificate',
        issuer: 'Coursera',
        url: '#',
    },
    {
        id: 3,
        title: 'Certified JavaScript Developer',
        issuer: 'W3Schools',
        url: '#',
    },
];

export default function CertificationsPage() {
  return (
    <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
                <p className="text-muted-foreground">Manage your external skill certifications.</p>
            </div>
            <Button>Add New Certification</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
                <Card key={cert.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle>{cert.title}</CardTitle>
                        <CardDescription>Issued by {cert.issuer}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        {/* Can add more details here if needed */}
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Button asChild variant="outline" className="w-full">
                            <a href={cert.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Credential
                            </a>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </>
  );
}
