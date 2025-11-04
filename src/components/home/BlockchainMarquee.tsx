import React from 'react';
import avalancheLogo from '@/assets/chains/avalanche.png';
import bnbLogo from '@/assets/chains/bnb.png';
import baseLogo from '@/assets/chains/base.png';
import coraLogo from '@/assets/chains/cora.png';
import zksyncLogo from '@/assets/chains/zksync.png';
import polygonLogo from '@/assets/chains/polygon.png';
import optimismLogo from '@/assets/chains/optimism.png';
import monadLogo from '@/assets/networks/monad.png';
import ethereumLogo from '@/assets/networks/ethereum.png';

const blockchainsRow1 = [
  { name: 'Ethereum', logo: ethereumLogo },
  { name: 'Base', logo: baseLogo },
  { name: 'Polygon', logo: polygonLogo },
];

const blockchainsRow2 = [
  { name: 'Monad', logo: monadLogo },
  { name: 'BNB Chain', logo: bnbLogo },
  { name: 'Optimism', logo: optimismLogo },
];

const blockchainsRow3 = [
  { name: 'Avalanche', logo: avalancheLogo },
  { name: 'Cora', logo: coraLogo },
  { name: 'zkSync', logo: zksyncLogo },
];

export const BlockchainMarquee = () => {
  return (
    <div className="py-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
          Trade ETH, USDC, WBTC, and more
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Access thousands of assets across 12 chains
        </p>
      </div>

      <div className="relative space-y-6">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Row 1: Right to Left */}
        <div className="flex animate-scroll-rtl">
          {blockchainsRow1.map((chain, index) => (
            <div
              key={`row1-first-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <img
                src={chain.logo}
                alt={chain.name}
                className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
          {blockchainsRow1.map((chain, index) => (
            <div
              key={`row1-second-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <img
                src={chain.logo}
                alt={chain.name}
                className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
          {blockchainsRow1.map((chain, index) => (
            <div
              key={`row1-third-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <img
                src={chain.logo}
                alt={chain.name}
                className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Left to Right */}
        <div className="flex animate-scroll-ltr">
          {blockchainsRow2.map((chain, index) => (
            <div
              key={`row2-first-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <img
                src={chain.logo}
                alt={chain.name}
                className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
          {blockchainsRow2.map((chain, index) => (
            <div
              key={`row2-second-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <img
                src={chain.logo}
                alt={chain.name}
                className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
          {blockchainsRow2.map((chain, index) => (
            <div
              key={`row2-third-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <img
                src={chain.logo}
                alt={chain.name}
                className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        {/* Row 3: Right to Left */}
        <div className="flex animate-scroll-rtl">
          {blockchainsRow3.map((chain, index) => (
            <div
              key={`row3-first-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <img
                src={chain.logo}
                alt={chain.name}
                className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
          {blockchainsRow3.map((chain, index) => (
            <div
              key={`row3-second-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <img
                src={chain.logo}
                alt={chain.name}
                className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
          {blockchainsRow3.map((chain, index) => (
            <div
              key={`row3-third-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <img
                src={chain.logo}
                alt={chain.name}
                className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
