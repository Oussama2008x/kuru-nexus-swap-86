import React from 'react';
import { WETHStats } from '@/components/weth/WETHStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Repeat, ArrowUpDown } from 'lucide-react';

const WETH = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                <ArrowUpDown className="w-3 h-3 text-secondary-foreground" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            WETH - الإثيريوم المغلف
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            عملة الإثيريوم المغلفة (WETH) على شبكة Monad - حلول التداول والتمويل اللامركزي
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="secondary" className="text-sm">ERC-20 متوافق</Badge>
            <Badge variant="outline" className="text-sm">1:1 مع ETH</Badge>
            <Badge variant="default" className="text-sm">شبكة Monad</Badge>
          </div>
        </div>

        {/* WETH Statistics */}
        <WETHStats />

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* What is WETH */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                ما هو WETH؟
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                WETH هو إثيريوم مغلف بمعيار ERC-20، مما يسمح بالتداول والاستخدام في التطبيقات اللامركزية.
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• نسبة تحويل 1:1 مع ETH</li>
                <li>• متوافق مع معيار ERC-20</li>
                <li>• يمكن استخدامه في DEX</li>
                <li>• قابل للتحويل العكسي</li>
              </ul>
            </CardContent>
          </Card>

          {/* How it Works */}
          <Card className="border-secondary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Repeat className="h-5 w-5 text-secondary" />
                كيف يعمل؟
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                عملية التغليف والفك بسيطة وآمنة:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>إرسال ETH للعقد</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <span>استلام WETH بنفس الكمية</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span>إمكانية الفك في أي وقت</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                الأمان والموثوقية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                WETH يوفر أمان عالي ومراجع محققة:
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• عقد ذكي مراجع</li>
                <li>• مصدر مفتوح وشفاف</li>
                <li>• يعمل على شبكة Monad</li>
                <li>• احتياطي كامل بـ ETH</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Contract Information */}
        <Card className="border-muted/20">
          <CardHeader>
            <CardTitle>معلومات العقد الذكي</CardTitle>
            <CardDescription>
              تفاصيل عقد WETH على شبكة Monad Testnet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">عنوان العقد:</label>
                <code className="block p-2 bg-muted rounded text-sm break-all">
                  0x7e57426cdc8b8a4Eb5EC3AB77E2BAe0Eb5E1394D
                </code>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">الشبكة:</label>
                <div className="p-2 bg-muted rounded text-sm">
                  Monad Testnet
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">رمز العملة:</label>
                <div className="p-2 bg-muted rounded text-sm">
                  WETH
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">العشرية:</label>
                <div className="p-2 bg-muted rounded text-sm">
                  18
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>كيفية الاستخدام</CardTitle>
            <CardDescription>
              خطوات سهلة لتغليف وفك تغليف ETH
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-primary">تغليف ETH إلى WETH</h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">1</span>
                    اتصل بمحفظتك الرقمية
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">2</span>
                    اختر كمية ETH للتغليف
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">3</span>
                    استدعِ دالة deposit()
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">4</span>
                    استلم WETH في محفظتك
                  </li>
                </ol>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-secondary">فك تغليف WETH إلى ETH</h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary/10 text-secondary text-xs flex items-center justify-center">1</span>
                    تأكد من وجود WETH في محفظتك
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary/10 text-secondary text-xs flex items-center justify-center">2</span>
                    اختر كمية WETH للفك
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary/10 text-secondary text-xs flex items-center justify-center">3</span>
                    استدعِ دالة withdraw()
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary/10 text-secondary text-xs flex items-center justify-center">4</span>
                    استلم ETH في محفظتك
                  </li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WETH;