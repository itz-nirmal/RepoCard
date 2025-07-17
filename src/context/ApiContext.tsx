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
    
    // Clean and process README content
    const cleanContent = readmeContent
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
      .replace(/#+ /g, '') // Remove headers
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold formatting
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic formatting
      .replace(/`([^`]+)`/g, '$1') // Remove inline code
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();

    // Extract meaningful sentences
    const sentences = cleanContent
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.length < 200)
      .filter(s => !s.toLowerCase().includes('installation'))
      .filter(s => !s.toLowerCase().includes('getting started'))
      .filter(s => !s.toLowerCase().includes('contributing'))
      .filter(s => !s.toLowerCase().includes('license'));

    // Identify project type based on languages and content
    const primaryLanguages = Object.keys(languages || {});
    let projectType = '';
    
    if (primaryLanguages.includes('JavaScript') || primaryLanguages.includes('TypeScript')) {
      if (cleanContent.toLowerCase().includes('react') || cleanContent.toLowerCase().includes('vue') || cleanContent.toLowerCase().includes('angular')) {
        projectType = 'web application';
      } else if (cleanContent.toLowerCase().includes('node') || cleanContent.toLowerCase().includes('express')) {
        projectType = 'backend service';
      } else {
        projectType = 'JavaScript project';
      }
    } else if (primaryLanguages.includes('Python')) {
      if (cleanContent.toLowerCase().includes('django') || cleanContent.toLowerCase().includes('flask') || cleanContent.toLowerCase().includes('fastapi')) {
        projectType = 'web framework';
      } else if (cleanContent.toLowerCase().includes('machine learning') || cleanContent.toLowerCase().includes('ai') || cleanContent.toLowerCase().includes('data')) {
        projectType = 'data science tool';
      } else {
        projectType = 'Python application';
      }
    } else if (primaryLanguages.includes('Java')) {
      projectType = 'Java application';
    } else if (primaryLanguages.includes('Go')) {
      projectType = 'Go service';
    } else if (primaryLanguages.includes('Rust')) {
      projectType = 'Rust application';
    } else if (primaryLanguages.includes('C++') || primaryLanguages.includes('C')) {
      projectType = 'system application';
    } else {
      projectType = 'software project';
    }

    // Find the most descriptive sentences
    let description = '';
    
    // Look for sentences that describe what the project does
    const descriptiveSentences = sentences.filter(s => {
      const lower = s.toLowerCase();
      return (
        lower.includes('is a') || 
        lower.includes('provides') || 
        lower.includes('allows') || 
        lower.includes('helps') || 
        lower.includes('enables') || 
        lower.includes('designed to') ||
        lower.includes('built for') ||
        lower.includes('tool for') ||
        lower.includes('library for') ||
        lower.includes('framework for')
      );
    });

    if (descriptiveSentences.length > 0) {
      description = descriptiveSentences[0];
    } else if (sentences.length > 0) {
      // Use the first meaningful sentence
      description = sentences[0];
    }

    // If we still don't have a good description, create one
    if (!description || description.length < 30) {
      const features = [];
      const content = cleanContent.toLowerCase();
      
      if (content.includes('api')) features.push('API integration');
      if (content.includes('database')) features.push('database management');
      if (content.includes('ui') || content.includes('interface')) features.push('user interface');
      if (content.includes('authentication')) features.push('authentication');
      if (content.includes('real-time') || content.includes('realtime')) features.push('real-time features');
      if (content.includes('responsive')) features.push('responsive design');
      if (content.includes('mobile')) features.push('mobile support');
      if (content.includes('performance')) features.push('performance optimization');
      
      if (features.length > 0) {
        description = `A modern ${projectType} featuring ${features.slice(0, 2).join(' and ')}.`;
      } else {
        description = `An innovative ${projectType} built with ${primaryLanguages.slice(0, 2).join(' and ')}.`;
      }
    }

    // Ensure the description is concise (2 lines max)
    const words = description.split(' ');
    if (words.length > 25) {
      description = words.slice(0, 25).join(' ') + '...';
    }

    // Add a second line if the description is too short
    if (description.length < 80 && sentences.length > 1) {
      const secondSentence = sentences.find(s => s !== description && s.length < 100);
      if (secondSentence) {
        description += ' ' + secondSentence;
      }
    }

    return description || `A comprehensive ${projectType} with modern features and functionality.`;
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