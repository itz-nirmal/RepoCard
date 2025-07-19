import React, { createContext, useContext } from "react";
import type { RepositoryData } from "../types";

interface ApiContextType {
  fetchRepositoryData: (url: string) => Promise<RepositoryData>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const extractRepoInfo = (url: string) => {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      throw new Error("Invalid GitHub URL");
    }
    return { owner: match[1], repo: match[2] };
  };

  const generateIntelligentDescription = (
    readmeContent: string,
    _repoName: string,
    languages: Record<string, number>
  ): string => {
    if (!readmeContent || readmeContent.length < 50) {
      // Fallback description based on project analysis
      const primaryLang = Object.keys(languages || {})[0] || "software";
      return `A ${primaryLang.toLowerCase()} project designed to solve real-world problems with modern development practices and clean architecture.`;
    }

    // Comprehensive README content cleaning
    const cleanContent = readmeContent
      // Remove code blocks and inline code
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`[^`]+`/g, " ")
      // Remove markdown formatting
      .replace(/!\[.*?\]\(.*?\)/g, " ")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/#{1,6}\s+/g, "")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/~~([^~]+)~~/g, "$1")
      // Remove technical elements
      .replace(/>\s+/g, "")
      .replace(/[-*+]\s+/g, "")
      .replace(/\d+\.\s+/g, "")
      .replace(/\|\s*.*?\s*\|/g, " ")
      .replace(/---+/g, " ")
      .replace(/===+/g, " ")
      // Clean up whitespace
      .replace(/\n+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Extract meaningful sentences
    const sentences = cleanContent
      .split(/[.!?]+\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 15 && s.length < 150)
      .filter((s) => {
        const lower = s.toLowerCase();
        // Exclude technical setup and meta content
        const excludePatterns = [
          /install|setup|clone|download|npm|yarn|pip|composer/,
          /requirements|dependencies|getting started|how to use/,
          /usage|example|demo|contributing|license|readme/,
          /documentation|changelog|version|update|release/,
          /run the|start|execute|command|terminal|bash|shell/,
          /folder|directory|file|config|environment|variable/,
          /github|git|repository|repo|branch|commit|pull request/,
          /test|testing|build|deploy|deployment|ci\/cd/,
          /api key|token|secret|credential|authentication/,
        ];
        return !excludePatterns.some((pattern) => pattern.test(lower));
      });

    // Advanced project analysis
    const primaryLanguages = Object.keys(languages || {});
    const content = cleanContent.toLowerCase();

    // Detect project type with higher accuracy
    let projectType = "";
    let projectPurpose = "";

    // Detect specific project purposes
    if (
      content.includes("portfolio") ||
      content.includes("personal website") ||
      content.includes("showcase")
    ) {
      projectType = "portfolio website";
      projectPurpose = "showcasing professional work and achievements";
    } else if (
      content.includes("e-commerce") ||
      content.includes("shop") ||
      content.includes("store") ||
      content.includes("marketplace")
    ) {
      projectType = "e-commerce platform";
      projectPurpose = "facilitating online shopping and transactions";
    } else if (
      content.includes("blog") ||
      content.includes("cms") ||
      content.includes("content management")
    ) {
      projectType = "content management system";
      projectPurpose = "managing and publishing digital content";
    } else if (
      content.includes("dashboard") ||
      content.includes("analytics") ||
      content.includes("visualization")
    ) {
      projectType = "analytics dashboard";
      projectPurpose = "visualizing data and providing insights";
    } else if (
      content.includes("game") ||
      content.includes("gaming") ||
      content.includes("entertainment")
    ) {
      projectType = "gaming application";
      projectPurpose = "providing interactive entertainment experiences";
    } else if (
      content.includes("chat") ||
      content.includes("messaging") ||
      content.includes("communication")
    ) {
      projectType = "communication platform";
      projectPurpose = "enabling real-time communication and collaboration";
    } else if (
      content.includes("api") ||
      content.includes("service") ||
      content.includes("microservice")
    ) {
      projectType = "backend service";
      projectPurpose = "providing robust API endpoints and data processing";
    } else if (
      content.includes("mobile") ||
      content.includes("ios") ||
      content.includes("android")
    ) {
      projectType = "mobile application";
      projectPurpose = "delivering seamless mobile user experiences";
    } else if (
      content.includes("machine learning") ||
      content.includes("ai") ||
      content.includes("data science")
    ) {
      projectType = "AI/ML application";
      projectPurpose =
        "leveraging artificial intelligence for intelligent solutions";
    } else if (
      content.includes("tool") ||
      content.includes("utility") ||
      content.includes("automation")
    ) {
      projectType = "development tool";
      projectPurpose = "streamlining development workflows and processes";
    } else {
      // Fallback based on primary language
      const primaryLang = primaryLanguages[0] || "software";
      if (primaryLang === "JavaScript" || primaryLang === "TypeScript") {
        projectType = "web application";
        projectPurpose = "delivering modern web experiences";
      } else if (primaryLang === "Python") {
        projectType = "Python application";
        projectPurpose = "solving complex problems with elegant solutions";
      } else if (primaryLang === "Java") {
        projectType = "enterprise application";
        projectPurpose = "providing scalable business solutions";
      } else {
        projectType = `${primaryLang} application`;
        projectPurpose = "delivering high-quality software solutions";
      }
    }

    // Prioritize sentences that describe functionality
    const functionalSentences = sentences.filter((s) => {
      const lower = s.toLowerCase();
      return (
        lower.includes("is a") ||
        lower.includes("is an") ||
        lower.includes("is the") ||
        lower.includes("provides") ||
        lower.includes("offers") ||
        lower.includes("delivers") ||
        lower.includes("allows") ||
        lower.includes("enables") ||
        lower.includes("helps") ||
        lower.includes("designed to") ||
        lower.includes("built to") ||
        lower.includes("created to") ||
        lower.includes("platform") ||
        lower.includes("solution") ||
        lower.includes("system")
      );
    });

    // Find sentences describing features or capabilities
    const capabilitySentences = sentences.filter((s) => {
      const lower = s.toLowerCase();
      return (
        lower.includes("features") ||
        lower.includes("includes") ||
        lower.includes("supports") ||
        lower.includes("can") ||
        lower.includes("able to") ||
        lower.includes("capable of") ||
        (lower.includes("with") &&
          (lower.includes("support") || lower.includes("integration")))
      );
    });

    // Build intelligent description
    let description = "";

    // Priority 1: Use functional sentences
    if (functionalSentences.length > 0) {
      description = functionalSentences[0];
    }
    // Priority 2: Use capability sentences
    else if (capabilitySentences.length > 0) {
      description = capabilitySentences[0];
    }
    // Priority 3: Use any meaningful sentence
    else if (sentences.length > 0) {
      description = sentences[0];
    }
    // Priority 4: Generate contextual description
    else {
      if (projectPurpose) {
        description = `A modern ${projectType} focused on ${projectPurpose}.`;
      } else {
        description = `A comprehensive ${projectType} built with cutting-edge technologies and best practices.`;
      }
    }

    // Enhance with second line if needed
    if (description.length < 90) {
      let secondLine = "";

      // Try to add capability sentence
      if (capabilitySentences.length > 0 && !functionalSentences.length) {
        secondLine = capabilitySentences[0];
      }
      // Add technology context
      else if (primaryLanguages.length > 0) {
        const techs = primaryLanguages.slice(0, 2).join(" and ");
        secondLine = `Built with ${techs} to ensure scalability, performance, and maintainability.`;
      }
      // Add generic enhancement
      else {
        secondLine =
          "Designed with modern architecture principles and user-centric approach.";
      }

      if (secondLine && (description + " " + secondLine).length <= 140) {
        description += " " + secondLine;
      }
    }

    // Final cleanup and formatting
    description = description
      .replace(/\s+/g, " ")
      .replace(/\s*\.\s*\./g, ".")
      .trim();

    // Ensure proper length (2 lines max)
    if (description.length > 140) {
      const words = description.split(" ");
      let truncated = "";
      for (const word of words) {
        if ((truncated + " " + word).length > 135) break;
        truncated += (truncated ? " " : "") + word;
      }
      description = truncated + "...";
    }

    // Ensure proper punctuation
    if (!description.match(/[.!?]$/) && !description.endsWith("...")) {
      description += ".";
    }

    return description;
  };

  const fetchRepositoryData = async (url: string) => {
    const { owner, repo } = extractRepoInfo(url);

    try {
      // Fetch basic repository data
      const repoResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`
      );
      if (!repoResponse.ok) {
        throw new Error("Repository not found");
      }
      const repoData = await repoResponse.json();

      // Fetch languages
      let languages = {};
      try {
        const languagesResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/languages`
        );
        if (languagesResponse.ok) {
          languages = await languagesResponse.json();
        }
      } catch (error) {
        console.warn("Failed to fetch languages:", error);
      }

      // Fetch contributors
      let contributors = [];
      let contributorCount = 0;
      try {
        const contributorsResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=10`
        );
        if (contributorsResponse.ok) {
          contributors = await contributorsResponse.json();
          contributorCount = contributors.length;
        }
      } catch (error) {
        console.warn("Failed to fetch contributors:", error);
      }

      // Fetch README for intelligent description generation
      let generatedDescription = "";
      if (!repoData.description) {
        try {
          const readmeResponse = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/readme`
          );
          if (readmeResponse.ok) {
            const readmeData = await readmeResponse.json();
            const readmeContent = atob(readmeData.content);
            generatedDescription = generateIntelligentDescription(
              readmeContent,
              repoData.name,
              languages
            );
          }
        } catch (error) {
          console.warn("Failed to fetch README:", error);
          // Use default description for repos without README
        }
      }

      return {
        ...repoData,
        description: repoData.description || generatedDescription,
        languages,
        contributors,
        contributorCount,
      };
    } catch (error) {
      console.error("Error fetching repository data:", error);
      throw error;
    }
  };

  return (
    <ApiContext.Provider value={{ fetchRepositoryData }}>
      {children}
    </ApiContext.Provider>
  );
};
