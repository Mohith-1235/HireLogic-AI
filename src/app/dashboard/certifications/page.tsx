
'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
        <Tabs defaultValue="completed" className="w-full">
            <TabsList>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            </TabsList>
            <TabsContent value="completed">
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
            </TabsContent>
            <TabsContent value="in-progress">
                <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">No certifications in progress.</p>
                </div>
            </TabsContent>
        </Tabs>
    </>
  );
}
