
'use client';

import { Award, ExternalLink, Eye, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { generateCertificateImage } from '@/ai/flows/generate-certificate-image';
import { useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';


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
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const handleShowCertificate = async (certId: number, title: string, issuer: string) => {
    setGeneratingId(certId);
    setSelectedTitle(title);
    try {
        let imageUrl: string | undefined;

        if (certId === 1) {
            const staticCert = PlaceHolderImages.find(p => p.id === 'react-certificate-static');
            imageUrl = staticCert?.imageUrl;
            if (!imageUrl) {
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

            imageUrl = result.imageDataUri;
            if (!imageUrl) {
                throw new Error('Image generation failed.');
            }
        }
        
        setSelectedImage(imageUrl);
        setIsModalOpen(true);

    } catch (error: any) {
        console.error("Failed to generate or show certificate image:", error);
        toast({
            variant: 'destructive',
            title: 'Action Failed',
            description: error.message || 'Could not produce the certificate image. Please try again later.'
        });
    } finally {
        setGeneratingId(null);
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
                            onClick={() => handleShowCertificate(cert.id, cert.title, cert.issuer)}
                            disabled={generatingId === cert.id}
                        >
                            {generatingId === cert.id && cert.id !== 1 ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Eye className="mr-2 h-4 w-4" />
                            )}
                            {generatingId === cert.id && cert.id !== 1 ? 'Generating...' : 'Show'}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{selectedTitle || 'Certificate'}</DialogTitle>
                </DialogHeader>
                {selectedImage && (
                    <div className="relative aspect-video w-full">
                        <Image
                            src={selectedImage}
                            alt={selectedTitle || 'Certificate Image'}
                            fill
                            className="object-contain"
                        />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    </>
  );
}
