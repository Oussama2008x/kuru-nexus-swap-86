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

const blockchains = [
  { name: 'Ethereum', logo: ethereumLogo },
  { name: 'Monad', logo: monadLogo },
  { name: 'Avalanche', logo: avalancheLogo },
  { name: 'BNB Chain', logo: bnbLogo },
  { name: 'Base', logo: baseLogo },
  { name: 'Cora', logo: coraLogo },
  { name: 'zkSync', logo: zksyncLogo },
  { name: 'Polygon', logo: polygonLogo },
  { name: 'Optimism', logo: optimismLogo },
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

      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling container */}
        <div className="flex animate-scroll">
          {/* First set of logos */}
          {blockchains.map((chain, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <img
                src={chain.logo}
                alt={chain.name}
                className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {blockchains.map((chain, index) => (
            <div
              key={`second-${index}`}
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
