
'use client';

import { Award, ExternalLink, Download, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { generateCertificateImage } from '@/ai/flows/generate-certificate-image';
import { useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { saveAs } from 'file-saver';
import { PlaceHolderImages } from '@/lib/placeholder-images';


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
  const { user } = useUser();
  const { toast } = useToast();
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const handleDownload = async (certId: number, title: string, issuer: string) => {
    setDownloadingId(certId);
    try {
        if (certId === 1) {
            const staticCert = PlaceHolderImages.find(p => p.id === 'react-certificate-static');
            if (staticCert) {
                saveAs(staticCert.imageUrl, `${title.replace(/\s+/g, '_')}_certificate.png`);
            } else {
                throw new Error('Static certificate image not found.');
            }
        } else {
             if (!user?.displayName) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Could not find user name to generate certificate.'
                });
                return;
            }
            const result = await generateCertificateImage({
                title: title,
                issuer: issuer,
                userName: user.displayName,
            });

            if (result.imageDataUri) {
                saveAs(result.imageDataUri, `${title.replace(/\s+/g, '_')}_certificate.png`);
            } else {
                throw new Error('Image generation failed.');
            }
        }
    } catch (error: any) {
        console.error("Failed to download or generate certificate image:", error);
        toast({
            variant: 'destructive',
            title: 'Download Failed',
            description: error.message || 'Could not produce the certificate image. Please try again later.'
        });
    } finally {
        setDownloadingId(null);
    }
  };

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
                        <Button 
                            variant="secondary" 
                            className="w-full" 
                            onClick={() => handleDownload(cert.id, cert.title, cert.issuer)}
                            disabled={downloadingId === cert.id}
                        >
                            {downloadingId === cert.id && cert.id !== 1 ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Download className="mr-2 h-4 w-4" />
                            )}
                            {downloadingId === cert.id && cert.id !== 1 ? 'Generating...' : 'Download'}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </>
  );
}
