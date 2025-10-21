import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Drawer, DrawerContent, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

const BottomDrawer = () => {
  const [isOpen, setIsOpen] = useState(true); // Start open at 50%
  const [snap, setSnap] = useState<number | string | null>(0.5);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Swap', href: '/swap' },
    { name: 'Pool', href: '/pool' },
    { name: 'Stake', href: '/stake' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'FAQ', href: '/faq' },
  ];

  // منع تمرير الصفحة عند فتح القائمة
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

  // إغلاق بزر Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <Drawer 
      open={isOpen} 
      onOpenChange={setIsOpen}
      snapPoints={[0, 0.5, 0.9]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      dismissible={true}
      modal={true}
      direction="bottom"
    >
      <DrawerContent 
        className="fixed bottom-0 left-0 right-0 h-[90vh] bg-[#111] text-white border-t border-[#22c55e]/30 rounded-t-3xl focus:outline-none transition-transform duration-300 ease-in-out"
        style={{ transform: `translateY(${snap === 0 ? '100%' : '0'})` }}
        aria-label="القائمة الرئيسية"
        aria-hidden={!isOpen}
      >
        {/* المقبض الأخضر - 60px × 6px */}
        <div 
          className="mx-auto mt-4 bg-[#22c55e] cursor-grab active:cursor-grabbing transition-opacity hover:opacity-80"
          style={{ width: '60px', height: '6px', borderRadius: '10px' }}
          aria-label="اسحب لتغيير حجم القائمة"
        />
        
        {/* زر الإغلاق */}
        <DrawerClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-[#22c55e]/20 rounded-full"
            aria-label="إغلاق القائمة"
          >
            <X className="h-5 w-5" />
          </Button>
        </DrawerClose>
        
        <div className="flex flex-col space-y-4 mt-8 px-6 overflow-y-auto h-full pb-8">
          {/* عنوان القائمة */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-white">القائمة الرئيسية</h2>
            
            {/* عناصر القائمة */}
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-center py-4 px-6 rounded-xl transition-all duration-200 text-white/90 hover:text-white hover:bg-[#22c55e]/20 active:bg-[#22c55e]/30 border border-transparent hover:border-[#22c55e]/30 text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="mt-6 p-4 bg-[#1a1a1a] rounded-xl border border-[#22c55e]/20">
            <p className="text-sm text-white/70 text-center">
              اسحب المقبض للأعلى للتوسيع أو للأسفل للإغلاق
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export { BottomDrawer };
