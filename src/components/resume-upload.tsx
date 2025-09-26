'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { UploadCloud, File as FileIcon, X, BrainCircuit, Tags, Loader2 } from 'lucide-react';
import { analyzeResume, AnalyzeResumeOutput } from '@/ai/flows/analyze-resume';
import { useToast } from '@/hooks/use-toast';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_FILE_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

export function ResumeUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalyzeResumeOutput | null>(null);
    const { toast } = useToast();

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
        setAnalysisResult(null);
        setError(null);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setError(null);
        setAnalysisResult(null);
    };

    const handleAnalyzeResume = async () => {
        if (!file) return;

        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);
        
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const fileDataUri = reader.result as string;

                const result = await analyzeResume({ 
                    resumeFile: {
                        url: fileDataUri,
                        contentType: file.type
                    }
                });

                if (result) {
                    setAnalysisResult(result);
                } else {
                     toast({
                        variant: 'destructive',
                        title: 'Analysis Failed',
                        description: 'Could not analyze the resume. Please try again.',
                    });
                }
            };
            reader.onerror = (error) => {
                throw new Error("Error reading file.");
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred during analysis.');
            toast({
                variant: 'destructive',
                title: 'Analysis Error',
                description: err.message || 'An unexpected error occurred.',
            });
        } finally {
            setIsLoading(false);
        }
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
                                <Button className="w-full" onClick={handleAnalyzeResume} disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        'Analyze Resume'
                                    )}
                                </Button>
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
                       {isLoading && <p className="text-muted-foreground text-sm">Analyzing, please wait...</p>}
                       {analysisResult ? (
                         <>
                            <Separator />
                            <div className="space-y-2">
                                <h4 className="font-semibold flex items-center gap-2"><BrainCircuit size={18}/> Inferred Domains</h4>
                                <div className="flex flex-wrap gap-2">
                                    {analysisResult.domains.map(domain => (
                                        <Badge key={domain.name} variant="secondary">{domain.name} ({domain.confidence})</Badge>
                                    ))}
                                </div>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <h4 className="font-semibold flex items-center gap-2"><Tags size={18}/> Top Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {analysisResult.skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
                                </div>
                            </div>
                         </>
                       ) : (
                         !isLoading && <p className="text-muted-foreground text-sm">Upload a resume and click "Analyze" to see results.</p>
                       )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
