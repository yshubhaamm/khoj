import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import LiveDemo from "@/components/LiveDemo";
import AgeProgression from "@/components/AgeProgression";
import ImpactStats from "@/components/ImpactStats";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import InteractiveFeatures from "@/components/InteractiveFeatures";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <InteractiveFeatures />
      <LiveDemo />
      <AgeProgression />
      <ImpactStats />
      <ContactForm />
      <Footer />
      <ChatBot />
    </main>
  );
};

export default Index;
