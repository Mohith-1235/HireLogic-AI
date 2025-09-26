
'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CertificationsPage() {
  const certificateImage = PlaceHolderImages.find(p => p.id === 'google-ux-certificate');
  const certificateUrl = "https://drive.google.com/file/d/1XKKvGiKRnrErMMPcgvMINzkyAvAWvQEn/view?usp=drivesdk";

  return (
    <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
                <p className="text-muted-foreground">Manage your external skill certifications.</p>
            </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-6">Completed</h2>
        <Separator className="my-4" />

        <div className="flex flex-col justify-center items-center py-8">
            {certificateImage && (
                <Card>
                     <CardHeader>
                        <CardTitle>Google UX Design Professional Certificate</CardTitle>
                        <CardDescription>Issued by Google</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href={certificateUrl} target="_blank" rel="noopener noreferrer">
                            <Image
                                src={certificateImage.imageUrl}
                                alt={certificateImage.description}
                                data-ai-hint={certificateImage.imageHint}
                                width={800}
                                height={600}
                                className="rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
                            />
                        </Link>
                    </CardContent>
                </Card>
            )}
        </div>
    </>
  );
}
