import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { USDCStats } from '@/components/usdc/USDCStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Shield, Zap, Globe, CheckCircle, Coins, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import usdcLogo from '@/assets/tokens/usdc.png';

const USDC = () => {
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-2xl">
                <img src={usdcLogo} alt="USDC" className="h-12 w-12" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              USD Coin
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
              USDC on Monad Network
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trade with confidence using USDC - a stable digital currency pegged 1:1 to the US Dollar, now available on the high-performance Monad blockchain
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Stablecoin
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Monad Network
            </Badge>
            <Badge variant="default" className="text-sm px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              USD Backed
            </Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/swap">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <Coins className="h-5 w-5 mr-2" />
                Trade USDC Now
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
          <USDCStats />
        </section>

        {/* Features Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose USDC?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the advantages of using USD Coin on the Monad network
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-blue-500/20 hover:border-blue-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardTitle>Price Stability</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pegged 1:1 to the US Dollar, ensuring consistent value and reducing volatility for stable transactions
                </p>
              </CardContent>
            </Card>

            <Card className="border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Zap className="h-5 w-5 text-cyan-500" />
                  </div>
                  <CardTitle>Fast Transactions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lightning-fast transactions with minimal fees on the high-performance Monad blockchain
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 hover:border-green-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Globe className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle>Interoperability</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  ERC-20 compatible and usable across various DeFi applications and exchanges
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                  </div>
                  <CardTitle>Full Transparency</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All transactions verifiable on-chain and backed by audited USD reserves
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Shield className="h-5 w-5 text-orange-500" />
                  </div>
                  <CardTitle>Advanced Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Audited by certified security firms and compliant with regulatory standards
                </p>
              </CardContent>
            </Card>

            <Card className="border-teal-500/20 hover:border-teal-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-teal-500/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-teal-500" />
                  </div>
                  <CardTitle>High Liquidity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  High liquidity available across major exchanges and DeFi platforms
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technical Details Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Technical Information</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Detailed technical specifications for the USDC smart contract
            </p>
          </div>

          <Card className="bg-gradient-to-br from-background to-blue-500/5 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-2xl">Smart Contract Details</CardTitle>
              <CardDescription>
                USDC contract information on Monad Testnet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Token Name</p>
                  <p className="font-mono">USD Coin</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Symbol</p>
                  <p className="font-mono">USDC</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Decimals</p>
                  <p className="font-mono">6</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Network</p>
                  <p className="font-mono">Monad Testnet</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Contract Address</p>
                <code className="bg-muted p-2 rounded text-xs block break-all">
                  0x... {/* Replace with actual contract address */}
                </code>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How to Use Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">How to Use USDC on Kerdium</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started with USDC trading in three simple steps
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-500">1</span>
                </div>
                <CardTitle>Connect Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect your MetaMask or any Monad-compatible wallet to get started
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-cyan-500">2</span>
                </div>
                <CardTitle>Get USDC</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Acquire USDC through swapping or transferring from other networks
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-500">3</span>
                </div>
                <CardTitle>Start Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use USDC for trading and investing in the Kerdium DeFi ecosystem
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                Start with USDC Today
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join the Kerdium platform and start using USDC for stable, efficient trading in the DeFi world
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/swap">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Go to Trading
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

export default USDC;