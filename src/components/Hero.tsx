import React, { useState, useEffect, useRef } from 'react';
import { Github } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import InputCard from './InputCard';
import RepoCard from './RepoCard';
import { useApi } from '../context/ApiContext';

const Hero: React.FC = () => {
  const [url, setUrl] = useState('');
  const [buttonState, setButtonState] = useState<'initial' | 'generating' | 'generated'>('initial');
  const [repoData, setRepoData] = useState<any>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { fetchRepositoryData } = useApi();

  const handleGenerateCard = async () => {
    if (!url.trim()) return;
    
    setButtonState('generating');
    try {
      const data = await fetchRepositoryData(url);
      setRepoData(data);
      setButtonState('generated');
    } catch (error) {
      console.error('Error generating card:', error);
      setButtonState('initial');
      alert('Failed to fetch repository data. Please check the URL and try again.');
    }
  };

  const handleCreateAnother = () => {
    setUrl('');
    setButtonState('initial');
    setRepoData(null);
  };

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    if (buttonState !== 'initial') {
      setButtonState('initial');
      setRepoData(null);
    }
  };

  return (
    <div ref={heroRef} className="relative min-h-screen flex flex-col">
      <AnimatedBackground containerRef={heroRef} />
      
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        {!repoData ? (
          <>
            {/* Logo and Title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-50 blur-sm animate-pulse"></div>
                <div className="relative bg-gray-900 p-4 rounded-full">
                  <Github className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white relative">
                <span className="relative z-10">RepoCard</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-30 blur-sm animate-pulse"></div>
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-300 text-center mb-12 max-w-2xl">
              Generate beautiful report cards for your GitHub repositories with comprehensive insights and statistics
            </p>

            {/* Input Card */}
            <InputCard
              url={url}
              onUrlChange={handleUrlChange}
              onGenerate={handleGenerateCard}
              buttonState={buttonState}
            />
          </>
        ) : (
          <RepoCard
            repoData={repoData}
            onCreateAnother={handleCreateAnother}
          />
        )}
      </div>
    </div>
  );
};

export default Hero;