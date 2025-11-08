import React from 'react';
import avalancheLogo from '@/assets/chains/avalanche.png';
import bnbLogo from '@/assets/chains/bnb.png';
import baseLogo from '@/assets/chains/base.png';
import coraLogo from '@/assets/chains/cora.png';
import zksyncLogo from '@/assets/chains/zksync.png';
import polygonLogo from '@/assets/chains/polygon.png';
import optimismLogo from '@/assets/chains/optimism.png';

const blockchainsRow1 = [
  { name: 'Base', logo: baseLogo },
  { name: 'Polygon', logo: polygonLogo },
  { name: 'Avalanche', logo: avalancheLogo },
];

const blockchainsRow2 = [
  { name: 'BNB Chain', logo: bnbLogo },
  { name: 'Optimism', logo: optimismLogo },
  { name: 'Cora', logo: coraLogo },
];

const blockchainsRow3 = [
  { name: 'zkSync', logo: zksyncLogo },
  { name: 'Base', logo: baseLogo },
  { name: 'Polygon', logo: polygonLogo },
];

export const BlockchainMarquee = () => {
  return (
    <div className="py-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
          Trade ETH, USDC, WBTC, and more
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Access thousands of assets across 4+ chains
        </p>
      </div>

      <div className="relative space-y-6 overflow-hidden">
        {/* No gradient overlays */}

        {/* Row 1: Right to Left */}
        <div className="flex animate-scroll-rtl whitespace-nowrap">
          {[...Array(6)].map((_, setIndex) => (
            <React.Fragment key={`row1-set-${setIndex}`}>
              {blockchainsRow1.map((chain, index) => (
                <div
                  key={`row1-${setIndex}-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <img
                    src={chain.logo}
                    alt={chain.name}
                    className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Row 2: Left to Right */}
        <div className="flex animate-scroll-ltr whitespace-nowrap">
          {[...Array(6)].map((_, setIndex) => (
            <React.Fragment key={`row2-set-${setIndex}`}>
              {blockchainsRow2.map((chain, index) => (
                <div
                  key={`row2-${setIndex}-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <img
                    src={chain.logo}
                    alt={chain.name}
                    className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Row 3: Right to Left */}
        <div className="flex animate-scroll-rtl whitespace-nowrap">
          {[...Array(6)].map((_, setIndex) => (
            <React.Fragment key={`row3-set-${setIndex}`}>
              {blockchainsRow3.map((chain, index) => (
                <div
                  key={`row3-${setIndex}-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <img
                    src={chain.logo}
                    alt={chain.name}
                    className="h-16 md:h-20 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
