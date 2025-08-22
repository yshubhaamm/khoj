import { Heart, Shield, Users, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Mission */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4">Khoj AI</h3>
            <p className="text-white/80 mb-4">
              AI-powered missing persons detection, reuniting families and saving lives through cutting-edge technology.
            </p>
            <div className="flex items-center gap-2 text-white/60">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Made with love for humanity</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#face-search" className="hover:text-white transition-colors">Face Search Demo</a></li>
              <li><a href="#age-progression" className="hover:text-white transition-colors">Age Progression</a></li>
              <li><a href="#impact" className="hover:text-white transition-colors">Impact Stats</a></li>
            </ul>
          </div>

          {/* For Organizations */}
          <div>
            <h4 className="font-semibold mb-4">For Organizations</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="/ngo-login" className="hover:text-white transition-colors flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  NGO Portal
                </a>
              </li>
              <li>
                <a href="/police-login" className="hover:text-white transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Police Dashboard
                </a>
              </li>
              <li><a href="/api-docs" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="font-semibold mb-4">Support & Legal</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/security" className="hover:text-white transition-colors">Security</a></li>
              <li>
                <a href="/support" className="hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  24/7 Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="bg-accent/20 border border-accent/30 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-semibold text-white">Emergency Hotline Available 24/7</p>
              <p className="text-white/80 text-sm">For urgent missing person cases, contact us immediately</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-accent">+1 (555) 911-FIND</p>
              <p className="text-white/80 text-sm">Global emergency response</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © 2024 Khoj AI. All rights reserved. Saving lives through technology.
            </div>
            <div className="flex items-center gap-6 text-white/60 text-sm">
              <span>SOC 2 Compliant</span>
              <span>GDPR Ready</span>
              <span>ISO 27001</span>
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;