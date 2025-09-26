
'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const certificate = PlaceHolderImages.find(p => p.id === 'react-certificate-g-vignesh');

export default function CertificationsPage() {
  return (
    <>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">certification you completed</h1>
                <p className="text-muted-foreground">Manage your external skill certifications.</p>
            </div>
        </div>
        <div className="flex justify-center items-center py-8">
            {certificate && (
                <div className="relative w-full max-w-2xl">
                    <Image
                        src={certificate.imageUrl}
                        alt={certificate.description}
                        data-ai-hint={certificate.imageHint}
                        width={1000}
                        height={750}
                        className="object-contain rounded-lg shadow-lg"
                    />
                </div>
            )}
        </div>
    </>
  );
}
