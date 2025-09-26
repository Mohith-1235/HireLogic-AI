
'use client';

import { Card } from '@/components/ui/card';
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
                <Card key={cert.id} className="overflow-hidden">
                    {cert.image && (
                        <div className="relative aspect-video w-full">
                            <Image
                                src={cert.image.imageUrl}
                                alt={cert.image.description}
                                data-ai-hint={cert.image.imageHint}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </Card>
            ))}
        </div>
    </>
  );
}
