'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { UploadCloud, File as FileIcon, X, BrainCircuit, Tags } from 'lucide-react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_FILE_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

export function ResumeUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [useMock, setUseMock] = useState(true);

    const handleFileChange = (selectedFile: File | null) => {
        if (!selectedFile) return;
    
        if (selectedFile.size > MAX_FILE_SIZE) {
          setError(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit.`);
          return;
        }
        if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
          setError('Invalid file type. Only PDF, DOCX, and TXT are allowed.');
          return;
        }
    
        setFile(selectedFile);
        setError(null);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setError(null);
    };

    return (
        <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Resume Upload</CardTitle>
                        <CardDescription>Upload your resume to get started. We'll analyze it to infer your domain and skills.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {!file ? (
                             <div 
                                className="flex flex-col items-center justify-center space-y-2 rounded-md border-2 border-dashed border-muted p-12 text-center"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                e.preventDefault();
                                handleFileChange(e.dataTransfer.files[0]);
                                }}
                            >
                                <UploadCloud className="h-12 w-12 text-muted-foreground" />
                                <p className="text-lg font-medium">Drag & drop your resume here</p>
                                <p className="text-muted-foreground">or</p>
                                <Input 
                                    id="resume-upload"
                                    type="file" 
                                    className="sr-only" 
                                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                                    accept={ALLOWED_FILE_TYPES.join(',')}
                                />
                                <Button asChild>
                                    <label htmlFor="resume-upload">Browse Files</label>
                                </Button>
                                <p className="pt-4 text-xs text-muted-foreground">Supports: PDF, DOCX, TXT (Max 10MB)</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-md border p-4">
                                    <div className="flex items-center gap-4">
                                        <FileIcon className="h-8 w-8" />
                                        <div>
                                            <p className="font-semibold">{file.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>
                                <Button className="w-full">Analyze Resume</Button>
                            </div>
                        )}
                        {error && <p className="text-sm text-destructive text-center">{error}</p>}
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                         <CardTitle>Analysis Results</CardTitle>
                         <CardDescription>Inferred domains and skills from your resume will appear here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Switch id="mock-mode" checked={useMock} onCheckedChange={setUseMock} />
                            <Label htmlFor="mock-mode">Use Mock Analysis</Label>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <h4 className="font-semibold flex items-center gap-2"><BrainCircuit size={18}/> Inferred Domains</h4>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">Frontend (High)</Badge>
                                <Badge variant="secondary">UI/UX (Medium)</Badge>
                            </div>
                        </div>
                        <Separator />
                         <div className="space-y-2">
                            <h4 className="font-semibold flex items-center gap-2"><Tags size={18}/> Top Skills</h4>
                            <div className="flex flex-wrap gap-2">
                               <Badge>React</Badge>
                               <Badge>TypeScript</Badge>
                               <Badge>CSS</Badge>
                               <Badge>Next.js</Badge>
                               <Badge>Figma</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
