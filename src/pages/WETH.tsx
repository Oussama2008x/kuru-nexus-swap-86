import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WETHStats } from '@/components/weth/WETHStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Shield, Zap, Coins, TrendingUp, ArrowUpDown, Lock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WETH = () => {
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
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl"></div>
              <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-2xl">
                <img src="/src/assets/tokens/weth.png" alt="WETH" className="h-12 w-12" />
              </div>
            </div>
            <ArrowUpDown className="h-8 w-8 text-muted-foreground" />
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl">
                <img src="/src/assets/tokens/eth.png" alt="ETH" className="h-12 w-12" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Wrapped Ether
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
              WETH on Monad Network
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trade Ethereum seamlessly on Monad with WETH - the wrapped version of Ether that maintains the same value while enabling advanced DeFi capabilities
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              ERC-20 Compatible
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <Coins className="w-4 h-4 mr-2" />
              1:1 with ETH
            </Badge>
            <Badge variant="default" className="text-sm px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Monad Network
            </Badge>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/swap">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <Coins className="h-5 w-5 mr-2" />
                Trade WETH Now
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
          <WETHStats />
        </section>

        {/* Information Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">About WETH</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding Wrapped Ether and its benefits on the Monad blockchain
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Coins className="h-5 w-5 text-purple-500" />
                  </div>
                  <CardTitle>What is WETH?</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  WETH is an ERC-20 token that represents Ether, allowing ETH to be used in smart contracts that require ERC-20 tokens
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 hover:border-blue-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <ArrowUpDown className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardTitle>How it Works?</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You can wrap ETH to get WETH at a 1:1 ratio, and unwrap WETH back to ETH anytime. It's like putting ETH in a wrapper
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 hover:border-green-500/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle>Security & Reliability</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  WETH is backed 1:1 by ETH locked in a smart contract, ensuring security and maintaining the same value as ETH
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technical Details Section */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Smart Contract Information</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technical details about the WETH smart contract on Monad
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-background to-purple-500/5 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl">Contract Details</CardTitle>
                <CardDescription>
                  WETH token information on Monad Testnet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-mono">Wrapped Ether</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Symbol</p>
                    <p className="font-mono">WETH</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Decimals</p>
                    <p className="font-mono">18</p>
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

            <Card className="border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Wrapping:</strong> Convert ETH to WETH to use in DeFi protocols and smart contracts
                  </p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Unwrapping:</strong> Convert WETH back to ETH anytime at a 1:1 ratio
                  </p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <p className="text-sm">
                    <strong>Gas Fees:</strong> Small gas fees apply for wrapping and unwrapping operations
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">How to Use WETH</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Step-by-step guide for wrapping and unwrapping Ether
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5 text-green-500" />
                  Wrapping ETH to WETH
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-500">1</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Connect your wallet to Kerdium platform</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-500">2</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Navigate to the WETH wrapping interface</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-500">3</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Enter the amount of ETH you want to wrap</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-500">4</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Confirm the transaction and pay gas fees</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5 text-blue-500" />
                  Unwrapping WETH to ETH
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-500">1</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Access the WETH unwrapping interface</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-500">2</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Specify the amount of WETH to unwrap</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-500">3</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Approve the WETH spending if required</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-500">4</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Execute the unwrapping transaction</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                Start Trading with WETH
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Experience the power of wrapped Ether on Monad network with enhanced DeFi capabilities
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/swap">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
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

export default WETH;