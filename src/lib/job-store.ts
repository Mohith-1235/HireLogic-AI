
'use client';

import { type ClassValue } from "clsx"

export interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  saved: boolean;
  applied: boolean;
  postedAt: string;
  description: string;
  documents?: { name: string; url: string }[];
  nextStep?: string;
  status?: 'Interviewing' | 'Under Review' | 'Not Selected';
  progress?: number;
  appliedAt?: string;
}

const initialJobListings: JobListing[] = [
    { 
        id: 1, 
        title: 'Frontend Developer', 
        company: 'Innovate Inc.', 
        location: 'Remote', 
        saved: false, 
        applied: true, 
        postedAt: '2 hours ago',
        description: 'Innovate Inc. is seeking a passionate Frontend Developer to build beautiful and performant user interfaces for our next-generation products. You will work with React, Next.js, and Tailwind CSS.',
        documents: [ { name: 'Resume.pdf', url: '#' } ],
        nextStep: 'Second Round Interview: Technical Assessment on March 15th, 2024',
        status: 'Interviewing',
        progress: 75,
        appliedAt: '2 weeks ago'
    },
    { 
        id: 2, 
        title: 'Backend Engineer', 
        company: 'Data Systems', 
        location: 'New York, NY', 
        saved: true, 
        applied: false, 
        postedAt: '1 day ago',
        description: 'We are looking for a skilled Backend Engineer to join our team. You will be responsible for designing and implementing server-side logic and APIs.',
    },
    { 
        id: 3, 
        title: 'AI/ML Specialist', 
        company: 'Future AI', 
        location: 'San Francisco, CA', 
        saved: false, 
        applied: false, 
        postedAt: '3 days ago',
        description: 'Join Future AI as an AI/ML Specialist and work on cutting-edge artificial intelligence projects that will shape the future.'
    },
    { 
        id: 4, 
        title: 'DevOps Engineer', 
        company: 'CloudWorks', 
        location: 'Austin, TX', 
        saved: false, 
        applied: false, 
        postedAt: '5 days ago',
        description: 'CloudWorks is hiring a DevOps Engineer to manage our cloud infrastructure and streamline our deployment processes.',
    },
    { 
        id: 5, 
        title: 'UI/UX Designer', 
        company: 'Creative Solutions', 
        location: 'Remote', 
        saved: true, 
        applied: true, 
        postedAt: '1 week ago',
        description: 'Creative Solutions is looking for a talented UI/UX Designer to create intuitive and engaging experiences for our clients. You will be responsible for the entire design process from concept to final hand-off.',
        documents: [ { name: 'Resume.pdf', url: '#' }, { name: 'Portfolio.pdf', url: '#' } ],
        nextStep: 'The hiring team is currently reviewing your application.',
        status: 'Under Review',
        progress: 25,
        appliedAt: '1 week ago'
    },
    {
        id: 6,
        title: 'Full Stack Developer',
        company: 'Tech Solutions',
        location: 'London, UK',
        saved: false,
        applied: false,
        postedAt: '2 days ago',
        description: 'Looking for a Full Stack Developer proficient in both frontend and backend technologies. Experience with Node.js and React is a must.'
    },
    {
        id: 7,
        title: 'Product Manager',
        company: 'Agile Innovations',
        location: 'Berlin, Germany',
        saved: true,
        applied: false,
        postedAt: '4 days ago',
        description: 'We are seeking an experienced Product Manager to lead our product development team. You will define product vision, strategy, and roadmap.'
    },
    {
        id: 8,
        title: 'Data Scientist',
        company: 'Insightful Data',
        location: 'Remote',
        saved: false,
        applied: false,
        postedAt: '6 days ago',
        description: 'Join our team of data scientists to analyze large datasets and build predictive models that will drive business decisions.'
    }
];

const JOB_STORE_KEY = 'hirelogic_job_listings';

const getJobsFromStorage = (): JobListing[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    const storedJobs = localStorage.getItem(JOB_STORE_KEY);
    if (storedJobs) {
        try {
            return JSON.parse(storedJobs);
        } catch (e) {
            console.error("Failed to parse jobs from localStorage", e);
            // If parsing fails, reset with initial data
            saveJobsToStorage(initialJobListings);
            return initialJobListings;
        }
    }
    // If no jobs are in storage, initialize it
    saveJobsToStorage(initialJobListings);
    return initialJobListings;
};

const saveJobsToStorage = (jobs: JobListing[]) => {
    if (typeof window === 'undefined') {
        return;
    }
    localStorage.setItem(JOB_STORE_KEY, JSON.stringify(jobs));
};

// Initialize storage if it's empty
if (typeof window !== 'undefined' && !localStorage.getItem(JOB_STORE_KEY)) {
    saveJobsToStorage(initialJobListings);
}

export const getAllJobs = (): JobListing[] => {
    return getJobsFromStorage();
};

export const getAppliedJobs = (): JobListing[] => {
    const allJobs = getJobsFromStorage();
    return allJobs.filter(job => job.applied);
};

export const updateJob = (updatedJob: JobListing) => {
    let jobs = getJobsFromStorage();
    const jobIndex = jobs.findIndex(j => j.id === updatedJob.id);
    if (jobIndex !== -1) {
        if(updatedJob.applied && !jobs[jobIndex].applied) {
            updatedJob.appliedAt = 'Just now';
        }
        jobs[jobIndex] = updatedJob;
        saveJobsToStorage(jobs);
    }
};

export const getJobById = (id: number): JobListing | undefined => {
    const jobs = getJobsFromStorage();
    return jobs.find(job => job.id === id);
};
