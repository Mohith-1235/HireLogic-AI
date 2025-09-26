
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const freeCertifications = [
    {
        id: 1,
        title: 'Mastering SQL',
        provider: 'SQL Academy',
        description: 'Learn SQL from scratch and become a data wizard. This course covers everything from basic queries to advanced topics.',
        tags: ['SQL', 'Databases', 'Data Analysis'],
        url: 'https://www.udemy.com/course/mastering-sql-with-mysql-from-basics-to-advanced/?couponCode=196D5B1B8767387C2D4E',
    },
    {
        id: 2,
        title: 'Cybersecurity Mastery: Hacking',
        provider: 'CyberSec Institute',
        description: 'Learn ethical hacking and penetration testing techniques to become a cybersecurity expert.',
        tags: ['Cybersecurity', 'Ethical Hacking', 'Penetration Testing'],
        url: '#',
    }
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
                        <CardTitle>{cert.title}</CardTitle>
                        <CardDescription>{cert.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                        <p className="text-muted-foreground">{cert.description}</p>
                         <div className="flex flex-wrap gap-2">
                            {cert.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href={cert.url} target="_blank" rel="noopener noreferrer">
                                Start Course <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </>
  );
}
