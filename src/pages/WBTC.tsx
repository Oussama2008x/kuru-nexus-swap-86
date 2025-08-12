import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WBTCStats } from "@/components/wbtc/WBTCStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Bitcoin, 
  Shield, 
  Zap, 
  Coins, 
  Lock, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Users,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WBTC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full blur-xl"></div>
              <div className="relative bg-gradient-to-r from-orange-500 to-yellow-500 p-4 rounded-2xl">
                <Bitcoin className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Wrapped Bitcoin
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
              WBTC على شبكة Monad
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              تداول Bitcoin بسهولة على شبكة Monad مع WBTC - النسخة المُغلفة من Bitcoin التي تحافظ على نفس القيمة مع إمكانيات DeFi المتقدمة
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/swap">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                <Coins className="h-5 w-5 mr-2" />
                تداول WBTC الآن
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <Shield className="h-5 w-5 mr-2" />
              اقرأ المستندات
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <WBTCStats />
        </section>

        {/* Features Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">لماذا WBTC؟</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              اكتشف مزايا استخدام Wrapped Bitcoin على شبكة Monad
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Bitcoin className="h-5 w-5 text-orange-500" />
                  </div>
                  <CardTitle>نفس قيمة Bitcoin</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  WBTC مدعوم 1:1 بـ Bitcoin الحقيقي، مما يضمن نفس القيمة مع مرونة أكبر في التداول
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 hover:border-blue-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Zap className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardTitle>سرعة Monad</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  استفد من سرعة شبكة Monad العالية ورسومها المنخفضة لتداول Bitcoin بكفاءة
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 hover:border-green-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle>أمان متقدم</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  عقد ذكي محقق مع نظام تحكم في الوصول لضمان أقصى درجات الأمان
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Lock className="h-5 w-5 text-purple-500" />
                  </div>
                  <CardTitle>تحكم في السك والحرق</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  نظام صلاحيات متقدم للتحكم في عمليات سك وحرق WBTC بأمان تام
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Users className="h-5 w-5 text-yellow-500" />
                  </div>
                  <CardTitle>سيولة عالية</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  تمتع بسيولة عالية وتداول سلس مع أقل انزلاق سعري ممكن
                </p>
              </CardContent>
            </Card>

            <Card className="border-teal-500/20 hover:border-teal-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-teal-500/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-teal-500" />
                  </div>
                  <CardTitle>فرص DeFi</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  استخدم WBTC في بروتوكولات DeFi المختلفة للحصول على عوائد إضافية
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technical Details Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">التفاصيل التقنية</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              معلومات تقنية مفصلة حول عقد WBTC الذكي
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  مميزات العقد
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">ERC-20</Badge>
                  <span className="text-sm text-muted-foreground">متوافق مع معيار ERC-20</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Mintable</Badge>
                  <span className="text-sm text-muted-foreground">قابل للسك بصلاحيات</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Burnable</Badge>
                  <span className="text-sm text-muted-foreground">قابل للحرق بصلاحيات</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Access Control</Badge>
                  <span className="text-sm text-muted-foreground">نظام تحكم في الوصول</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">8 Decimals</Badge>
                  <span className="text-sm text-muted-foreground">نفس دقة Bitcoin</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  معلومات مهمة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <p className="text-sm">
                    <strong>الصلاحيات:</strong> عمليات السك والحرق تتطلب صلاحيات خاصة من إدارة العقد
                  </p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-sm">
                    <strong>الأمان:</strong> العقد محقق ومراجع من قبل خبراء الأمان
                  </p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <p className="text-sm">
                    <strong>الشفافية:</strong> جميع المعاملات قابلة للتتبع على البلوك تشين
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6">
          <Card className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-2xl">ابدأ التداول الآن</CardTitle>
              <CardDescription className="text-lg">
                استفد من فرص التداول المتاحة مع WBTC على شبكة Monad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/swap">
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                    انتقل للتداول
                    <ArrowRight className="h-5 w-5 mr-2" />
                  </Button>
                </Link>
                <Link to="/pool">
                  <Button variant="outline" size="lg">
                    إضافة سيولة
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WBTC;