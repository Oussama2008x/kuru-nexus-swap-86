import React, { useEffect, useState } from 'react';
import { ChevronDown, TrendingUp, Compass, Waves, Wallet, Zap, Box, Star } from 'lucide-react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useDrawer } from '@/contexts/DrawerContext';
import { Github } from 'lucide-react';

const BottomDrawer = () => {
  const { isOpen, closeDrawer } = useDrawer();
  const [protocolOpen, setProtocolOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  const appItems = [
    { name: 'Trade', href: '/swap', icon: TrendingUp },
    { name: 'Explore', href: '/', icon: Compass },
    { name: 'Pool', href: '/pool', icon: Waves },
  ];

  const productItems = [
    { name: 'Wallet', href: '/swap', icon: Wallet },
    { name: 'KerdiumX', href: '/stake', icon: Zap },
    { name: 'API', href: '/about', icon: Box },
    { name: 'Kerdchain', href: '/tasks', icon: Star },
  ];

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <Drawer 
      open={isOpen} 
      onOpenChange={(open) => !open && closeDrawer()}
      dismissible={true}
      modal={true}
      direction="bottom"
      shouldScaleBackground={false}
    >
      <DrawerContent 
        className="fixed bottom-0 left-0 right-0 h-[90vh] bg-[#0d0d0d] text-white border-none rounded-t-3xl focus:outline-none"
        aria-label="Main Menu"
        aria-hidden={!isOpen}
      >
        {/* Decorative Handle - Non-draggable */}
        <div 
          className="mx-auto mt-4 bg-[#404040] pointer-events-none"
          style={{ width: '48px', height: '4px', borderRadius: '100px' }}
          aria-hidden="true"
        />
        
        <div className="flex flex-col h-full px-6 pb-8 overflow-y-auto">
          {/* App Section */}
          <div className="mt-8">
            <h3 className="text-[13px] font-medium text-[#999999] mb-4">App</h3>
            
            <div className="flex flex-col space-y-1">
              {appItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 py-3 text-white text-[17px] font-normal"
                    onClick={closeDrawer}
                  >
                    <Icon className="h-6 w-6 text-[#fc72ff]" strokeWidth={2} />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Products Section */}
          <div className="mt-8">
            <h3 className="text-[13px] font-medium text-[#999999] mb-4">Products</h3>
            
            <div className="flex flex-col space-y-1">
              {productItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 py-3 text-white text-[17px] font-normal"
                    onClick={closeDrawer}
                  >
                    <Icon className="h-6 w-6 text-[#fc72ff]" strokeWidth={2} />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-[1px] bg-[#262626]" />

          {/* Protocol Section */}
          <div>
            <button
              onClick={() => setProtocolOpen(!protocolOpen)}
              className="flex items-center justify-between w-full text-left py-3"
            >
              <span className="text-[15px] font-normal text-[#cccccc]">Protocol</span>
              <ChevronDown 
                className={`h-5 w-5 text-[#999999] transition-transform ${protocolOpen ? 'rotate-180' : ''}`} 
              />
            </button>
          </div>

          {/* Company Section */}
          <div>
            <button
              onClick={() => setCompanyOpen(!companyOpen)}
              className="flex items-center justify-between w-full text-left py-3"
            >
              <span className="text-[15px] font-normal text-[#cccccc]">Company</span>
              <ChevronDown 
                className={`h-5 w-5 text-[#999999] transition-transform ${companyOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            {companyOpen && (
              <div className="mt-1 pl-0">
                <a
                  href="/about"
                  className="block py-3 text-[15px] text-[#999999]"
                  onClick={closeDrawer}
                >
                  About
                </a>
              </div>
            )}
          </div>

          {/* Legal & Privacy Section */}
          <div>
            <button
              onClick={() => setLegalOpen(!legalOpen)}
              className="flex items-center justify-between w-full text-left py-3"
            >
              <span className="text-[15px] font-normal text-[#cccccc]">Legal & Privacy</span>
              <ChevronDown 
                className={`h-5 w-5 text-[#999999] transition-transform ${legalOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            {legalOpen && (
              <div className="mt-1 pl-0">
                <a
                  href="/privacy"
                  className="block py-3 text-[15px] text-[#999999]"
                  onClick={closeDrawer}
                >
                  Privacy Policy
                </a>
              </div>
            )}
          </div>

          {/* Social Icons */}
          <div className="mt-auto pt-8 pb-4">
            <div className="flex justify-start items-center gap-4">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#999999] hover:text-white"
                aria-label="Discord"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a
                href="https://x.com/kerdium?t=HVZunzChvjWb9FFqf0gZZw&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#999999] hover:text-white"
                aria-label="X (Twitter)"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#999999] hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export { BottomDrawer };
