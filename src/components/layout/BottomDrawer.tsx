import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Twitter, Send, MessageCircle } from 'lucide-react';
import { Drawer, DrawerContent, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useDrawer } from '@/contexts/DrawerContext';
import { useLocation } from 'react-router-dom';

const BottomDrawer = () => {
  const { isOpen, closeDrawer } = useDrawer();
  const [snap, setSnap] = React.useState<number | string | null>(0.5);
  const location = useLocation();

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Swap', href: '/swap' },
    { name: 'Pool', href: '/pool' },
    { name: 'Stake', href: '/stake' },
    { name: 'Tasks', href: '/tasks' },
  ];

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'Telegram', href: 'https://t.me', icon: Send },
    { name: 'Discord', href: 'https://discord.com', icon: MessageCircle },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeDrawer]);

  return (
    <Drawer 
      open={isOpen} 
      onOpenChange={(open) => !open && closeDrawer()}
      snapPoints={[0, 0.5, 0.9]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      dismissible={true}
      modal={true}
      direction="bottom"
    >
      <DrawerContent 
        className="fixed bottom-0 left-0 right-0 h-[90vh] bg-[#111] text-white border-t border-[#22c55e]/30 rounded-t-2xl focus:outline-none transition-transform duration-300 ease-in-out"
        style={{ transform: `translateY(${snap === 0 ? '100%' : '0'})` }}
        aria-label="Main Menu"
        aria-hidden={!isOpen}
      >
        {/* Green Handle - 60px × 6px */}
        <div 
          className="mx-auto mt-4 bg-[#22c55e] cursor-grab active:cursor-grabbing transition-opacity hover:opacity-80"
          style={{ width: '60px', height: '6px', borderRadius: '10px' }}
          aria-label="Drag to resize menu"
        />
        
        {/* Close Button */}
        <DrawerClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-[#22c55e]/20 rounded-full"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </DrawerClose>
        
        <div className="flex flex-col justify-between h-full px-6 pb-8 overflow-y-auto">
          {/* Kerdium Exchange Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-6 text-center text-white">Kerdium Exchange</h2>
            
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-center py-4 px-6 rounded-xl transition-all duration-200 text-lg font-medium relative ${
                      isActive 
                        ? 'text-white after:content-[""] after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-0.5 after:bg-[#22c55e]' 
                        : 'text-white/80 hover:text-white hover:bg-[#22c55e]/10'
                    }`}
                    onClick={closeDrawer}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Social Section */}
          <div className="mt-8 pb-4">
            <h3 className="text-sm font-semibold mb-4 text-center text-white/70">Join Our Community</h3>
            <div className="flex justify-center items-center gap-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-[#22c55e]/20 transition-all duration-200 group"
                    aria-label={social.name}
                  >
                    <Icon className="h-6 w-6 text-white group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export { BottomDrawer };
