'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pencil, Sparkles, Brain, Share2, Mic } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [doodles, setDoodles] = useState<string[]>([]);
  const [currentDoodle, setCurrentDoodle] = useState(0);

  // Simulated doodles that appear to be drawn
  const doodleExamples = [
    'M10 10 C 20 20, 40 20, 50 10',
    'M60 60 C 70 70, 90 70, 100 60',
    'M30 30 C 40 40, 60 40, 70 30',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDoodle((prev) => (prev + 1) % doodleExamples.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFAF0] overflow-hidden">
      {/* Floating Doodles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 animate-float">
          {Array.from({ length: 20 }).map((_, i) => (
            <svg
              key={i}
              className="absolute transform rotate-3"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1,
              }}
              width="50"
              height="50"
              viewBox="0 0 100 100"
            >
              <path
                d={doodleExamples[currentDoodle]}
                stroke="black"
                fill="none"
              />
            </svg>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 relative">
              <Pencil className="mx-auto h-16 w-16 text-primary animate-bounce" />
              <div className="absolute -top-4 -right-4">
                <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
              </div>
            </div>
            <h1
              className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              Let Your Ideas Flow Freely
            </h1>
            <p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              Draw, doodle, and bring your imagination to life! No artistic
              skills required - just pure creativity.
            </p>
            <Link href="/create">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-lg gap-2 bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all"
              >
                Start Drawing <Mic className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="bg-white/50 py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl border-4 border-dashed border-primary/30 p-8 bg-white/80">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <path
                    d={doodleExamples[currentDoodle]}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-primary animate-draw"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h2
                className="text-4xl font-bold mb-6"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                Draw Anything, Anywhere
              </h2>
              <div className="space-y-6">
                <Feature
                  icon={<Brain className="h-6 w-6" />}
                  title="Smart Drawing Tools"
                  description="Intelligent tools that help you draw better, no matter your skill level"
                />
                <Feature
                  icon={<Share2 className="h-6 w-6" />}
                  title="Easy Sharing"
                  description="Share your creations with friends and collaborate in real-time"
                />
                <Feature
                  icon={<Mic className="h-6 w-6" />}
                  title="Magic Touch"
                  description="Transform rough sketches into beautiful drawings with AI assistance"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-b from-white/0 to-primary/5 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-4xl font-bold mb-6"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            Ready to unleash your creativity?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of happy doodlers who have discovered the joy of
            digital drawing.
          </p>
          <Link href="/create">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg animate-bounce"
            >
              Start Drawing Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="p-2 rounded-full bg-primary/10">{icon}</div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
