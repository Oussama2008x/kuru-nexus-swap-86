import React from 'react';
import { Header } from '@/components/layout/Header';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction and Scope</h2>
              <p className="leading-relaxed">
                Welcome to Kerdium, a revolutionary decentralized finance platform that prioritizes user privacy and data protection. This comprehensive Privacy Policy outlines how we collect, use, process, store, and protect your personal information when you interact with our platform, services, and associated technologies. As a cutting-edge DeFi platform built on blockchain technology, we understand the critical importance of maintaining user privacy while providing innovative financial services. This policy applies to all users of the Kerdium platform, including but not limited to traders, liquidity providers, developers, and any other participants in our ecosystem. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <p className="leading-relaxed">
                Kerdium operates on the principle of minimal data collection while maintaining platform functionality and security. We collect various types of information to provide, maintain, and improve our services. This includes wallet addresses and blockchain transaction data, which are inherently public on the blockchain and necessary for executing trades and maintaining platform functionality. We also collect technical information such as IP addresses, browser types, device information, and usage patterns to ensure platform security, prevent fraud, and optimize user experience. Additionally, we may collect voluntary information that users choose to provide, such as communication preferences, feedback, and support inquiries. It's important to note that as a decentralized platform, much of the data we work with is already publicly available on the blockchain, and we cannot control or modify this information once it's recorded on the distributed ledger.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <p className="leading-relaxed">
                The information we collect serves several critical purposes in maintaining and improving the Kerdium platform. Primary uses include facilitating cryptocurrency transactions, executing trades through our AI-powered algorithms, and maintaining accurate records of platform interactions for security and regulatory compliance purposes. We utilize collected data to enhance user experience through personalized interface optimization, improved trading recommendations, and platform performance analytics. Security measures benefit significantly from data analysis, allowing us to detect and prevent fraudulent activities, identify potential security threats, and maintain the integrity of our smart contracts and AI systems. Research and development efforts rely on aggregated, anonymized data to improve our AI algorithms, develop new features, and optimize platform performance. We may also use information to communicate important platform updates, security notifications, and respond to user support requests. Under no circumstances do we sell, rent, or commercially exploit personal user data to third parties for marketing or advertising purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security and Protection</h2>
              <p className="leading-relaxed">
                Kerdium employs state-of-the-art security measures to protect user data and maintain platform integrity. Our security infrastructure includes military-grade encryption protocols for data transmission and storage, multi-layered authentication systems, and regular security audits conducted by leading cybersecurity firms. All sensitive data is encrypted both in transit and at rest using industry-standard cryptographic algorithms. We implement zero-knowledge proof systems where possible to minimize data exposure while maintaining necessary functionality. Our development team follows secure coding practices and conducts regular penetration testing to identify and address potential vulnerabilities. Additionally, we maintain strict access controls ensuring that only authorized personnel can access user data, and all access is logged and monitored. Our smart contracts undergo rigorous security audits before deployment, and we maintain emergency response protocols to address any potential security incidents. We also employ automated monitoring systems that continuously scan for unusual activities, potential threats, and system anomalies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Blockchain Transparency and Privacy</h2>
              <p className="leading-relaxed">
                As a blockchain-based platform, Kerdium operates within the inherent transparency of distributed ledger technology while striving to protect user privacy to the maximum extent possible. All transactions executed on the Monad blockchain are permanently recorded and publicly accessible, including wallet addresses, transaction amounts, and timestamps. However, these blockchain records do not inherently contain personally identifiable information unless users choose to associate their identity with their wallet addresses. We implement privacy-enhancing technologies where possible, including transaction batching, address rotation recommendations, and privacy-focused routing for enhanced anonymity. Users should understand that while blockchain technology provides security and transparency, it also means that transaction history is permanently preserved and potentially analyzable by third parties. We continuously research and implement new privacy technologies as they become available, including zero-knowledge proofs, privacy coins integration, and other advanced cryptographic techniques to enhance user privacy while maintaining platform functionality and regulatory compliance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services and Integration</h2>
              <p className="leading-relaxed">
                Kerdium integrates with various third-party services and protocols to provide comprehensive DeFi functionality while maintaining strict privacy standards. These integrations include blockchain infrastructure providers, liquidity aggregators, price feed oracles, and analytics services that are essential for platform operation. We carefully vet all third-party partners to ensure they meet our privacy and security standards, and we establish data processing agreements that limit how partner services can use any shared information. When possible, we utilize privacy-preserving integration methods that minimize data sharing while maintaining necessary functionality. Users should be aware that when interacting with external protocols through our platform, those interactions may be subject to the privacy policies and terms of service of the respective third-party services. We provide clear disclosure when transactions or activities involve third-party services, and we continuously monitor our integrations to ensure ongoing compliance with our privacy standards. Additionally, we maintain the right to terminate partnerships with any service that fails to meet our privacy and security requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">User Rights and Control</h2>
              <p className="leading-relaxed">
                Kerdium is committed to providing users with comprehensive control over their personal information and platform interactions. Users have the right to access any personal data we maintain about them, request corrections to inaccurate information, and understand how their data is being used within our platform. While blockchain transaction data cannot be deleted due to the immutable nature of distributed ledgers, users can request deletion of any personal information stored in our centralized systems. We provide tools and interfaces that allow users to manage their privacy settings, control data sharing preferences, and opt-out of non-essential data collection activities. Users can also request data portability, receiving copies of their data in machine-readable formats for use with other services. We respect user rights to restrict processing of their personal information for specific purposes, and we provide clear mechanisms for users to exercise these rights. Our customer support team is trained to handle privacy-related requests promptly and efficiently, ensuring that users can effectively manage their privacy preferences and data rights within the platform ecosystem.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Updates and Contact Information</h2>
              <p className="leading-relaxed">
                This Privacy Policy may be updated periodically to reflect changes in our practices, technologies, legal requirements, or platform functionality. We will notify users of any material changes through platform notifications, email communications, or prominent notices on our website. Users are encouraged to review this policy regularly to stay informed about how we protect their privacy and handle their information. For any questions, concerns, or requests related to this Privacy Policy or our privacy practices, users can contact our dedicated privacy team through our official support channels. We are committed to addressing privacy inquiries promptly and transparently, providing clear explanations of our practices and working with users to resolve any concerns. Our team continuously monitors evolving privacy regulations and best practices to ensure our policies and procedures remain current and effective in protecting user privacy while enabling innovative DeFi functionality.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;