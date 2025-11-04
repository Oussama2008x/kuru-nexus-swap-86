import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, TrendingUp, Shield, Sparkles, ArrowRight, Users, DollarSign } from 'lucide-react';
import { BlockchainMarquee } from '@/components/home/BlockchainMarquee';
import platformSecurity from '@/assets/platform-security.png';
import bitcoinLogo from '@/assets/tokens/bitcoin.png';
import ethLogo from '@/assets/tokens/eth.png';
import usdcLogo from '@/assets/tokens/usdc.png';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              The future
            </span>
            <br />
            <span className="text-foreground">is decentralized</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Seamless swaps, low fees, and true cross-chain freedom
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2" onClick={() => window.location.href = '/swap'}>
              <Zap className="w-4 h-4" />
              Start Trading
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = '/about'}>
              Learn More
            </Button>
          </div>
        </div>

        {/* Blockchain Marquee Section */}
        <BlockchainMarquee />

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Trading</h3>
              <p className="text-muted-foreground">
                AI-powered algorithms optimize your trades for maximum efficiency and minimal slippage.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Audited</h3>
              <p className="text-muted-foreground">
                Built with security-first approach and thoroughly audited smart contracts.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Yield Farming</h3>
              <p className="text-muted-foreground">
                Earn passive income through our innovative staking and liquidity provision programs.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-muted/50 rounded-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Platform Statistics</h2>
            <p className="text-muted-foreground">Join thousands of traders on Kerdium</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-5 h-5 text-green-500 mr-1" />
                <span className="text-2xl font-bold">$2.5M+</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Volume</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-blue-500 mr-1" />
                <span className="text-2xl font-bold">12K+</span>
              </div>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-purple-500 mr-1" />
                <span className="text-2xl font-bold">150+</span>
              </div>
              <p className="text-sm text-muted-foreground">Trading Pairs</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-5 h-5 text-orange-500 mr-1" />
                <span className="text-2xl font-bold">99.9%</span>
              </div>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>

        {/* Platform Security Section */}
        <div className="mb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src={platformSecurity} 
                alt="أمان المنصة المالية" 
                className="w-64 h-64 object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold mb-4">Kerdium Platform Security and Financial Strength</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Kerdium platform relies on the highest standards of financial security and advanced encryption to protect your digital assets. 
              We provide a robust infrastructure audited by cybersecurity experts to ensure the safety of your financial transactions around the clock.
              With a multi-layered protection system and carefully reviewed smart contracts, we guarantee you a safe and reliable trading experience.
            </p>
          </div>
        </div>

        {/* Crypto Trends Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Crypto Trends</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our supported cryptocurrencies with real-time data and advanced features
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => window.location.href = '/usdc'}>
              <CardContent className="p-0 text-center">
                <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src={usdcLogo} alt="USDC" className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2">USDC</h3>
                <p className="text-muted-foreground mb-4">Stable digital currency pegged to USD</p>
                <Badge variant="secondary">Stablecoin</Badge>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => window.location.href = '/weth'}>
              <CardContent className="p-0 text-center">
                <div className="bg-purple-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src={ethLogo} alt="WETH" className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2">WETH</h3>
                <p className="text-muted-foreground mb-4">Wrapped Ethereum for DeFi trading</p>
                <Badge variant="secondary">ERC-20</Badge>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer" onClick={() => window.location.href = '/wbtc'}>
              <CardContent className="p-0 text-center">
                <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src={bitcoinLogo} alt="WBTC" className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2">WBTC</h3>
                <p className="text-muted-foreground mb-4">Bitcoin functionality on Ethereum</p>
                <Badge variant="secondary">Wrapped BTC</Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join the revolution of decentralized finance and experience the power of Kerdium Exchange
          </p>
          <Button size="lg" className="gap-2" onClick={() => window.location.href = '/swap'}>
            <Zap className="w-4 h-4" />
            Launch App
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;