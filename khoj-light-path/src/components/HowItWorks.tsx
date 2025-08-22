import { Upload, Search, Bell } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload or Live Feed",
      description:
        "Upload photos or connect live camera feeds of missing persons",
      color: "from-primary via-blue-500 to-purple-500",
    },
    {
      icon: Search,
      title: "AI Scans & Matches",
      description:
        "Our AI scans faces in real-time and matches against the database",
      color: "from-accent via-pink-500 to-yellow-500",
    },
    {
      icon: Bell,
      title: "Instant Alerts",
      description:
        "Authorities are notified immediately when matches are found",
      color: "from-primary-glow via-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="py-20 bg-secondary min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 drop-shadow-glow">
            How Khoj AI Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to leverage the power of AI for finding missing persons
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative transition-all duration-300 hover:scale-105 hover:shadow-2xl step-card text-center backdrop-blur-lg bg-gradient-to-br from-white/10 to-black/30 border border-white/20 rounded-2xl px-8 pt-12 pb-8 shadow-md overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Glowing Icon */}
              <div
                className={`z-20 relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr ${step.color} shadow-lg mb-6`}
              >
                <step.icon size={36} className="relative z-10 text-white drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3 drop-shadow-sm">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {step.description}
              </p>

              {/* Step Number (floating) */}
              <div
                className="absolute top-4 right-4 md:top-4 md:right-4 w-10 h-10 bg-gradient-to-br from-accent to-primary text-white rounded-full flex items-center justify-center font-extrabold shadow-xl border-2 border-white/30 text-lg ring-2 ring-primary/10 z-30"
              >
                {index + 1}
              </div>
              {/* Neon Border effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-primary/10" />
            </div>
          ))}
        </div>

        {/* Connecting Lines for Desktop */}
        <div className="hidden md:flex justify-center mt-14">
          <div className="flex items-center max-w-4xl w-full">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-accent/30 via-transparent to-primary/30"></div>
            <div className="w-6 h-6 bg-primary shadow-lg rounded-full mx-6 animate-pulse"></div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/30 via-transparent to-accent/30"></div>
            <div className="w-6 h-6 bg-accent shadow-lg rounded-full mx-6 animate-pulse"></div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-accent/30 via-transparent to-primary/30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
