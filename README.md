# RepoCard 🎨

Generate beautiful, professional report cards for your GitHub repositories with comprehensive insights and statistics.

![RepoCard Preview](./Favicone.png)

## ✨ Features

- **🎨 Beautiful Dark Themes**: 8 carefully crafted dark color schemes for professional-looking cards
- **📊 Comprehensive Statistics**: Stars, forks, watchers, contributors, and more
- **💻 Language Breakdown**: Visual representation of programming languages used
- **👥 Contributor Insights**: Top contributors with their contribution counts
- **⬇️ High-Quality Downloads**: Export as PNG or PDF with perfect quality
- **🎯 No White Lines/Borders**: Clean, crisp downloads without artifacts
- **📱 Responsive Design**: Works perfectly on all device sizes
- **⚡ Fast & Lightweight**: Built with modern React and TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/itz-nirmal/RepoCard.git

# Navigate to project directory
cd RepoCard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## 🎯 Usage

1. **Enter GitHub URL**: Paste any GitHub repository URL
2. **Generate Card**: Click "Generate Card" to fetch repository data
3. **Download**: Choose PNG or PDF format for your report card
4. **Create Another**: Generate cards for multiple repositories

### Supported URL Formats

```text
https://github.com/username/repository
https://github.com/username/repository.git
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Download Engine**: dom-to-image-more, jsPDF
- **Icons**: Lucide React
- **API**: GitHub REST API

## 📁 Project Structure

```text
RepoCard/
├── src/
│   ├── components/           # React components
│   │   ├── AnimatedBackground.tsx
│   │   ├── Hero.tsx
│   │   ├── InputCard.tsx
│   │   └── RepoCard.tsx
│   ├── context/             # React context
│   │   └── ApiContext.tsx
│   ├── utils/               # Utility functions
│   │   ├── cardDownloader.ts
│   │   ├── colorGenerator.ts
│   │   └── languageLogos.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/                  # Static assets
│   ├── Favicone.png
│   └── Footer-Logo.jpg
└── config files
```

## 🎨 Color Themes

RepoCard features 8 beautiful dark color schemes:

- **Coral Sunset** - Warm and energetic
- **Ocean Breeze** - Cool and professional
- **Purple Dream** - Creative and innovative
- **Forest Green** - Natural and growth-focused
- **Golden Hour** - Warm and optimistic
- **Rose Garden** - Elegant and sophisticated
- **Teal Wave** - Fresh and modern
- **Midnight Blue** - Professional and trustworthy

## 🔧 Configuration

### Environment Variables

No environment variables required - the app uses GitHub's public API.

### API Rate Limits

- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour (if you add GitHub token)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub API for repository data
- Lucide React for beautiful icons
- Tailwind CSS for styling system
- dom-to-image-more for high-quality image generation

## 📞 Support

If you encounter any issues or have questions:

- Open an [issue](https://github.com/itz-nirmal/RepoCard/issues)
- Contribute to the project
- Star ⭐ the repository if you find it useful

---

**Made with ❤️ by [itz-nirmal](https://github.com/itz-nirmal)**
