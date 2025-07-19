import React, { useRef } from 'react';
import { Download, RotateCcw, Github, Star, GitFork, Eye, Users, Calendar, ExternalLink, Code } from 'lucide-react';
import { generateColorPalette } from '../utils/colorGenerator';
import { downloadCard } from '../utils/cardDownloader';
import { getLanguageLogo, getLanguageColor } from '../utils/languageLogos';

interface RepoCardProps {
  repoData: any;
  onCreateAnother: () => void;
}

const RepoCard: React.FC<RepoCardProps> = ({ repoData, onCreateAnother }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const colorPalette = generateColorPalette();

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        await downloadCard(cardRef.current, `${repoData.name}-report-card.png`);
      } catch (error) {
        console.error('Download failed:', error);
        alert('Download failed. Please try again.');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      {/* Action Buttons */}
      <div className="flex justify-center gap-6">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Download className="w-5 h-5" />
          Download Card
        </button>
        <button
          onClick={onCreateAnother}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <RotateCcw className="w-5 h-5" />
          Create Another
        </button>
      </div>

      {/* Compact Report Card */}
      <div
        ref={cardRef}
        className="rounded-2xl shadow-2xl overflow-hidden relative"
        style={{
          background: colorPalette.cardBg,
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        {/* Header with Gradient Background */}
        <div 
          className="relative p-5"
          style={{ background: colorPalette.gradient }}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                <Github className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white mb-1">{repoData.name}</h1>
                <p className="text-white/90 flex items-center gap-2 text-sm">
                  <ExternalLink className="w-3 h-3" />
                  <span>Visit: {repoData.html_url}</span>
                </p>
              </div>
            </div>
            <div className="text-right text-white/90 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-2 text-xs mb-1">
                <Calendar className="w-3 h-3" />
                <span>Created: {formatDate(repoData.created_at)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="w-3 h-3" />
                <span>Updated: {formatDate(repoData.updated_at)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-5 border-b border-gray-200/50">
          <div 
            className="rounded-xl p-4"
            style={{ background: colorPalette.sectionBg }}
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 leading-none" style={{ color: colorPalette.text }}>
              <Code className="w-4 h-4 flex-shrink-0" style={{ color: colorPalette.primary }} />
              Project Description
            </h3>
            <p className="leading-relaxed" style={{ color: colorPalette.text }}>
              {repoData.description || repoData.generatedDescription || 'No description available.'}
            </p>
          </div>
        </div>

        {/* Statistics and Languages - Optimized Layout */}
        <div className="p-5 grid md:grid-cols-5 gap-5">
          {/* Statistics - Compact 2x2 Grid */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 leading-none" style={{ color: colorPalette.text }}>
              <Star className="w-4 h-4 flex-shrink-0" style={{ color: colorPalette.primary }} />
              Repository Statistics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: colorPalette.statBg }}>
                <div className="p-1 bg-yellow-100 rounded-lg flex-shrink-0">
                  <Star className="w-3 h-3 text-yellow-600" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-none" style={{ color: colorPalette.text }}>{formatNumber(repoData.stargazers_count)}</div>
                  <div className="text-xs text-gray-600">Stars</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: colorPalette.statBg }}>
                <div className="p-1 bg-blue-100 rounded-lg flex-shrink-0">
                  <GitFork className="w-3 h-3 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-none" style={{ color: colorPalette.text }}>{formatNumber(repoData.forks_count)}</div>
                  <div className="text-xs text-gray-600">Forks</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: colorPalette.statBg }}>
                <div className="p-1 bg-green-100 rounded-lg flex-shrink-0">
                  <Eye className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-none" style={{ color: colorPalette.text }}>{formatNumber(repoData.watchers_count)}</div>
                  <div className="text-xs text-gray-600">Watchers</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: colorPalette.statBg }}>
                <div className="p-1 bg-purple-100 rounded-lg flex-shrink-0">
                  <Users className="w-3 h-3 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-none" style={{ color: colorPalette.text }}>{repoData.contributorCount || 'N/A'}</div>
                  <div className="text-xs text-gray-600">Contributors</div>
                </div>
              </div>
            </div>
          </div>

          {/* Languages - Grid Layout with Logos */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 leading-none" style={{ color: colorPalette.text }}>
              <div 
                className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: colorPalette.primary }}
              >
                <Code className="w-2.5 h-2.5 text-white" />
              </div>
              Languages
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {repoData.languages && Object.keys(repoData.languages).length > 0 ? (
                Object.entries(repoData.languages).slice(0, 6).map(([language, bytes]: [string, any]) => {
                  const totalBytes = Object.values(repoData.languages).reduce((a: number, b: number) => a + b, 0);
                  const percentage = ((bytes / totalBytes) * 100).toFixed(1);
                  return (
                    <div 
                      key={language} 
                      className="flex items-center gap-2 p-2 rounded-lg"
                      style={{ backgroundColor: colorPalette.statBg }}
                      data-language-item="true"
                    >
                      <img
                        src={getLanguageLogo(language)}
                        alt={language}
                        className="w-4 h-4 flex-shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate leading-none" style={{ color: colorPalette.text }}>{language}</div>
                        <div className="text-xs text-gray-500">{percentage}%</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-3 rounded-lg text-center col-span-2" style={{ backgroundColor: colorPalette.statBg }}>
                  <p className="text-gray-500 text-sm">No language data</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Author and Top Contributors - Compact Layout */}
        <div 
          className="p-5 border-t border-gray-200/50 grid md:grid-cols-2 gap-6"
          style={{ background: colorPalette.authorBg }}
        >
          {/* Author */}
          <div>
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2 leading-none" style={{ color: colorPalette.text }}>
              <Users className="w-4 h-4 flex-shrink-0" style={{ color: colorPalette.primary }} />
              Repository Author
            </h3>
            <div className="flex items-center gap-3 p-2 bg-white/50 rounded-lg">
              <img
                src={repoData.owner.avatar_url}
                alt={repoData.owner.login}
                className="w-8 h-8 rounded-full border-2 flex-shrink-0"
                style={{ borderColor: colorPalette.primary }}
              />
              <div>
                <div className="text-xs font-semibold leading-none" style={{ color: colorPalette.text }}>{repoData.owner.login}</div>
                <div className="text-gray-600 text-xs">@{repoData.owner.login}</div>
              </div>
            </div>
          </div>

          {/* Top Contributors */}
          <div>
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2 leading-none" style={{ color: colorPalette.text }}>
              <Star className="w-4 h-4 flex-shrink-0" style={{ color: colorPalette.primary }} />
              Top Contributors
            </h3>
            <div>
              {repoData.contributors && repoData.contributors.length > 0 ? (
                <div 
                  key={repoData.contributors[0].login} 
                  className="flex items-center gap-3 p-2 bg-white/50 rounded-lg"
                  data-contributor-item="true"
                >
                    <div className="relative">
                      <img
                        src={repoData.contributors[0].avatar_url}
                        alt={repoData.contributors[0].login}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Star className="w-1.5 h-1.5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate leading-none" style={{ color: colorPalette.text }}>{repoData.contributors[0].login}</div>
                      <div className="text-xs text-gray-600">{formatNumber(repoData.contributors[0].contributions)} contributions</div>
                    </div>
                </div>
              ) : (
                <div className="p-2 bg-white/50 rounded-lg text-center">
                  <p className="text-gray-500 text-sm">No contributor data</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="p-4"
          style={{ background: colorPalette.gradient }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                <Github className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Made with RepoCard</div>
                <div className="text-white/80 text-xs">Visit: {repoData.html_url}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/80 text-xs">Generated on</div>
              <div className="text-white text-sm font-medium">{new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;