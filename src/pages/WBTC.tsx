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
  ArrowLeft,
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
        {/* Back to Home Button */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

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
              WBTC on Monad Network
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trade Bitcoin seamlessly on Monad with WBTC - the wrapped version of Bitcoin that maintains the same value with advanced DeFi capabilities
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/swap">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                <Coins className="h-5 w-5 mr-2" />
                Trade WBTC Now
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <Shield className="h-5 w-5 mr-2" />
              Read Documentation
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
            <h2 className="text-3xl font-bold mb-4">Why Choose WBTC?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the advantages of using Wrapped Bitcoin on the Monad network
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Bitcoin className="h-5 w-5 text-orange-500" />
                  </div>
                  <CardTitle>Same Bitcoin Value</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  WBTC is backed 1:1 by real Bitcoin, ensuring the same value with greater trading flexibility
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 hover:border-blue-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Zap className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardTitle>Monad Speed</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Benefit from Monad network's high speed and low fees for efficient Bitcoin trading
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 hover:border-green-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle>Advanced Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Audited smart contract with access control system ensuring maximum security
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Lock className="h-5 w-5 text-purple-500" />
                  </div>
                  <CardTitle>Mint & Burn Control</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced permission system for controlling WBTC minting and burning operations with complete security
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Users className="h-5 w-5 text-yellow-500" />
                  </div>
                  <CardTitle>High Liquidity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Enjoy high liquidity and smooth trading with minimal slippage
                </p>
              </CardContent>
            </Card>

            <Card className="border-teal-500/20 hover:border-teal-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-teal-500/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-teal-500" />
                  </div>
                  <CardTitle>DeFi Opportunities</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use WBTC in various DeFi protocols to earn additional yields
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technical Details Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Technical Details</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Detailed technical information about the WBTC smart contract
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Contract Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">ERC-20</Badge>
                  <span className="text-sm text-muted-foreground">Compatible with ERC-20 standard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Mintable</Badge>
                  <span className="text-sm text-muted-foreground">Mintable with permissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Burnable</Badge>
                  <span className="text-sm text-muted-foreground">Burnable with permissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Access Control</Badge>
                  <span className="text-sm text-muted-foreground">Access control system</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">8 Decimals</Badge>
                  <span className="text-sm text-muted-foreground">Same precision as Bitcoin</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Permissions:</strong> Minting and burning operations require special permissions from contract management
                  </p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Security:</strong> Contract is audited and reviewed by security experts
                  </p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Transparency:</strong> All transactions are traceable on the blockchain
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
              <CardTitle className="text-2xl">Start Trading Now</CardTitle>
              <CardDescription className="text-lg">
                Take advantage of trading opportunities with WBTC on Monad network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/swap">
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                    Go to Trading
                    <ArrowRight className="h-5 w-5 mr-2" />
                  </Button>
                </Link>
                <Link to="/pool">
                  <Button variant="outline" size="lg">
                    Add Liquidity
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