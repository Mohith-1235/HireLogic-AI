
'use client';

import { generateInitialHomepageContent, GenerateInitialHomepageContentOutput } from "@/ai/flows/generate-initial-homepage-content";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LoginModal } from "@/components/modals/login-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { useEffect, useState } from "react";

const defaultContent: GenerateInitialHomepageContentOutput = {
  headline: "Hire Smarter, Not Harder: AI-Powered Recruitment Solutions",
  subtext: "HireLogic-AI revolutionizes hiring by using advanced AI for precise candidate screening and matching, streamlining your recruitment process.",
  aboutUsMission: "Our mission is to make hiring more efficient and equitable by leveraging the power of artificial intelligence.",
  aboutUsScreening: "Our AI-driven screening process analyzes candidate profiles to identify top talent with unparalleled accuracy.",
  aboutUsHiring: "We are committed to building a trusted hiring ecosystem that benefits both employers and candidates.",
};

export default function Home() {
  const [content, setContent] = useState<GenerateInitialHomepageContentOutput>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateInitialHomepageContent({
      prompt:
        "HireLogic-AI is a recruiting startup that uses AI for candidate screening and matching to streamline the hiring process.",
    }).then(generatedContent => {
      if (generatedContent) {
        setContent(generatedContent);
      }
      // If generatedContent is null, we'll just use the defaultContent.
    }).catch(error => {
      console.error("Failed to generate homepage content, using default:", error);
      // content is already defaulted
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const heroImage = PlaceHolderImages.find(p => p.id === "hero-side-image");
  const missionImage = PlaceHolderImages.find(p => p.id === "about-mission");
  const aiImage = PlaceHolderImages.find(p => p.id === "about-ai-screening");
  const trustedImage = PlaceHolderImages.find(p => p.id === "about-trusted-hiring");

  const aboutItems = [
    {
      image: missionImage,
      title: "Our Mission",
      description: content.aboutUsMission,
    },
    {
      image: aiImage,
      title: "AI-Driven Screening",
      description: content.aboutUsScreening,
    },
    {
      image: trustedImage,
      title: "Trusted Hiring",
      description: content.aboutUsHiring,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-24 lg:py-40">
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent -z-10"></div>
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col items-start gap-6 text-left">
                    <h1 className="font-headline text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up">
                    {loading ? <span className="text-muted-foreground/20">Loading...</span> : content.headline}
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 animate-fade-in-up [animation-delay:200ms]">
                    {loading ? <span className="text-muted-foreground/20">Loading...</span> : content.subtext}
                    </p>
                    <div className="flex gap-4 animate-fade-in-up [animation-delay:400ms]">
                    <LoginModal triggerButton={<Button size="lg">Get Started</Button>} />
                    <Button asChild size="lg" variant="outline">
                        <a href="#contact">Contact Us</a>
                    </Button>
                    </div>
                </div>
                 {heroImage && (
                    <div className="relative h-80 w-full animate-fade-in [animation-delay:600ms] rounded-xl overflow-hidden shadow-2xl">
                        <Image
                            src={heroImage.imageUrl}
                            alt={heroImage.description}
                            data-ai-hint={heroImage.imageHint}
                            fill
                            className="object-cover"
                        />
                    </div>
                 )}
            </div>
        </section>

        <section id="about-us" className="w-full bg-secondary/50 py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto mb-12 flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-headline text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
                Revolutionizing Recruitment
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                We blend cutting-edge AI with a commitment to human-centric hiring, creating a seamless and effective process for finding top talent.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              {aboutItems.map((item, index) => (
                <div key={item.title} className="animate-fade-in-up" style={{animationDelay: `${index * 150}ms`}}>
                    <Card className="bg-background overflow-hidden h-full transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
                    {item.image && (
                        <div className="relative h-48 w-full">
                            <Image
                                src={item.image.imageUrl}
                                alt={item.image.description}
                                data-ai-hint={item.image.imageHint}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="text-xl font-bold font-headline">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                    </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
             <h2 className="font-headline text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">Contact Us</h2>
             <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Have questions or want to get started? We'd love to hear from you.
             </p>
          </div>
          <div className="mx-auto mt-12 max-w-xl">
            <ContactForm />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
