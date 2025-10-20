import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

const BottomDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Swap', href: '/swap' },
    { name: 'Pool', href: '/pool' },
    { name: 'Stake', href: '/stake' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="bottom">
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#111] text-white hover:bg-[#22c55e]/20 border border-[#22c55e]/30 rounded-full px-6 shadow-lg z-50"
        >
          <ChevronUp className="w-4 h-4 mr-2" />
          القائمة
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[50vh] bg-[#111] text-white border-t border-border/20 rounded-t-3xl">
        {/* المقبض الأخضر */}
        <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-[#22c55e]" />
        
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
                  className="text-center py-4 px-6 rounded-xl transition-all text-white/90 hover:text-white hover:bg-[#22c55e]/20 border border-transparent hover:border-[#22c55e]/30 text-lg font-medium"
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
              اسحب المقبض للأسفل لإغلاق القائمة
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export { BottomDrawer };
