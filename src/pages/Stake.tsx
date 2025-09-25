import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Coins, 
  TrendingUp, 
  Clock, 
  Award, 
  Zap, 
  Calendar,
  DollarSign,
  Users
} from 'lucide-react';

const Stake = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const stakingPools = [
    {
      id: 1,
      name: 'WMON Staking',
      token: 'WMON',
      apy: '24.5%',
      lockPeriod: '30 days',
      totalStaked: '1,250,000',
      rewards: '305,000',
      participants: 1247,
      icon: Coins,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'USDC Vault',
      token: 'USDC',
      apy: '18.2%',
      lockPeriod: '60 days',
      totalStaked: '850,000',
      rewards: '154,700',
      participants: 892,
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'WETH Pool',
      token: 'WETH',
      apy: '32.1%',
      lockPeriod: '90 days',
      totalStaked: '425,000',
      rewards: '136,425',
      participants: 634,
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const lockPeriods = [
    { days: '30', apy: '15%', bonus: 'Standard' },
    { days: '60', apy: '22%', bonus: '+7% APY' },
    { days: '90', apy: '28%', bonus: '+13% APY' },
    { days: '180', apy: '35%', bonus: '+20% APY' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
              <Award className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Stake & Earn Rewards</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stake your tokens and earn passive income with our high-yield staking pools. 
            Secure, transparent, and automated rewards.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Value Locked</p>
                  <p className="text-2xl font-bold">$2.5M</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average APY</p>
                  <p className="text-2xl font-bold">24.9%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Stakers</p>
                  <p className="text-2xl font-bold">2,773</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rewards Paid</p>
                  <p className="text-2xl font-bold">$596K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pools" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="pools">Staking Pools</TabsTrigger>
            <TabsTrigger value="stake">Stake Tokens</TabsTrigger>
          </TabsList>

          {/* Staking Pools */}
          <TabsContent value="pools" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {stakingPools.map((pool) => (
                <Card key={pool.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${pool.color} rounded-lg flex items-center justify-center`}>
                          <pool.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{pool.name}</CardTitle>
                          <Badge variant="secondary">{pool.token}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{pool.apy}</p>
                        <p className="text-sm text-muted-foreground">APY</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Lock Period</p>
                        <p className="font-medium">{pool.lockPeriod}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Participants</p>
                        <p className="font-medium">{pool.participants.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Total Staked</span>
                        <span className="font-medium">{pool.totalStaked} {pool.token}</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      Stake {pool.token}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Stake Tokens */}
          <TabsContent value="stake" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Stake Your Tokens</span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Token Selection */}
                  <div className="space-y-2">
                    <Label>Select Token</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {['WMON', 'USDC', 'WETH'].map((token) => (
                        <Button
                          key={token}
                          variant="outline"
                          className="h-16 flex flex-col"
                        >
                          <span className="font-semibold">{token}</span>
                          <span className="text-xs text-muted-foreground">Balance: 0.00</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="space-y-2">
                    <Label htmlFor="stake-amount">Stake Amount</Label>
                    <div className="relative">
                      <Input
                        id="stake-amount"
                        type="number"
                        placeholder="0.00"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        className="pr-16"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 px-2 text-xs"
                      >
                        MAX
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Available: 0.00 WMON</p>
                  </div>

                  {/* Lock Period Selection */}
                  <div className="space-y-3">
                    <Label>Lock Period</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {lockPeriods.map((period) => (
                        <Button
                          key={period.days}
                          variant={selectedPeriod === period.days ? "default" : "outline"}
                          className="h-16 flex flex-col"
                          onClick={() => setSelectedPeriod(period.days)}
                        >
                          <span className="font-semibold">{period.days} Days</span>
                          <span className="text-xs">{period.apy} APY</span>
                          {period.bonus !== 'Standard' && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              {period.bonus}
                            </Badge>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Estimated Rewards */}
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Estimated Rewards</p>
                          <p className="text-lg font-bold">0.00 WMON</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Unlock Date</p>
                          <p className="text-lg font-bold">--</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stake Button */}
                  <Button size="lg" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Stake Tokens
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Stake;