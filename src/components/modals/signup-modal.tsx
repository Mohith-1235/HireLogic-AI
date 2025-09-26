
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { signUpWithEmail, signInWithGoogle, signInWithApple } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { UserCredential } from "firebase/auth";

const signupSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type SignupSchema = z.infer<typeof signupSchema>;

interface SignupModalProps {
  afterOpen?: () => void;
  isMobile?: boolean;
}

const GoogleIcon = () => (
    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.8 0-5.18-1.88-6.04-4.42H2.34v2.84C4.13 20.98 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.96 14.25c-.14-.42-.22-.86-.22-1.3s.08-.88.22-1.3V8.81H2.34C1.5 10.43 1 12.17 1 14s.5 3.57 1.34 5.19l3.62-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 4.13 3.02 2.34 6.16l3.62 2.84C6.82 7.26 9.2 5.38 12 5.38z"
        fill="#EA4335"
      />
    </svg>
  );
  
  const AppleIcon = () => (
    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
      <path d="M12.152 6.896c-.948 0-2.415-1.065-3.593-1.065-1.537 0-3.122.993-3.901 2.537C3 10.153 3.08 13.07 4.258 15.35c.58.94 1.503 2.022 2.572 2.022.947 0 1.32-.625 2.618-.625.993 0 1.386.625 2.617.625 1.135 0 1.994-1.082 2.572-2.022.798-1.554.965-2.924.965-2.957-.033-2.88-1.994-4.228-4.447-4.448m-1.21-2.146c.799-.83 1.353-1.993 1.221-3.155-.948.033-2.147.69-2.945 1.484-.69.658-1.417 1.89-1.285 2.99.98.066 2.049-.624 3.009-.999"/>
    </svg>
  );

export function SignupModal({ afterOpen, isMobile = false }: SignupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      afterOpen?.();
    }
  };

  const handleSuccess = (userCredential: UserCredential) => {
    handleOpenChange(false);
    toast({
      title: "Account Created",
      description: "Welcome to HireLogic-AI! Please verify your documents to continue.",
    });
    router.push('/document-verification');
  };

  const handleError = (error: any) => {
    if (error.code === 'auth/email-already-in-use') {
        toast({
            variant: "destructive",
            title: "Sign Up Failed",
            description: "An account with this email already exists. Please log in or use a different email.",
        });
    } else {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message || 'An unknown error occurred.',
        });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle().then(handleSuccess).catch(handleError);
  };

  const handleAppleSignIn = () => {
    signInWithApple().then(handleSuccess).catch(handleError);
  };

  const onSubmit = (data: SignupSchema) => {
    signUpWithEmail(data.name, data.email, data.password)
      .then(handleSuccess)
      .catch(handleError);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn(isMobile && "w-full")}>Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>
            Join HireLogic-AI to streamline your recruitment process.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
            <Button variant="outline" onClick={handleGoogleSignIn}><GoogleIcon /> Google</Button>
            <Button variant="outline" onClick={handleAppleSignIn}><AppleIcon /> Apple</Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full">Sign Up</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
