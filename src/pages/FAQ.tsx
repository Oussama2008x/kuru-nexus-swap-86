import React from 'react';
import { Header } from '@/components/layout/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "What is Kerdium and how does it work?",
      answer: "Kerdium is a cutting-edge decentralized finance (DeFi) platform built on the Monad blockchain that revolutionizes cryptocurrency trading through advanced artificial intelligence algorithms. Our platform combines the security and transparency of blockchain technology with sophisticated AI-powered trading mechanisms that analyze market patterns, execute optimal trades, and provide users with unprecedented trading efficiency. The platform utilizes smart contracts to ensure secure, trustless transactions while our AI engine continuously learns from market data to improve trading strategies and provide users with the best possible trading experience."
    },
    {
      question: "How do I get started with trading on Kerdium?",
      answer: "Getting started with Kerdium is straightforward and user-friendly. First, you'll need to connect your Web3 wallet (such as MetaMask) to our platform. Once connected, ensure you're on the Monad Testnet network - our platform will automatically prompt you to switch if needed. You can then deposit supported cryptocurrencies into your wallet and start trading immediately through our intuitive swap interface. Our AI-powered system will automatically find the best trading routes and execute your trades at optimal prices. For new users, we recommend starting with small amounts to familiarize yourself with the platform's features and capabilities."
    },
    {
      question: "What makes Kerdium different from other DeFi platforms?",
      answer: "Kerdium stands out in the crowded DeFi space through several innovative features. Our primary differentiator is the integration of advanced artificial intelligence that continuously monitors market conditions, analyzes trading patterns, and executes trades with superhuman speed and precision. Unlike traditional DEXs that rely solely on automated market makers, our AI engine actively optimizes trading routes across multiple liquidity sources to ensure users get the best possible prices. Additionally, we're built on the high-performance Monad blockchain, which offers superior transaction speeds and lower costs compared to other networks. Our platform also features a unique reward system that incentivizes long-term participation and community building."
    },
    {
      question: "Is my money safe on Kerdium platform?",
      answer: "Security is our top priority at Kerdium, and we've implemented multiple layers of protection to safeguard user funds. All smart contracts undergo rigorous security audits by leading blockchain security firms, and our code is open-source for complete transparency. We utilize battle-tested security protocols including multi-signature wallets, time-locked transactions, and emergency pause mechanisms. User funds are never held in centralized custody - they remain in your wallet under your control at all times. Our AI trading algorithms operate through secure smart contracts that cannot access user funds beyond the specific trade authorization. Additionally, we maintain a comprehensive insurance fund to protect users against potential smart contract vulnerabilities."
    },
    {
      question: "What cryptocurrencies are supported on Kerdium?",
      answer: "Kerdium currently supports a carefully selected range of major cryptocurrencies including MON (Monad's native token), WBTC (Wrapped Bitcoin), USDC (USD Coin), and ETH (Ethereum). We're continuously expanding our supported asset list based on community demand, trading volume, and security considerations. Each new token addition undergoes thorough security reviews and liquidity assessments before integration. Our AI algorithms are specifically optimized for these supported assets, ensuring maximum trading efficiency and price optimization. We plan to add more assets including popular DeFi tokens, stablecoins, and emerging cryptocurrencies as the platform grows and matures."
    },
    {
      question: "How does the AI trading system work?",
      answer: "Our AI trading system represents a breakthrough in decentralized finance technology. The system utilizes advanced machine learning algorithms that analyze vast amounts of market data in real-time, including price movements, trading volumes, liquidity patterns, and market sentiment indicators. The AI engine continuously learns from historical trading data and market behavior to identify optimal trading opportunities and execute trades at the most favorable prices. When you initiate a trade, our AI instantly evaluates multiple trading routes across different liquidity pools and selects the path that minimizes slippage and maximizes your returns. The system also predicts market movements and can recommend optimal timing for trades, helping users make more informed decisions."
    },
    {
      question: "What are the fees associated with using Kerdium?",
      answer: "Kerdium operates on a transparent and competitive fee structure designed to provide maximum value to our users. Our platform charges a minimal trading fee of 0.25% per transaction, which is significantly lower than many traditional centralized exchanges. This fee is automatically deducted from your trade and helps maintain platform operations, fund development, and support the AI infrastructure. Unlike other platforms, we don't charge additional fees for using our AI-powered features - they're included as part of our core service. Gas fees for blockchain transactions are determined by the Monad network and are typically very low due to the network's efficiency. We also offer fee discounts for high-volume traders and long-term platform participants through our loyalty program."
    },
    {
      question: "Can I provide liquidity to earn rewards?",
      answer: "Yes, Kerdium offers comprehensive liquidity provision opportunities that allow users to earn passive income while supporting the platform's ecosystem. As a liquidity provider, you can deposit token pairs into our liquidity pools and earn a share of trading fees generated by the platform. Our AI-optimized pools offer superior returns compared to traditional AMM pools by intelligently managing liquidity distribution and minimizing impermanent loss. Liquidity providers also earn additional rewards through our native token distribution program, which allocates tokens based on the amount and duration of liquidity provided. The platform also features innovative features like dynamic fee adjustments and automated rebalancing to maximize returns for liquidity providers."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Find answers to the most common questions about Kerdium platform
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
              <AccordionTrigger className="text-left text-lg font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  );
};

export default FAQ;