
'use client';

import { ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const completedCertifications = [
  {
    id: 1,
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google',
    date: '2023-10-26',
    credentialUrl: '#',
    image: PlaceHolderImages.find(p => p.id === 'google-ux-certificate'),
  }
];

export default function CertificationsPage() {
  return (
    <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">certification you completed</h1>
                <p className="text-muted-foreground">Manage your external skill certifications.</p>
            </div>
            <Button>Add New Certification</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCertifications.map((cert) => (
                <Card key={cert.id} className="flex flex-col">
                    {cert.image && (
                        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                            <Image
                                src={cert.image.imageUrl}
                                alt={cert.image.description}
                                data-ai-hint={cert.image.imageHint}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle>{cert.title}</CardTitle>
                        <CardDescription>{cert.issuer}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">Completed on {cert.date}</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                                View Credential <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </>
  );
}
