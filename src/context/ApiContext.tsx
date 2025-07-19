import React, { createContext, useContext } from 'react';

interface ApiContextType {
  fetchRepositoryData: (url: string) => Promise<any>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const extractRepoInfo = (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      throw new Error('Invalid GitHub URL');
    }
    return { owner: match[1], repo: match[2] };
  };

  const generateIntelligentDescription = (readmeContent: string, repoName: string, languages: any): string => {
    if (!readmeContent) return '';
    
    // Clean README content by removing technical sections
    const cleanContent = readmeContent
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`[^`]+`/g, '') // Remove inline code
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
      .replace(/#{1,6}\s+/g, '') // Remove markdown headers
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold formatting
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic formatting
      .replace(/>\s+/g, '') // Remove blockquotes
      .replace(/[-*+]\s+/g, '') // Remove list markers
      .replace(/\d+\.\s+/g, '') // Remove numbered list markers
      .replace(/\|\s*.*?\s*\|/g, '') // Remove table content
      .replace(/---+/g, '') // Remove horizontal rules
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    // Split into sentences and filter for meaningful content
    const sentences = cleanContent
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.length < 200)
      .filter(s => {
        const lower = s.toLowerCase();
        // Filter out technical/setup content
        const excludeTerms = [
          'install', 'setup', 'clone', 'download', 'npm', 'yarn', 'pip',
          'requirements', 'dependencies', 'getting started', 'how to',
          'usage:', 'example:', 'demo:', 'contributing', 'license',
          'documentation', 'readme', 'changelog', 'version', 'update',
          'run the', 'start the', 'execute', 'command', 'terminal',
          'folder', 'directory', 'file', 'config', 'environment'
        ];
        return !excludeTerms.some(term => lower.includes(term));
      });

    // Analyze project type from languages and content
    const primaryLanguages = Object.keys(languages || {});
    const content = cleanContent.toLowerCase();
    
    let projectType = 'application';
    let domain = '';
    
    // Determine project type and domain
    if (primaryLanguages.includes('JavaScript') || primaryLanguages.includes('TypeScript')) {
      if (content.includes('react') || content.includes('vue') || content.includes('angular')) {
        projectType = 'web application';
        domain = 'frontend development';
      } else if (content.includes('node') || content.includes('express') || content.includes('api')) {
        projectType = 'backend service';
        domain = 'server-side development';
      } else if (content.includes('mobile') || content.includes('react native') || content.includes('ionic')) {
        projectType = 'mobile app';
        domain = 'mobile development';
      } else {
        projectType = 'web application';
        domain = 'web development';
      }
    } else if (primaryLanguages.includes('Python')) {
      if (content.includes('machine learning') || content.includes('ai') || content.includes('data science')) {
        projectType = 'data science application';
        domain = 'artificial intelligence';
      } else if (content.includes('django') || content.includes('flask')) {
        projectType = 'web application';
        domain = 'backend development';
      } else if (content.includes('automation') || content.includes('script')) {
        projectType = 'automation tool';
        domain = 'process automation';
      } else {
        projectType = 'Python application';
        domain = 'software development';
      }
    } else if (primaryLanguages.includes('Java')) {
      projectType = 'Java application';
      domain = 'enterprise development';
    } else if (primaryLanguages.includes('C++') || primaryLanguages.includes('C')) {
      projectType = 'system application';
      domain = 'system programming';
    }

    // Find the best descriptive sentences
    const descriptiveSentences = sentences.filter(s => {
      const lower = s.toLowerCase();
      return (
        lower.includes('is a') || lower.includes('is an') ||
        lower.includes('provides') || lower.includes('allows') ||
        lower.includes('helps') || lower.includes('enables') ||
        lower.includes('designed') || lower.includes('built') ||
        lower.includes('creates') || lower.includes('manages') ||
        lower.includes('platform') || lower.includes('tool') ||
        lower.includes('system') || lower.includes('application')
      );
    });

    // Find feature sentences
    const featureSentences = sentences.filter(s => {
      const lower = s.toLowerCase();
      return (
        lower.includes('features') || lower.includes('includes') ||
        lower.includes('supports') || lower.includes('offers') ||
        lower.includes('with') || lower.includes('using')
      );
    });

    // Determine purpose from content
    let purpose = '';
    if (content.includes('portfolio') || content.includes('showcase')) {
      purpose = 'showcasing professional work and skills';
    } else if (content.includes('e-commerce') || content.includes('shop') || content.includes('store')) {
      purpose = 'online shopping and commerce';
    } else if (content.includes('blog') || content.includes('cms')) {
      purpose = 'content management and publishing';
    } else if (content.includes('dashboard') || content.includes('analytics')) {
      purpose = 'data visualization and analytics';
    } else if (content.includes('game') || content.includes('gaming')) {
      purpose = 'gaming and entertainment';
    } else if (content.includes('chat') || content.includes('messaging')) {
      purpose = 'communication and messaging';
    } else if (content.includes('api') || content.includes('service')) {
      purpose = 'providing backend services';
    } else if (content.includes('tool') || content.includes('utility')) {
      purpose = 'providing useful tools and utilities';
    }

    // Build description
    let description = '';
    
    // Use the best available sentences
    if (descriptiveSentences.length > 0) {
      description = descriptiveSentences[0];
    } else if (sentences.length > 0) {
      // Use the first meaningful sentence
      description = sentences[0];
    }

    // Create intelligent description if none found
    if (!description || description.length < 25) {
      if (purpose) {
        description = `A modern ${projectType} designed for ${purpose}.`;
      } else {
        description = `A comprehensive ${projectType} built with modern technologies.`;
      }
    }

    // Add a second line if description is short
    if (description.length < 80) {
      if (featureSentences.length > 0) {
        description += ' ' + featureSentences[0];
      } else if (domain) {
        description += ` Specializes in ${domain} with focus on user experience and performance.`;
      } else if (primaryLanguages.length > 0) {
        description += ` Built with ${primaryLanguages.slice(0, 2).join(' and ')} for optimal performance.`;
      }
    }

    // Clean up and format description
    description = description.replace(/\s+/g, ' ').trim();
    
    // Limit to 2 lines (approximately 140 characters)
    if (description.length > 140) {
      const words = description.split(' ');
      let truncated = '';
      for (const word of words) {
        if ((truncated + ' ' + word).length > 137) break;
        truncated += (truncated ? ' ' : '') + word;
      }
      description = truncated + '...';
    }

    // Ensure proper punctuation
    if (!description.match(/[.!?]$/)) {
      if (!description.endsWith('...')) {
        description += '.';
      }
    }

    return description || `A modern ${projectType} designed with cutting-edge technologies and best practices.`;
  };

  const fetchRepositoryData = async (url: string) => {
    const { owner, repo } = extractRepoInfo(url);
    
    try {
      // Fetch basic repository data
      const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (!repoResponse.ok) {
        throw new Error('Repository not found');
      }
      const repoData = await repoResponse.json();

      // Fetch languages
      let languages = {};
      try {
        const languagesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
        if (languagesResponse.ok) {
          languages = await languagesResponse.json();
        }
      } catch (error) {
        console.warn('Failed to fetch languages:', error);
      }

      // Fetch contributors
      let contributors = [];
      let contributorCount = 0;
      try {
        const contributorsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=10`);
        if (contributorsResponse.ok) {
          contributors = await contributorsResponse.json();
          contributorCount = contributors.length;
        }
      } catch (error) {
        console.warn('Failed to fetch contributors:', error);
      }

      // Fetch README for intelligent description generation
      let generatedDescription = '';
      if (!repoData.description) {
        try {
          const readmeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
          if (readmeResponse.ok) {
            const readmeData = await readmeResponse.json();
            const readmeContent = atob(readmeData.content);
            generatedDescription = generateIntelligentDescription(readmeContent, repoData.name, languages);
          }
        } catch (error) {
          console.warn('Failed to fetch README:', error);
          generatedDescription = `A ${Object.keys(languages)[0] || 'software'} project with modern features and functionality.`;
        }
      }

      return {
        ...repoData,
        languages,
        contributors,
        contributorCount,
        generatedDescription
      };
    } catch (error) {
      console.error('Error fetching repository data:', error);
      throw error;
    }
  };

  return (
    <ApiContext.Provider value={{ fetchRepositoryData }}>
      {children}
    </ApiContext.Provider>
  );
};