
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/firebase";
import { useEffect, useState } from "react";
import type { JobListing } from "@/app/dashboard/page";

const applicationSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  resume: z.any().refine(files => files?.length === 1, "Resume is required."),
});

type ApplicationSchema = z.infer<typeof applicationSchema>;

interface JobApplicationFormProps {
    job: JobListing;
    onApplySuccess: () => void;
}

export function JobApplicationForm({ job, onApplySuccess }: JobApplicationFormProps) {
    const { user } = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ApplicationSchema>({
        resolver: zodResolver(applicationSchema),
        defaultValues: {
            name: "",
            email: "",
            resume: undefined,
        },
    });

     useEffect(() => {
        if (user) {
            form.reset({
                name: user.displayName || "",
                email: user.email || "",
            });
        }
    }, [user, form]);

    const onSubmit = (data: ApplicationSchema) => {
        setIsSubmitting(true);
        // Simulate form submission
        console.log("Submitting application:", data);
        setTimeout(() => {
            setIsSubmitting(false);
            onApplySuccess();
        }, 1500);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
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
                    name="resume"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Resume</FormLabel>
                        <FormControl>
                            <Input 
                                type="file" 
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => field.onChange(e.target.files)}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
            </form>
        </Form>
    );
}

