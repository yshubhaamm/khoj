import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroBackground from "@/assets/hero-background.jpg";

// Scroll Progress Hook (fade within first 280px)
function useFontOpacity(max = 280) {
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    function onScroll() {
      const val = 1 - Math.min(window.scrollY / max, 1);
      setOpacity(val);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [max]);
  return opacity;
}

const orbVariants = {
  animate: (custom) => ({
    x: custom.x,
    y: custom.y,
    scale: custom.scale,
    rotate: custom.rotate,
    transition: {
      repeat: Infinity,
      duration: custom.duration,
      ease: "easeInOut",
      delay: custom.delay,
    },
  }),
};

const floatingOrbs = [
  { style: { width: 120, height: 120, top: "15%", left: "8%" }, custom: { x: [0, 30, -20, 0], y: [0, -30, 10, 0], scale: [1,1.1,0.9,1], rotate:[0,120,240,360], duration: 8, delay:0 } },
  { style: { width: 80, height: 80, top: "25%", right: "12%" }, custom: { x: [0,-25,18,0], y: [0,20,-10,0], scale: [1,1.1,1,1], rotate: [0,150,270,360], duration: 7, delay:3 } },
  { style: { width: 160, height: 160, bottom: "35%", left: "15%" }, custom: { x: [0,15,-15,0], y: [0,-18,20,0], scale: [1, 0.95, 1.15, 1], rotate: [0,80,180,360], duration: 9, delay:6 } },
  { style: { width: 100, height: 100, bottom: "25%", right: "8%" }, custom: { x:[0,20,-20,0], y:[0,10,-10,0], scale:[1,1.08,1,1], rotate:[0,110,220,360], duration:8, delay:2 } },
  { style: { width: 60, height:60, top: "60%", left: "50%" }, custom: { x:[0,20,-18,0], y:[0,-12,13,0], scale:[1,1,1.1,1], rotate:[0,130,260,360], duration:7, delay:4 } },
];

const HeroSection = () => {
  const fontOpacity = useFontOpacity(280);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{backgroundImage: `url(${heroBackground})`}}
      ></div>
      {/* Blue Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/80 to-primary-glow/90 z-10"></div>
      <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
      
      {/* Animated floating orbs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {floatingOrbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              ...orb.style,
              background: "radial-gradient(circle at 60% 30%, rgba(139,92,246,0.55) 0%, rgba(59,130,246,0.38) 60%, rgba(45,55,72,0.7) 100%)",
              boxShadow: "0 0 56px 6px rgba(139,92,246,0.30), 0 10px 30px 0 rgba(59,130,246,0.12)",
              filter: "blur(1px)",
              zIndex: 1,
            }}
            variants={orbVariants}
            animate="animate"
            custom={orb.custom}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="relative z-20 text-center px-4 max-w-4xl mx-auto transition-all duration-300"
        style={{ opacity: fontOpacity }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-up">
          Khoj AI
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-4 animate-fade-up" style={{animationDelay: '0.2s'}}>
          AI-Powered Missing Persons Detection
        </p>
        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto animate-fade-up" style={{animationDelay: '0.4s'}}>
          Empowering NGOs and police with cutting-edge facial recognition and age progression technology to reunite families and save lives.<br /><br />
          “No one is truly lost until we stop searching.”
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{animationDelay: '0.6s'}}>
          <Button 
            className="btn-hero transform hover:scale-110 transition-all duration-300"
            onClick={() => document.getElementById('live-demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started Now
          </Button>
          <Button 
            className="btn-hero transform hover:scale-110 transition-all duration-300"
            onClick={() => document.getElementById('interactive-features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Watch Demo
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 text-white/60 animate-fade-up" style={{animationDelay: '0.8s'}}>
          <p className="text-sm mb-4">Trusted by organizations worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 text-xs uppercase tracking-wider">
            <span>NGO Partners</span>
            <span>Police Departments</span>
            <span>Emergency Services</span>
            <span>Humanitarian Aid</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
