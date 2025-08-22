import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import img1 from '@/assets/1.jpg';
import img2 from '@/assets/2.jpg';
import img3 from '@/assets/3.jpg';
import videoSrc from '@/assets/final1.mp4';
import pdfSrc from '@/assets/khoj.pdf';

const InteractiveFeatures = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'realtime',
      title: 'Real-time Detection',
      description: 'Watch our AI detect and match faces in real-time video streams',
      status: 'Active',
      statusColor: 'bg-green-500',
      color: 'from-primary via-blue-500 to-purple-500',
      imgSrc: img1,
    },
    {
      id: 'age-progression',
      title: 'Age Progression Analysis',
      description: 'See how our AI predicts aging patterns for better identification',
      status: 'Processing',
      statusColor: 'bg-yellow-500',
      color: 'from-accent via-pink-500 to-yellow-500',
      imgSrc: img2,
    },
    {
      id: 'multi-database',
      title: 'Multi-Database Search',
      description: 'Search across multiple databases simultaneously for maximum coverage',
      status: 'Ready',
      statusColor: 'bg-blue-500',
      color: 'from-primary-glow via-yellow-500 to-orange-500',
      imgSrc: img3,
    },
  ];

  return (
    <section id="interactive-features" className="py-20" style={{ backgroundColor: '#1046A3' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-glow">
            Interactive AI Capabilities
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience the power of our AI technology through these interactive demonstrations
          </p>
        </div>

        {/* Video Demo Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-6 card-hover relative backdrop-blur-lg bg-gradient-to-br from-white/10 to-black/30 border border-white/20 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="relative bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-lg overflow-hidden">
              {/* Video Only (no icons above) */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center rounded-lg overflow-hidden">
                <video
                  src={videoSrc}
                  controls
                  muted={isMuted}
                  autoPlay={isVideoPlaying}
                  className="w-full h-full rounded-lg"
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                />
              </div>
              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  
                   
                </div>
                <div >
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Interactive Features Grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={feature.id}
              className={`relative p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-lg bg-gradient-to-br from-white/10 to-black/30 border border-white/20 rounded-2xl shadow-md overflow-hidden ${
                activeFeature === feature.id ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
              }`}
              onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Feature Card Content */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-4 h-4 rounded-full ${feature.statusColor} animate-pulse`}></div>
                <Badge variant="outline">{feature.status}</Badge>
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3 drop-shadow-sm">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {feature.description}
              </p>

              {activeFeature === feature.id && (
                <img
                  src={feature.imgSrc}
                  alt={feature.title}
                  className="w-32 h-32 rounded-lg mx-auto mb-4 object-cover"
                  loading="lazy"
                />
              )}

              {/* Neon Border effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-primary/10" />
            </Card>
          ))}
        </div>

        {/* Quick Actions - only Documentation button */}
        <div className="text-center mt-8">
          <div className="inline-flex flex-wrap gap-4 p-6 bg-white rounded-xl border border-gray-300 justify-center shadow-md">
            <a
              href={pdfSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3 rounded-lg bg-[#1046A3] text-white font-semibold transition hover:bg-blue-800"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeatures;
