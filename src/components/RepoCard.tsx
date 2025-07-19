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
} from "lucide-react";
import { generateColorPalette } from "../utils/colorGenerator";
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
}

const RepoCard: React.FC<RepoCardProps> = ({ repoData, onCreateAnother }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const colorPalette = generateColorPalette();

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
          background: colorPalette.cardBg,
          width: "900px", // Increased width to prevent cropping
          minWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Header with Gradient Background */}
        <div
          className="relative p-5"
          style={{ background: colorPalette.gradient }}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: colorPalette.statBg }}
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
              style={{ backgroundColor: colorPalette.statBg }}
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
        <div className="p-5 grid grid-cols-5 gap-5">
          {/* Statistics - Compact 2x2 Grid */}
          <div className="col-span-2 space-y-3">
            <h3
              className="text-lg font-semibold mb-3 flex items-center gap-2 leading-none"
              style={{ color: colorPalette.text }}
            >
              <Star
                className="w-4 h-4 flex-shrink-0 inline-block align-middle"
                style={{ color: colorPalette.primary }}
              />
              Repository Statistics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{ backgroundColor: colorPalette.statBg }}
              >
                <div className="p-1 bg-yellow-100 rounded-lg flex-shrink-0">
                  <Star className="w-3 h-3 text-yellow-600" />
                </div>
                <div>
                  <div
                    className="text-xs font-bold leading-none"
                    style={{ color: colorPalette.text }}
                  >
                    {formatNumber(repoData.stargazers_count)}
                  </div>
                  <div className="text-xs text-gray-300">Stars</div>
                </div>
              </div>
              <div
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{ backgroundColor: colorPalette.statBg }}
              >
                <div className="p-1 bg-blue-100 rounded-lg flex-shrink-0">
                  <GitFork className="w-3 h-3 text-blue-600" />
                </div>
                <div>
                  <div
                    className="text-xs font-bold leading-none"
                    style={{ color: colorPalette.text }}
                  >
                    {formatNumber(repoData.forks_count)}
                  </div>
                  <div className="text-xs text-gray-300">Forks</div>
                </div>
              </div>
              <div
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{ backgroundColor: colorPalette.statBg }}
              >
                <div className="p-1 bg-green-100 rounded-lg flex-shrink-0">
                  <Eye className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <div
                    className="text-xs font-bold leading-none"
                    style={{ color: colorPalette.text }}
                  >
                    {formatNumber(repoData.watchers_count)}
                  </div>
                  <div className="text-xs text-gray-300">Visitors</div>
                </div>
              </div>
              <div
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{ backgroundColor: colorPalette.statBg }}
              >
                <div className="p-1 bg-purple-100 rounded-lg flex-shrink-0">
                  <Users className="w-3 h-3 text-purple-600" />
                </div>
                <div>
                  <div
                    className="text-xs font-bold leading-none"
                    style={{ color: colorPalette.text }}
                  >
                    {repoData.contributorCount || "N/A"}
                  </div>
                  <div className="text-xs text-gray-300">Contributors</div>
                </div>
              </div>
            </div>
          </div>

          {/* Languages - Grid Layout with Logos */}
          <div className="col-span-3 space-y-3">
            <h3
              className="text-lg font-semibold mb-3 flex items-center gap-2 leading-none"
              style={{ color: colorPalette.text }}
            >
              <Code
                className="w-4 h-4 flex-shrink-0 inline-block align-middle"
                style={{ color: colorPalette.primary }}
              />
              Languages
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {repoData.languages &&
              Object.keys(repoData.languages).length > 0 ? (
                Object.entries(repoData.languages)
                  .slice(0, 6)
                  .map(([language, bytes]: [string, number]) => {
                    const totalBytes = Object.values(repoData.languages).reduce(
                      (a: number, b: number) => a + b,
                      0
                    );
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
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-xs font-medium truncate leading-none"
                            style={{ color: colorPalette.text }}
                          >
                            {language}
                          </div>
                          <div className="text-xs text-white">
                            {percentage}%
                          </div>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div
                  className="p-3 rounded-lg text-center col-span-2"
                  style={{ backgroundColor: colorPalette.statBg }}
                >
                  <p className="text-gray-500 text-sm">No language data</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Author and Top Contributors - Compact Layout */}
        <div
          className="p-5 grid grid-cols-2 gap-6"
          style={{ background: colorPalette.authorBg }}
        >
          {/* Author */}
          <div>
            <h3
              className="text-base font-semibold mb-3 flex items-center gap-2 leading-none"
              style={{ color: colorPalette.text }}
            >
              <Users
                className="w-4 h-4 flex-shrink-0 inline-block align-middle"
                style={{ color: colorPalette.primary }}
              />
              Repository Author
            </h3>
            <div
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: colorPalette.statBg }}
            >
              <img
                src={repoData.owner.avatar_url}
                alt={repoData.owner.login}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div>
                <div className="text-sm font-semibold leading-none text-white">
                  {repoData.owner.login}
                </div>
                <div className="text-white/70 text-xs mt-1">
                  @{repoData.owner.login}
                </div>
              </div>
            </div>
          </div>

          {/* Top Contributors */}
          <div>
            <h3
              className="text-base font-semibold mb-3 flex items-center gap-2 leading-none"
              style={{ color: colorPalette.text }}
            >
              <Star
                className="w-4 h-4 flex-shrink-0 inline-block align-middle"
                style={{ color: colorPalette.primary }}
              />
              Top Contributors
            </h3>
            <div>
              {repoData.contributors && repoData.contributors.length > 0 ? (
                <div
                  key={repoData.contributors[0].login}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ backgroundColor: colorPalette.statBg }}
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
                    <div className="text-sm font-medium truncate leading-none text-white">
                      {repoData.contributors[0].login}
                    </div>
                    <div className="text-xs text-white/70 mt-1">
                      {formatNumber(repoData.contributors[0].contributions)}{" "}
                      contributions
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="p-3 rounded-lg text-center"
                  style={{ backgroundColor: colorPalette.statBg }}
                >
                  <p className="text-white/70 text-sm">No contributor data</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4" style={{ background: colorPalette.gradient }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: colorPalette.statBg }}
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
