import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Users, Clock, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ImpactStats = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const stats = [
    {
      icon: Heart,
      value: 2847,
      label: "Cases Solved",
      suffix: "+",
      color: "text-accent"
    },
    {
      icon: Clock,
      value: 15600,
      label: "Hours Saved",
      suffix: "+",
      color: "text-primary"
    },
    {
      icon: Users,
      value: 156,
      label: "NGOs Onboarded",
      suffix: "+",
      color: "text-accent"
    },
    {
      icon: Shield,
      value: 89,
      label: "Police Departments",
      suffix: "+",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real Impact, Real Lives
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Every number represents a family reunited, a life saved, and hope restored
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center animate-counter"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <stat.icon size={32} className="text-white" />
              </div>
              
          <div className="counter mb-2">
            {inView ? (
              <CountUp
                end={stat.value}
                duration={2.5}
                delay={index * 0.2}
                separator=","
                suffix={stat.suffix}
              />
            ) : (
              <span>0</span>
            )}
          </div>
              
              <p className="text-lg font-medium text-white/90">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Make a Difference?</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of NGOs and police departments using Khoj AI to reunite families and save lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => document.getElementById('live-demo')?.scrollIntoView({ behavior: 'smooth' })}className="bg-white text-primary hover:bg-white/90">
              Start Now
            </Button>
            <Link to="/dashboard">
              <Button size="lg"  className="bg-white text-primary hover:bg-white/90">
                View Detailed Analytics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;