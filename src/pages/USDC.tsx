import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { USDCStats } from '@/components/usdc/USDCStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Shield, Zap, Globe, CheckCircle } from 'lucide-react';

const USDC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/src/assets/tokens/usdc.png" 
              alt="USDC" 
              className="w-16 h-16 rounded-full mr-4"
            />
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                USD Coin (USDC)
              </span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            عملة USDC المستقرة على شبكة Monad - عملة رقمية مربوطة بالدولار الأمريكي بنسبة 1:1
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              عملة مستقرة
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              شبكة Monad
            </Badge>
            <Badge variant="default" className="text-sm px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              مدعومة بالدولار
            </Badge>
          </div>
        </div>

        {/* USDC Statistics */}
        <section className="mb-12">
          <USDCStats />
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            مميزات عملة USDC على شبكة Monad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>استقرار السعر</CardTitle>
                <CardDescription>
                  مربوطة بالدولار الأمريكي بنسبة 1:1 مما يضمن استقرار القيمة
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-secondary/20 hover:border-secondary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>سرعة المعاملات</CardTitle>
                <CardDescription>
                  معاملات سريعة ورسوم منخفضة على شبكة Monad عالية الأداء
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>قابلية التشغيل البيني</CardTitle>
                <CardDescription>
                  متوافقة مع معايير ERC-20 ويمكن استخدامها عبر التطبيقات المختلفة
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>شفافية كاملة</CardTitle>
                <CardDescription>
                  جميع المعاملات قابلة للتحقق على البلوك تشين ومدعومة بالاحتياطيات
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-secondary/20 hover:border-secondary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>أمان متقدم</CardTitle>
                <CardDescription>
                  مدققة بواسطة شركات التدقيق المعتمدة ومطابقة للمعايير التنظيمية
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>سيولة عالية</CardTitle>
                <CardDescription>
                  سيولة عالية ومتاحة في جميع البورصات الرئيسية ومنصات DeFi
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Contract Information */}
        <section className="mb-12">
          <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl">معلومات العقد الذكي</CardTitle>
              <CardDescription>
                تفاصيل عقد USDC على شبكة Monad Testnet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">اسم العملة</p>
                  <p className="font-mono">USD Coin</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الرمز</p>
                  <p className="font-mono">USDC</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">العشريات</p>
                  <p className="font-mono">6</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الشبكة</p>
                  <p className="font-mono">Monad Testnet</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">عنوان العقد</p>
                <code className="bg-muted p-2 rounded text-xs block break-all">
                  0x... {/* Replace with actual contract address */}
                </code>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How to Use Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            كيفية استخدام USDC على Kerdium
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <CardTitle>ربط المحفظة</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  قم بربط محفظة MetaMask أو أي محفظة متوافقة مع شبكة Monad
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-secondary">2</span>
                </div>
                <CardTitle>الحصول على USDC</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  احصل على عملات USDC من خلال التبديل أو التحويل من شبكات أخرى
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">3</span>
                </div>
                <CardTitle>ابدأ التداول</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  استخدم USDC في التداول والاستثمار في منصة Kerdium DeFi
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                ابدأ مع USDC الآن
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                انضم إلى منصة Kerdium وابدأ في استخدام USDC للتداول والاستثمار في عالم DeFi
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="min-w-[200px]">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  انتقل للتداول
                </Button>
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  تعلم المزيد
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default USDC;