import React from 'react';
import { Github, Send, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      {/* Moving Text Animation */}
      <div className="relative overflow-hidden bg-muted py-4">
        <div className="flex animate-scroll">
          <div className="flex items-center space-x-8 text-sm whitespace-nowrap">
            <Badge variant="secondary" className="bg-primary text-primary-foreground px-4 py-2 rounded-full">
              MONAD TESTNET
            </Badge>
            <div className="text-2xl font-bold text-foreground relative">
              KERDIUM EXCHANGE
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            <span className="text-foreground font-medium">Coming soon</span>
            <Badge variant="secondary" className="bg-primary text-primary-foreground px-4 py-2 rounded-full">
              MONAD TESTNET
            </Badge>
            <div className="text-2xl font-bold text-foreground relative">
              KERDIUM EXCHANGE
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            <span className="text-foreground font-medium">Coming soon</span>
          </div>
          <div className="flex items-center space-x-8 text-sm whitespace-nowrap ml-8">
            <Badge variant="secondary" className="bg-primary text-primary-foreground px-4 py-2 rounded-full">
              MONAD TESTNET
            </Badge>
            <div className="text-2xl font-bold text-foreground relative">
              KERDIUM EXCHANGE
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            <span className="text-foreground font-medium">Coming soon</span>
            <Badge variant="secondary" className="bg-primary text-primary-foreground px-4 py-2 rounded-full">
              MONAD TESTNET
            </Badge>
            <div className="text-2xl font-bold text-foreground relative">
              KERDIUM EXCHANGE
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            <span className="text-foreground font-medium">Coming soon</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Media Links */}
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

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="/about" className="hover:text-foreground transition-colors">
              About Kerdium
            </a>
            <a href="/faq" className="hover:text-foreground transition-colors">
              FAQ
            </a>
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
          </div>

          {/* CEO Info */}
          <div className="text-center">
            <div className="text-xs text-muted-foreground font-semibold">CEO</div>
            <div className="text-sm font-medium">Oussama Kerd</div>
          </div>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground text-center">
            © 2024 Kerdium. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };