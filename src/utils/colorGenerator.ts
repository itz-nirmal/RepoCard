export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  gradient: string;
  cardBg: string;
  statBg: string;
  sectionBg: string;
  authorBg: string;
}

const colorPalettes: ColorPalette[] = [
  // Coral Sunset - Warm and energetic
  {
    primary: '#FF6B6B',
    secondary: '#FF8E53',
    accent: '#4ECDC4',
    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    text: '#2C3E50',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    cardBg: 'linear-gradient(135deg, #FFF5F5 0%, #FFF0E6 100%)',
    statBg: 'rgba(255, 107, 107, 0.1)',
    sectionBg: 'linear-gradient(135deg, #FFE5E5 0%, #FFE5CC 100%)',
    authorBg: 'linear-gradient(135deg, #FFEBEB 0%, #FFEEDD 100%)'
  },
  // Ocean Breeze - Cool and professional
  {
    primary: '#3498DB',
    secondary: '#2980B9',
    accent: '#1ABC9C',
    background: 'linear-gradient(135deg, #3498DB 0%, #2980B9 100%)',
    text: '#2C3E50',
    gradient: 'linear-gradient(135deg, #3498DB 0%, #2980B9 100%)',
    cardBg: 'linear-gradient(135deg, #EBF8FF 0%, #E0F2FE 100%)',
    statBg: 'rgba(52, 152, 219, 0.1)',
    sectionBg: 'linear-gradient(135deg, #DBEAFE 0%, #CFFAFE 100%)',
    authorBg: 'linear-gradient(135deg, #E0F2FE 0%, #CCFBF1 100%)'
  },
  // Purple Dream - Creative and innovative
  {
    primary: '#9B59B6',
    secondary: '#8E44AD',
    accent: '#E74C3C',
    background: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
    text: '#2C3E50',
    gradient: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
    cardBg: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
    statBg: 'rgba(155, 89, 182, 0.1)',
    sectionBg: 'linear-gradient(135deg, #F3E8FF 0%, #EDE9FE 100%)',
    authorBg: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)'
  },
  // Forest Green - Natural and growth-focused
  {
    primary: '#27AE60',
    secondary: '#229954',
    accent: '#F39C12',
    background: 'linear-gradient(135deg, #27AE60 0%, #229954 100%)',
    text: '#2C3E50',
    gradient: 'linear-gradient(135deg, #27AE60 0%, #229954 100%)',
    cardBg: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
    statBg: 'rgba(39, 174, 96, 0.1)',
    sectionBg: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
    authorBg: 'linear-gradient(135deg, #BBF7D0 0%, #A7F3D0 100%)'
  },
  // Golden Hour - Warm and optimistic
  {
    primary: '#F39C12',
    secondary: '#E67E22',
    accent: '#E74C3C',
    background: 'linear-gradient(135deg, #F39C12 0%, #E67E22 100%)',
    text: '#2C3E50',
    gradient: 'linear-gradient(135deg, #F39C12 0%, #E67E22 100%)',
    cardBg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
    statBg: 'rgba(243, 156, 18, 0.1)',
    sectionBg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
    authorBg: 'linear-gradient(135deg, #FDE68A 0%, #FCD34D 100%)'
  },
  // Rose Garden - Elegant and sophisticated
  {
    primary: '#E91E63',
    secondary: '#C2185B',
    accent: '#9C27B0',
    background: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)',
    text: '#2C3E50',
    gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)',
    cardBg: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
    statBg: 'rgba(233, 30, 99, 0.1)',
    sectionBg: 'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)',
    authorBg: 'linear-gradient(135deg, #FBCFE8 0%, #F9A8D4 100%)'
  },
  // Teal Wave - Fresh and modern
  {
    primary: '#1ABC9C',
    secondary: '#16A085',
    accent: '#3498DB',
    background: 'linear-gradient(135deg, #1ABC9C 0%, #16A085 100%)',
    text: '#2C3E50',
    gradient: 'linear-gradient(135deg, #1ABC9C 0%, #16A085 100%)',
    cardBg: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)',
    statBg: 'rgba(26, 188, 156, 0.1)',
    sectionBg: 'linear-gradient(135deg, #CCFBF1 0%, #99F6E4 100%)',
    authorBg: 'linear-gradient(135deg, #99F6E4 0%, #5EEAD4 100%)'
  },
  // Midnight Blue - Professional and trustworthy
  {
    primary: '#2C3E50',
    secondary: '#34495E',
    accent: '#E74C3C',
    background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
    text: '#2C3E50',
    gradient: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
    cardBg: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
    statBg: 'rgba(44, 62, 80, 0.1)',
    sectionBg: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
    authorBg: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)'
  }
];

export const generateColorPalette = (): ColorPalette => {
  const randomIndex = Math.floor(Math.random() * colorPalettes.length);
  return colorPalettes[randomIndex];
};