import React from 'react';
import { Github, Send, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      {/* Moving Text Animation */}
      <div className="relative overflow-hidden bg-muted py-4">
        <div className="animate-scroll-slow whitespace-nowrap">
          <div className="inline-flex items-center space-x-8">
            <Badge variant="secondary" className="bg-slate-300 text-slate-800 px-3 py-1 rounded-full text-xs">
              MONAD TESTNET
            </Badge>
            <div className="text-lg font-bold text-foreground relative">
              KERDIUM EXCHANGE
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-foreground to-transparent"></div>
            </div>
            <span className="text-white font-medium text-sm">Coming soon</span>
            <Badge variant="secondary" className="bg-slate-300 text-slate-800 px-3 py-1 rounded-full text-xs">
              MONAD TESTNET
            </Badge>
            <div className="text-lg font-bold text-foreground relative">
              KERDIUM EXCHANGE
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-foreground to-transparent"></div>
            </div>
            <span className="text-white font-medium text-sm">Coming soon</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Side - Company & Legal */}
          <div className="space-y-6">
            {/* Company Section */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-2">Company</h3>
              <a href="/about" className="text-sm text-foreground hover:text-primary transition-colors block">
                About
              </a>
            </div>
            
            {/* Legal & Privacy Section */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-2">Legal & Privacy</h3>
              <a href="/privacy" className="text-sm text-foreground hover:text-primary transition-colors block">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Center - Social Media */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Github className="w-4 h-4" />
              </Button>
              <a
                href="https://t.me/kerdium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon" className="rounded-full">
                  <Send className="w-4 h-4" />
                </Button>
              </a>
              <a
                href="https://x.com/kerdium?t=HVZunzChvjWb9FFqf0gZZw&s=09"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="w-4 h-4" />
                </Button>
              </a>
            </div>
            
            {/* FAQ Link */}
            <a href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </div>

          {/* Right Side - CEO Info */}
          <div className="flex flex-col items-end">
            <div className="text-right">
              <div className="text-xs text-muted-foreground font-semibold">CEO</div>
              <div className="text-sm font-medium">Oussama Kerd</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-xs text-muted-foreground text-center">
          © 2024 Kerdium. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export { Footer };