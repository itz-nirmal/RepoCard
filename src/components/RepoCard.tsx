import React, { useRef } from "react";
import {
  Download,
  RotateCcw,
  Github,
  Star,
  GitFork,
  Eye,
  Users,
  Calendar,
  ExternalLink,
  Code,
  Award,
  Medal,
  Trophy,
} from "lucide-react";
import type { ColorPalette } from "../utils/colorGenerator";
import {
  downloadCard,
  downloadCardAsPNG,
  downloadCardAsPDF,
} from "../utils/cardDownloader";
import { getLanguageLogo } from "../utils/languageLogos";
import type { RepositoryData } from "../types";

interface RepoCardProps {
  repoData: RepositoryData;
  onCreateAnother: () => void;
  colorPalette: ColorPalette | null;
}

const RepoCard: React.FC<RepoCardProps> = ({
  repoData,
  onCreateAnother,
  colorPalette,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);

  // Use a default color palette if none is provided
  const defaultColorPalette = {
    primary: "#4A5568",
    secondary: "#2D3748",
    accent: "#63B3ED",
    background: "linear-gradient(135deg, #1A202C 0%, #2D3748 100%)",
    text: "#FFFFFF",
    gradient: "linear-gradient(135deg, #1A202C 0%, #2D3748 100%)",
    cardBg: "linear-gradient(135deg, #1A202C 0%, #2D3748 100%)",
    statBg: "rgba(255, 255, 255, 0.1)",
    sectionBg: "linear-gradient(135deg, #2D3748 0%, #4A5568 100%)",
    authorBg: "linear-gradient(135deg, #2D3748 0%, #4A5568 100%)",
  };

  const currentPalette = colorPalette || defaultColorPalette;

  const handleDownloadHTML = async () => {
    if (cardRef.current) {
      try {
        setIsDownloading(true);
        await downloadCard(
          cardRef.current,
          `${repoData.name}-report-card.html`
        );
      } catch (error) {
        console.error("Download failed:", error);
        alert("Download failed. Please try again.");
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleDownloadPNG = async () => {
    if (cardRef.current) {
      try {
        setIsDownloading(true);
        await downloadCardAsPNG(
          cardRef.current,
          `${repoData.name}-report-card`
        );
      } catch (error) {
        console.error("PNG generation failed:", error);
        alert("PNG generation failed. Please try the HTML download instead.");
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleDownloadPDF = async () => {
    if (cardRef.current) {
      try {
        setIsDownloading(true);
        await downloadCardAsPDF(
          cardRef.current,
          `${repoData.name}-report-card`
        );
      } catch (error) {
        console.error("PDF generation failed:", error);
        alert("PDF generation failed. Please try the HTML download instead.");
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-16">
      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleDownloadHTML}
            disabled={isDownloading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Download className="w-5 h-5" />
            {isDownloading ? "Downloading..." : "Download HTML"}
          </button>
          <button
            onClick={handleDownloadPNG}
            disabled={isDownloading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-slate-100 rounded-xl font-semibold hover:from-slate-600 hover:to-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Download className="w-5 h-5" />
            {isDownloading ? "Converting..." : "Download PNG"}
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-zinc-700 to-zinc-800 text-zinc-100 rounded-xl font-semibold hover:from-zinc-600 hover:to-zinc-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Download className="w-5 h-5" />
            {isDownloading ? "Converting..." : "Download PDF"}
          </button>
          <button
            onClick={onCreateAnother}
            disabled={isDownloading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-stone-700 to-stone-800 text-stone-100 rounded-xl font-semibold hover:from-stone-600 hover:to-stone-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <RotateCcw className="w-5 h-5" />
            Create Another
          </button>
        </div>
        <div className="text-gray-300 text-sm text-center max-w-2xl">
          <p>
            Choose your preferred format: HTML for web viewing, PNG for
            high-quality images, or PDF for documents
          </p>
        </div>
      </div>

      {/* Spacer for horizontal separation */}
      <div className="h-8"></div>

      {/* Compact Report Card */}
      <div
        ref={cardRef}
        className="rounded-2xl overflow-hidden relative"
        style={{
          background: currentPalette.cardBg,
          width: "900px", // Increased width to prevent cropping
          minWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Header with Gradient Background */}
        <div
          className="relative p-5"
          style={{ background: currentPalette.gradient }}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: currentPalette.statBg }}
              >
                <Github className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white mb-1">
                  {repoData.name}
                </h1>
                <p className="text-white/90 flex items-center gap-2 text-sm">
                  <ExternalLink className="w-3 h-3" />
                  <span>Visit: {repoData.html_url}</span>
                </p>
              </div>
            </div>
            <div
              className="text-right text-white/90 p-3 rounded-xl"
              style={{ backgroundColor: currentPalette.statBg }}
            >
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

        {/* Statistics and Languages - Optimized Layout */}
        <div className="p-5 flex gap-6">
          {/* Statistics - Compact Inline Layout */}
          <div className="flex-shrink-0">
            <h3
              className="text-base font-semibold mb-3 flex items-center gap-2 leading-none"
              style={{ color: currentPalette.text }}
            >
              <Star
                className="w-4 h-4 flex-shrink-0 inline-block align-middle"
                style={{ color: currentPalette.primary }}
              />
              Repository Statistics
            </h3>
            <div className="grid grid-cols-2 gap-2 w-fit">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg min-w-fit"
                style={{ backgroundColor: currentPalette.statBg }}
              >
                <div className="p-1 bg-yellow-100 rounded-lg flex-shrink-0">
                  <Star className="w-3 h-3 text-yellow-600" />
                </div>
                <div>
                  <div
                    className="text-xs font-bold leading-none"
                    style={{ color: currentPalette.text }}
                  >
                    {formatNumber(repoData.stargazers_count)}
                  </div>
                  <div className="text-xs text-gray-300">Stars</div>
                </div>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg min-w-fit"
                style={{ backgroundColor: currentPalette.statBg }}
              >
                <div className="p-1 bg-blue-100 rounded-lg flex-shrink-0">
                  <GitFork className="w-3 h-3 text-blue-600" />
                </div>
                <div>
                  <div
                    className="text-xs font-bold leading-none"
                    style={{ color: currentPalette.text }}
                  >
                    {formatNumber(repoData.forks_count)}
                  </div>
                  <div className="text-xs text-gray-300">Forks</div>
                </div>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg min-w-fit"
                style={{ backgroundColor: currentPalette.statBg }}
              >
                <div className="p-1 bg-green-100 rounded-lg flex-shrink-0">
                  <Eye className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <div
                    className="text-xs font-bold leading-none"
                    style={{ color: currentPalette.text }}
                  >
                    {formatNumber(repoData.watchers_count)}
                  </div>
                  <div className="text-xs text-gray-300">Watchers</div>
                </div>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg min-w-fit"
                style={{ backgroundColor: currentPalette.statBg }}
              >
                <div className="p-1 bg-purple-100 rounded-lg flex-shrink-0">
                  <Users className="w-3 h-3 text-purple-600" />
                </div>
                <div>
                  <div
                    className="text-xs font-bold leading-none"
                    style={{ color: currentPalette.text }}
                  >
                    {repoData.contributorCount || "N/A"}
                  </div>
                  <div className="text-xs text-gray-300">
                    Active Contributors
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Languages - Enhanced Layout */}
          <div className="flex-1 space-y-3">
            <h3
              className="text-base font-semibold mb-3 flex items-center gap-2 leading-none"
              style={{ color: currentPalette.text }}
            >
              <Code
                className="w-4 h-4 flex-shrink-0 inline-block align-middle"
                style={{ color: currentPalette.primary }}
              />
              Languages
            </h3>
            <div className="flex flex-wrap gap-3">
              {repoData.languages &&
              Object.keys(repoData.languages).length > 0 ? (
                Object.entries(repoData.languages)
                  .slice(0, 8)
                  .map(([language, bytes]: [string, number]) => {
                    const totalBytes = Object.values(repoData.languages).reduce(
                      (a: number, b: number) => a + b,
                      0
                    );
                    const percentage = ((bytes / totalBytes) * 100).toFixed(1);
                    return (
                      <div
                        key={language}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: currentPalette.statBg }}
                        data-language-item="true"
                      >
                        <img
                          src={getLanguageLogo(language)}
                          alt={language}
                          className="w-4 h-4 flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                        <div className="flex items-center gap-2">
                          <span
                            className="text-sm font-medium"
                            style={{ color: currentPalette.text }}
                          >
                            {language}
                          </span>
                          <span className="text-sm text-white/80 font-semibold">
                            {percentage}%
                          </span>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div
                  className="p-4 rounded-lg text-center w-full"
                  style={{ backgroundColor: currentPalette.statBg }}
                >
                  <p className="text-gray-500 text-sm">No language data</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Author and Top Contributors - Compact Layout with Equal Heights */}
        <div
          className="p-5 grid grid-cols-2 gap-6 items-stretch"
          style={{ background: currentPalette.authorBg }}
        >
          {/* Author */}
          <div className="flex flex-col">
            <h3
              className="text-base font-semibold mb-3 flex items-center gap-2 leading-none"
              style={{ color: currentPalette.text }}
            >
              <Users
                className="w-4 h-4 flex-shrink-0 inline-block align-middle"
                style={{ color: currentPalette.primary }}
              />
              Repository Author
            </h3>
            <div
              className="flex items-center gap-3 p-3 rounded-lg flex-1"
              style={{ backgroundColor: currentPalette.statBg }}
            >
              <img
                src={repoData.owner.avatar_url}
                alt={repoData.owner.login}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div>
                <div className="text-sm font-semibold leading-none text-white">
                  {repoData.owner.name || repoData.owner.login}
                </div>
                <div className="text-white/70 text-xs mt-1">
                  @{repoData.owner.login}
                </div>
              </div>
            </div>
          </div>

          {/* Top Contributors */}
          <div className="flex flex-col">
            <h3
              className="text-base font-semibold mb-3 flex items-center gap-2 leading-none"
              style={{ color: currentPalette.text }}
            >
              <Star
                className="w-4 h-4 flex-shrink-0 inline-block align-middle"
                style={{ color: currentPalette.primary }}
              />
              Top Contributors
            </h3>
            <div className="flex-1">
              {repoData.contributors && repoData.contributors.length > 0 ? (
                repoData.contributors.length > 3 ? (
                  // Show top 3 contributors with badges - Side by Side
                  <div className="flex gap-2 h-full">
                    {repoData.contributors
                      .slice(0, 3)
                      .map((contributor, index) => {
                        const badgeConfig = [
                          {
                            icon: Trophy,
                            color: "text-yellow-500",
                            bg: "bg-yellow-500/20",
                          }, // Gold
                          {
                            icon: Medal,
                            color: "text-gray-400",
                            bg: "bg-gray-400/20",
                          }, // Silver
                          {
                            icon: Award,
                            color: "text-amber-600",
                            bg: "bg-amber-600/20",
                          }, // Bronze
                        ];
                        const BadgeIcon = badgeConfig[index].icon;

                        return (
                          <div
                            key={contributor.login}
                            className="flex-1 flex flex-col items-center gap-2 p-3 rounded-lg"
                            style={{ backgroundColor: currentPalette.statBg }}
                            data-contributor-item="true"
                          >
                            <div className="relative">
                              <img
                                src={contributor.avatar_url}
                                alt={contributor.login}
                                className="w-8 h-8 rounded-full flex-shrink-0"
                              />
                              <div
                                className={`absolute -top-1 -right-1 w-4 h-4 ${badgeConfig[index].bg} rounded-full flex items-center justify-center`}
                              >
                                <BadgeIcon
                                  className={`w-2.5 h-2.5 ${badgeConfig[index].color}`}
                                />
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs font-medium truncate leading-none text-white max-w-full">
                                {contributor.login}
                              </div>
                              <div className="text-xs text-white/70 mt-1">
                                {formatNumber(contributor.contributions || 0)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  // Show single top contributor for repos with 3 or fewer contributors
                  <div
                    key={repoData.contributors[0].login}
                    className="flex items-center gap-3 p-3 rounded-lg h-full"
                    style={{ backgroundColor: currentPalette.statBg }}
                    data-contributor-item="true"
                  >
                    <div className="relative">
                      <img
                        src={repoData.contributors[0].avatar_url}
                        alt={repoData.contributors[0].login}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        <Trophy className="w-2.5 h-2.5 text-yellow-500" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate leading-none text-white">
                        {repoData.contributors[0].login}
                      </div>
                      <div className="text-xs text-white/70 mt-1">
                        {formatNumber(
                          repoData.contributors[0].contributions || 0
                        )}{" "}
                        contributions
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div
                  className="p-3 rounded-lg text-center h-full flex items-center justify-center"
                  style={{ backgroundColor: currentPalette.statBg }}
                >
                  <p className="text-white/70 text-sm">No contributor data</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4" style={{ background: currentPalette.gradient }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: currentPalette.statBg }}
              >
                <img
                  src="/Footer-Logo.jpg"
                  alt="RepoCard Logo"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">
                  Made with RepoCard
                </div>
                <div className="text-white/80 text-xs">
                  Visit: https://repo--card.vercel.app/
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/80 text-xs">Generated on</div>
              <div className="text-white text-sm font-medium">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
