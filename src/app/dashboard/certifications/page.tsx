
'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function CertificationsPage() {
  const certificateImage = PlaceHolderImages.find(p => p.id === 'google-ux-certificate');

  return (
    <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">certification you completed</h1>
                <p className="text-muted-foreground">Manage your external skill certifications.</p>
            </div>
        </div>
        <div className="flex flex-col justify-center items-center py-8">
            {certificateImage && (
                <Image
                    src={certificateImage.imageUrl}
                    alt={certificateImage.description}
                    data-ai-hint={certificateImage.imageHint}
                    width={800}
                    height={600}
                    className="rounded-lg shadow-lg"
                />
            )}
        </div>
    </>
  );
}
