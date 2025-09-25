"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { UploadCloud, File as FileIcon, X, CheckCircle, XCircle, AlertCircle, Clock, ExternalLink, Download } from 'lucide-react';

// --- Types ---
type DocumentStatus = 'Not Uploaded' | 'Ready to Verify' | 'Verifying...' | 'Genuine' | 'Fraud' | 'Error';
interface DocumentState {
  id: string;
  title: string;
  mandatory: boolean;
  status: DocumentStatus;
  file?: File;
  digilockerUri?: string;
  error?: string;
}
type LogEntry = {
  timestamp: string;
  message: string;
};

const initialDocuments: DocumentState[] = [
  { id: 'tenth', title: '10th Marksheet', mandatory: true, status: 'Not Uploaded' },
  { id: 'twelfth', title: '12th Marksheet', mandatory: true, status: 'Not Uploaded' },
  { id: 'degree', title: 'Degree/B.Tech Certificate', mandatory: true, status: 'Not Uploaded' },
  { id: 'mtech', title: 'M.Tech Certificate', mandatory: false, status: 'Not Uploaded' },
  { id: 'ms', title: 'MS Certificate', mandatory: false, status: 'Not Uploaded' },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];


export function DocumentVerification() {
  const [documents, setDocuments] = useState<DocumentState[]>(initialDocuments);
  const [isMockMode, setIsMockMode] = useState(true);
  const [isDigiLockerLinked, setIsDigiLockerLinked] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((message: string) => {
    const newLog = {
      timestamp: new Date().toLocaleTimeString(),
      message,
    };
    setLogs(prev => [newLog, ...prev]);
  }, []);

  useEffect(() => {
    // Restore state from localStorage on mount
    try {
      const savedState = localStorage.getItem('hirelogic_doc_verification_state');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // We don't store files, so we merge statuses and other metadata
        const restoredDocs = initialDocuments.map(doc => {
            const savedDoc = parsedState.documents?.find((d: DocumentState) => d.id === doc.id);
            if (savedDoc) {
                return { ...doc, status: savedDoc.status, digilockerUri: savedDoc.digilockerUri };
            }
            return doc;
        });
        setDocuments(restoredDocs);
        setIsDigiLockerLinked(parsedState.isDigiLockerLinked || false);
        addLog("Session restored.");
      } else {
        addLog("Initialized new session.");
      }
    } catch (e) {
      console.error("Failed to restore state from localStorage", e);
      addLog("Could not restore previous session.");
    }
  }, [addLog]);

  useEffect(() => {
    // Persist state to localStorage on change
    try {
      const stateToSave = {
        documents: documents.map(({ file, ...rest }) => rest), // Don't store the file object
        isDigiLockerLinked,
      };
      localStorage.setItem('hirelogic_doc_verification_state', JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }, [documents, isDigiLockerLinked]);


  const updateDocument = (id: string, updates: Partial<DocumentState>) => {
    setDocuments(prev => prev.map(doc => doc.id === id ? { ...doc, ...updates } : doc));
  };

  const handleFileChange = (id: string, file: File | null) => {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      updateDocument(id, { error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit.` });
      return;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      updateDocument(id, { error: 'Invalid file type. Only PDF, JPG, and PNG are allowed.' });
      return;
    }

    updateDocument(id, { file, status: 'Ready to Verify', digilockerUri: undefined, error: undefined });
    addLog(`Uploaded file for ${documents.find(d => d.id === id)?.title}.`);
  };

  const handleRemoveFile = (id: string) => {
    updateDocument(id, { file: undefined, status: 'Not Uploaded', digilockerUri: undefined, error: undefined });
    addLog(`Removed file for ${documents.find(d => d.id === id)?.title}.`);
  };

  const handleLinkDigiLocker = () => {
    addLog("Attempting to link DigiLocker...");
    // Mock OAuth flow
    window.open('/document-verification?digilocker=success', '_blank');
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('digilocker') === 'success') {
      setIsDigiLockerLinked(true);
      addLog("DigiLocker linked successfully.");
      // In a real app, you might close the popup or handle the redirect.
    }
  }, [addLog]);

  const handlePickFromDigiLocker = (id: string) => {
    addLog(`Picking from DigiLocker for ${documents.find(d => d.id === id)?.title}...`);
    // Mock API call and selection
    setTimeout(() => {
      const docTitle = documents.find(d => d.id === id)?.title || "document";
      const mockUri = `dl:/${id}/mock-document-${Date.now()}.pdf`;
      updateDocument(id, { digilockerUri: mockUri, status: 'Ready to Verify', file: undefined, error: undefined });
      addLog(`Picked '${docTitle}' from DigiLocker.`);
    }, 1000);
  };

  const handleVerify = async (id: string) => {
    const doc = documents.find(d => d.id === id);
    if (!doc || (doc.status !== 'Ready to Verify' && doc.status !== 'Error' && doc.status !== 'Fraud')) return;

    updateDocument(id, { status: 'Verifying...', error: undefined });
    addLog(`Verifying ${doc.title}...`);

    // --- Mock Verification Logic ---
    if (isMockMode) {
      setTimeout(() => {
        let newStatus: DocumentStatus = 'Genuine';
        const docName = doc.file?.name.toLowerCase() || doc.title.toLowerCase();
        if (docName.includes('fake') || doc.id === 'mtech') newStatus = 'Fraud';
        else if (!docName.includes('valid')) newStatus = Math.random() > 0.5 ? 'Genuine': 'Fraud';

        updateDocument(id, { status: newStatus });
        addLog(`Mock verification for ${doc.title} complete: ${newStatus}.`);
      }, 2000);
      return;
    }
    
    // --- Real API call (placeholder) ---
    try {
        // const body = doc.digilockerUri 
        //     ? { docType: doc.id, source: 'digilocker', digilockerUri: doc.digilockerUri }
        //     : { docType: doc.id, source: 'upload', fileHash: 'sha256-...' /* compute hash */ };
        // const response = await fetch('/api/digilocker/verify', { method: 'POST', body: JSON.stringify(body) });
        // const result = await response.json();
        // updateDocument(id, { status: result.status });
        // addLog(`API verification for ${doc.title} complete: ${result.status}.`);
        updateDocument(id, { status: 'Error', error: 'API endpoint not implemented.' });
        addLog(`API verification failed for ${doc.title}: Endpoint not available.`);
    } catch(err) {
        updateDocument(id, { status: 'Error', error: 'Verification failed.' });
        addLog(`API verification failed for ${doc.title}.`);
    }
  };

  const handleVerifyAll = () => {
    documents.forEach(doc => {
      if(doc.status === 'Ready to Verify') {
        handleVerify(doc.id);
      }
    });
    addLog("Verification started for all ready documents.");
  };

  const handlePrintReceipt = () => {
    const verifiedDocs = documents.filter(d => d.status === 'Genuine' || d.status === 'Fraud');
    if(verifiedDocs.length === 0) {
      alert("No documents have been verified yet.");
      return;
    }

    const receiptContent = `
      <style>
        body { font-family: system-ui, sans-serif; margin: 2rem; background: #fff; color: #000; }
        h1, h2 { border-bottom: 1px solid #808080; padding-bottom: 0.5rem; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { border: 1px solid #808080; padding: 0.5rem; text-align: left; }
        footer { margin-top: 2rem; font-size: 0.8rem; color: #808080; }
      </style>
      <h1>HireLogic-AI Verification Receipt</h1>
      <p>Date: ${new Date().toLocaleString()}</p>
      <h2>Verified Documents</h2>
      <table>
        <thead>
          <tr>
            <th>Document</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${verifiedDocs.map(doc => `<tr><td>${doc.title}</td><td>${doc.status}</td></tr>`).join('')}
        </tbody>
      </table>
      <footer>
        <p>© ${new Date().getFullYear()} HireLogic-AI. This is a system-generated receipt.</p>
      </footer>
    `;
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(receiptContent);
    printWindow?.document.close();
    printWindow?.print();
    addLog("Generated verification receipt.");
  };

  const mandatoryDocs = documents.filter(d => d.mandatory);
  const optionalDocs = documents.filter(d => !d.mandatory);
  const mandatorySubmittedCount = mandatoryDocs.filter(d => d.status !== 'Not Uploaded').length;
  const optionalSubmittedCount = optionalDocs.filter(d => d.status !== 'Not Uploaded').length;
  const allMandatorySubmitted = mandatorySubmittedCount === mandatoryDocs.length;
  const overallStatus = allMandatorySubmitted 
    ? (documents.some(d => d.status === 'Fraud') ? 'Issues Found' : (documents.every(d => d.status === 'Genuine' || d.status === 'Not Uploaded' && !d.mandatory) ? 'All Genuine' : 'Pending Verification'))
    : 'Pending Documents';

  const StatusBadge = ({ status }: { status: DocumentStatus }) => {
    const variants: { [key in DocumentStatus]: { icon: React.ReactNode, text: string, className: string } } = {
        'Not Uploaded': { icon: <XCircle className="h-4 w-4" />, text: 'Not Uploaded', className: 'bg-muted text-muted-foreground' },
        'Ready to Verify': { icon: <UploadCloud className="h-4 w-4" />, text: 'Ready to Verify', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' },
        'Verifying...': { icon: <Clock className="h-4 w-4 animate-spin" />, text: 'Verifying...', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' },
        'Genuine': { icon: <CheckCircle className="h-4 w-4" />, text: 'Genuine', className: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
        'Fraud': { icon: <XCircle className="h-4 w-4" />, text: 'Fraud', className: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
        'Error': { icon: <AlertCircle className="h-4 w-4" />, text: 'Error', className: 'bg-destructive text-destructive-foreground' },
    };
    const { icon, text, className } = variants[status] || variants['Not Uploaded'];

    // Overriding colors for monochrome theme.
    const monochromeStyles: { [key in DocumentStatus]: string } = {
        'Not Uploaded': 'border-dashed border-gray-400 text-gray-500',
        'Ready to Verify': 'border-solid border-foreground text-foreground',
        'Verifying...': 'border-solid border-gray-500 text-gray-500 animate-pulse',
        'Genuine': 'border-solid border-foreground bg-foreground text-background font-bold',
        'Fraud': 'border-solid border-destructive bg-destructive text-destructive-foreground font-bold',
        'Error': 'border-solid border-destructive text-destructive font-bold underline',
    };
    
    return (
      <Badge variant="outline" className={`gap-2 ${monochromeStyles[status]}`}>
        {icon}
        <span>{text}</span>
      </Badge>
    );
  };
  
  const DocumentCard = ({ doc }: { doc: DocumentState }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{doc.title}</CardTitle>
          <Badge variant={doc.mandatory ? "destructive" : "secondary"}>{doc.mandatory ? 'Mandatory' : 'Optional'}</Badge>
        </div>
        <CardDescription>
          <StatusBadge status={doc.status} />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {doc.status !== 'Not Uploaded' ? (
          <div className="flex items-center justify-between rounded-md border border-border p-3">
            <div className="flex items-center gap-3">
              <FileIcon className="h-6 w-6" />
              <div className='truncate'>
                <p className="font-medium truncate">{doc.file?.name || doc.digilockerUri}</p>
                {doc.file && <p className="text-sm text-muted-foreground">{Math.round(doc.file.size / 1024)} KB</p>}
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(doc.id)} aria-label="Remove file">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div 
            className="flex flex-col items-center justify-center space-y-2 rounded-md border-2 border-dashed border-muted p-6"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileChange(doc.id, e.dataTransfer.files[0]);
            }}
          >
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
            <p className="text-center text-sm text-muted-foreground">Drag & drop file or</p>
            <Input 
              id={`file-upload-${doc.id}`}
              type="file" 
              className="sr-only" 
              onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] || null)}
              accept={ALLOWED_FILE_TYPES.join(',')}
            />
            <Button asChild variant="outline">
                <label htmlFor={`file-upload-${doc.id}`}>Select File</label>
            </Button>
          </div>
        )}
        
        {isDigiLockerLinked && doc.status === 'Not Uploaded' && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <Button variant="secondary" className="w-full" onClick={() => handlePickFromDigiLocker(doc.id)}>
              <ExternalLink className="mr-2 h-4 w-4" /> Pick from DigiLocker
            </Button>
          </>
        )}
        {doc.error && <p className="text-sm text-destructive">{doc.error}</p>}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={() => handleVerify(doc.id)} 
          disabled={doc.status !== 'Ready to Verify' && doc.status !== 'Error' && doc.status !== 'Fraud'}>
          {doc.status === 'Genuine' || doc.status === 'Fraud' ? 'Re-verify' : 'Verify'}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
        <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Document Verification</h1>
            <p className="text-muted-foreground">Upload or link your documents for verification. All documents are used solely for verification purposes.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-semibold">Mandatory Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mandatoryDocs.map(doc => <DocumentCard key={doc.id} doc={doc} />)}
                </div>
                <Separator />
                <h2 className="text-2xl font-semibold">Optional Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {optionalDocs.map(doc => <DocumentCard key={doc.id} doc={doc} />)}
                </div>
            </div>

            <div className="space-y-6">
                <Card className="sticky top-24">
                    <CardHeader>
                        <CardTitle>Verification Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Overall Status</span>
                            <Badge variant="outline">{overallStatus}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Mandatory Docs</span>
                            <span>{mandatorySubmittedCount} / {mandatoryDocs.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Optional Docs</span>
                            <span>{optionalSubmittedCount} / {optionalDocs.length}</span>
                        </div>
                        <Separator />
                        {!isDigiLockerLinked ? (
                            <Button className="w-full" onClick={handleLinkDigiLocker}>
                                <ExternalLink className="mr-2 h-4 w-4" /> Link DigiLocker
                            </Button>
                        ) : (
                            <Alert variant="default" className='border-green-600 dark:border-green-400'>
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                <AlertTitle className='text-green-700 dark:text-green-300'>DigiLocker Linked</AlertTitle>
                                <AlertDescription>
                                You can now pick documents directly.
                                </AlertDescription>
                            </Alert>
                        )}
                        
                    </CardContent>
                    <CardFooter className="flex-col space-y-2">
                        <Button className="w-full" onClick={handleVerifyAll} disabled={!allMandatorySubmitted}>
                            Verify All
                        </Button>
                        <Button className="w-full" variant="secondary" onClick={handlePrintReceipt}>
                           <Download className="mr-2 h-4 w-4" /> Download Receipt
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-base font-medium">Developer Panel</CardTitle>
                        {isMockMode && <Badge variant="destructive">Mock Mode</Badge>}
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Switch id="mock-mode" checked={isMockMode} onCheckedChange={setIsMockMode} />
                            <Label htmlFor="mock-mode">Use Mock Verification</Label>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Activity Log</CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-64 overflow-y-auto text-sm space-y-2">
                        {logs.map((log, i) => (
                            <p key={i} className="text-muted-foreground"><span className="font-mono text-foreground">{log.timestamp}</span>: {log.message}</p>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
