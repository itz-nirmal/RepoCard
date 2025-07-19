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
    
    // Clean and process README content more thoroughly
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
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    // Extract meaningful sentences that describe the project
    const sentences = cleanContent
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 15 && s.length < 150)
      .filter(s => {
        const lower = s.toLowerCase();
        return !lower.includes('installation') &&
               !lower.includes('getting started') &&
               !lower.includes('contributing') &&
               !lower.includes('license') &&
               !lower.includes('requirements') &&
               !lower.includes('dependencies') &&
               !lower.includes('setup') &&
               !lower.includes('download') &&
               !lower.includes('clone') &&
               !lower.includes('npm install') &&
               !lower.includes('yarn') &&
               !lower.includes('git clone') &&
               !lower.includes('usage:') &&
               !lower.includes('example:') &&
               !lower.includes('demo:');
      });

    // Identify project type and purpose based on languages and content
    const primaryLanguages = Object.keys(languages || {});
    const content = cleanContent.toLowerCase();
    let projectType = 'software project';
    let projectPurpose = '';
    
    // Determine project type from languages
    if (primaryLanguages.includes('JavaScript') || primaryLanguages.includes('TypeScript')) {
      if (content.includes('react') || content.includes('vue') || content.includes('angular') || content.includes('frontend')) {
        projectType = 'web application';
      } else if (content.includes('node') || content.includes('express') || content.includes('api') || content.includes('server')) {
        projectType = 'backend service';
      } else if (content.includes('mobile') || content.includes('react native')) {
        projectType = 'mobile application';
      } else {
        projectType = 'JavaScript project';
      }
    } else if (primaryLanguages.includes('Python')) {
      if (content.includes('django') || content.includes('flask') || content.includes('fastapi')) {
        projectType = 'web framework';
      } else if (content.includes('machine learning') || content.includes('ai') || content.includes('data science') || content.includes('neural')) {
        projectType = 'data science tool';
      } else if (content.includes('automation') || content.includes('script')) {
        projectType = 'automation tool';
      } else {
        projectType = 'Python application';
      }
    }

    // Determine project purpose from content
    if (content.includes('portfolio') || content.includes('showcase')) {
      projectPurpose = 'showcasing skills and projects';
    } else if (content.includes('e-commerce') || content.includes('shop') || content.includes('store')) {
      projectPurpose = 'online commerce and shopping';
    } else if (content.includes('blog') || content.includes('cms') || content.includes('content management')) {
      projectPurpose = 'content management and publishing';
    } else if (content.includes('dashboard') || content.includes('admin') || content.includes('analytics')) {
      projectPurpose = 'data visualization and management';
    } else if (content.includes('game') || content.includes('gaming')) {
      projectPurpose = 'gaming and entertainment';
    } else if (content.includes('chat') || content.includes('messaging') || content.includes('social')) {
      projectPurpose = 'communication and social interaction';
    } else if (content.includes('api') || content.includes('service') || content.includes('microservice')) {
      projectPurpose = 'providing backend services and APIs';
    } else if (content.includes('tool') || content.includes('utility') || content.includes('helper')) {
      projectPurpose = 'providing useful tools and utilities';
    }

    // Find the most descriptive sentences that explain what the project does
    let description = '';
    
    // Priority 1: Look for sentences that explicitly describe functionality
    const descriptiveSentences = sentences.filter(s => {
      const lower = s.toLowerCase();
      return (
        lower.includes('is a') ||
        lower.includes('is an') ||
        lower.includes('provides') || 
        lower.includes('allows') || 
        lower.includes('helps') || 
        lower.includes('enables') || 
        lower.includes('designed to') ||
        lower.includes('designed for') ||
        lower.includes('built for') ||
        lower.includes('built to') ||
        lower.includes('tool for') ||
        lower.includes('library for') ||
        lower.includes('framework for') ||
        lower.includes('platform for') ||
        lower.includes('solution for') ||
        lower.includes('application for') ||
        lower.includes('system for') ||
        lower.includes('creates') ||
        lower.includes('generates') ||
        lower.includes('manages') ||
        lower.includes('handles')
      );
    });

    // Priority 2: Look for sentences that mention key features
    const featureSentences = sentences.filter(s => {
      const lower = s.toLowerCase();
      return (
        lower.includes('features') ||
        lower.includes('includes') ||
        lower.includes('supports') ||
        lower.includes('offers') ||
        lower.includes('implements') ||
        lower.includes('with') && (lower.includes('responsive') || lower.includes('modern') || lower.includes('interactive'))
      );
    });

    // Priority 3: Look for sentences that describe the project's domain
    const domainSentences = sentences.filter(s => {
      const lower = s.toLowerCase();
      return (
        lower.includes('web') ||
        lower.includes('mobile') ||
        lower.includes('desktop') ||
        lower.includes('cloud') ||
        lower.includes('database') ||
        lower.includes('frontend') ||
        lower.includes('backend') ||
        lower.includes('fullstack')
      );
    });

    if (descriptiveSentences.length > 0) {
      description = descriptiveSentences[0];
      // Add a second sentence if the first is short
      if (description.length < 60 && descriptiveSentences.length > 1) {
        description += ' ' + descriptiveSentences[1];
      } else if (description.length < 60 && featureSentences.length > 0) {
        description += ' ' + featureSentences[0];
      }
    } else if (featureSentences.length > 0) {
      description = featureSentences[0];
      if (description.length < 60 && domainSentences.length > 0) {
        description += ' ' + domainSentences[0];
      }
    } else if (domainSentences.length > 0) {
      description = domainSentences[0];
      if (description.length < 60 && sentences.length > 0) {
        description += ' ' + sentences[0];
      }
    } else if (sentences.length > 0) {
      // Use the first two meaningful sentences
      description = sentences[0];
      if (description.length < 60 && sentences.length > 1) {
        description += ' ' + sentences[1];
      }
    }

    // If we still don't have a good description, create an intelligent one
    if (!description || description.length < 30) {
      let intelligentDescription = '';
      
      if (projectPurpose) {
        intelligentDescription = `A modern ${projectType} focused on ${projectPurpose}.`;
      } else {
        // Extract key features from content
        const features = [];
        if (content.includes('responsive')) features.push('responsive design');
        if (content.includes('real-time') || content.includes('realtime')) features.push('real-time functionality');
        if (content.includes('api')) features.push('API integration');
        if (content.includes('database')) features.push('data management');
        if (content.includes('authentication') || content.includes('auth')) features.push('user authentication');
        if (content.includes('dashboard')) features.push('analytics dashboard');
        if (content.includes('mobile')) features.push('mobile compatibility');
        if (content.includes('interactive')) features.push('interactive features');
        
        if (features.length >= 2) {
          intelligentDescription = `A comprehensive ${projectType} featuring ${features[0]} and ${features[1]}.`;
        } else if (features.length === 1) {
          intelligentDescription = `An innovative ${projectType} with ${features[0]} capabilities.`;
        } else {
          intelligentDescription = `A well-crafted ${projectType} built with ${primaryLanguages.slice(0, 2).join(' and ')}.`;
        }
      }
      
      // Add a second line about the technology stack or purpose
      if (primaryLanguages.length > 0) {
        intelligentDescription += ` Built with ${primaryLanguages.slice(0, 2).join(' and ')} for optimal performance and maintainability.`;
      } else {
        intelligentDescription += ` Designed with modern development practices and user experience in mind.`;
      }
      
      description = intelligentDescription;
    }

    // Ensure the description is properly formatted and concise
    description = description.replace(/\s+/g, ' ').trim();
    
    // Limit to approximately 2 lines (around 120-140 characters)
    const words = description.split(' ');
    if (words.length > 22) {
      description = words.slice(0, 22).join(' ') + '...';
    }

    // Ensure it ends with proper punctuation
    if (!description.match(/[.!?]$/)) {
      if (description.endsWith('...')) {
        // Keep the ellipsis
      } else {
        description += '.';
      }
    }

    return description || `A comprehensive ${projectType} designed for modern development needs and user experience.`;
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