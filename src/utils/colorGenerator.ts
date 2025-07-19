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
  // Dark Charcoal - Deep professional
  {
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
  },
  // Dark Navy - Sophisticated
  {
    primary: "#3182CE",
    secondary: "#2C5282",
    accent: "#68D391",
    background: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
    text: "#FFFFFF",
    gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
    cardBg: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    statBg: "rgba(255, 255, 255, 0.1)",
    sectionBg: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
    authorBg: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
  },
  // Dark Purple - Mysterious
  {
    primary: "#805AD5",
    secondary: "#553C9A",
    accent: "#F687B3",
    background: "linear-gradient(135deg, #2D1B69 0%, #553C9A 100%)",
    text: "#FFFFFF",
    gradient: "linear-gradient(135deg, #1A1B23 0%, #2D1B69 100%)",
    cardBg: "linear-gradient(135deg, #1A1B23 0%, #2D1B69 100%)",
    statBg: "rgba(255, 255, 255, 0.1)",
    sectionBg: "linear-gradient(135deg, #2D1B69 0%, #553C9A 100%)",
    authorBg: "linear-gradient(135deg, #2D1B69 0%, #553C9A 100%)",
  },
  // Dark Emerald - Nature inspired
  {
    primary: "#10B981",
    secondary: "#047857",
    accent: "#FBBF24",
    background: "linear-gradient(135deg, #064E3B 0%, #047857 100%)",
    text: "#FFFFFF",
    gradient: "linear-gradient(135deg, #022C22 0%, #064E3B 100%)",
    cardBg: "linear-gradient(135deg, #022C22 0%, #064E3B 100%)",
    statBg: "rgba(255, 255, 255, 0.1)",
    sectionBg: "linear-gradient(135deg, #064E3B 0%, #047857 100%)",
    authorBg: "linear-gradient(135deg, #064E3B 0%, #047857 100%)",
  },
  // Dark Amber - Warm glow
  {
    primary: "#F59E0B",
    secondary: "#D97706",
    accent: "#EF4444",
    background: "linear-gradient(135deg, #92400E 0%, #B45309 100%)",
    text: "#FFFFFF",
    gradient: "linear-gradient(135deg, #451A03 0%, #92400E 100%)",
    cardBg: "linear-gradient(135deg, #451A03 0%, #92400E 100%)",
    statBg: "rgba(255, 255, 255, 0.1)",
    sectionBg: "linear-gradient(135deg, #92400E 0%, #B45309 100%)",
    authorBg: "linear-gradient(135deg, #92400E 0%, #B45309 100%)",
  },
  // Dark Rose - Elegant
  {
    primary: "#EC4899",
    secondary: "#BE185D",
    accent: "#8B5CF6",
    background: "linear-gradient(135deg, #831843 0%, #BE185D 100%)",
    text: "#FFFFFF",
    gradient: "linear-gradient(135deg, #4C1D24 0%, #831843 100%)",
    cardBg: "linear-gradient(135deg, #4C1D24 0%, #831843 100%)",
    statBg: "rgba(255, 255, 255, 0.1)",
    sectionBg: "linear-gradient(135deg, #831843 0%, #BE185D 100%)",
    authorBg: "linear-gradient(135deg, #831843 0%, #BE185D 100%)",
  },
  // Dark Teal - Modern
  {
    primary: "#14B8A6",
    secondary: "#0F766E",
    accent: "#F472B6",
    background: "linear-gradient(135deg, #134E4A 0%, #0F766E 100%)",
    text: "#FFFFFF",
    gradient: "linear-gradient(135deg, #042F2E 0%, #134E4A 100%)",
    cardBg: "linear-gradient(135deg, #042F2E 0%, #134E4A 100%)",
    statBg: "rgba(255, 255, 255, 0.1)",
    sectionBg: "linear-gradient(135deg, #134E4A 0%, #0F766E 100%)",
    authorBg: "linear-gradient(135deg, #134E4A 0%, #0F766E 100%)",
  },
  // Dark Steel - Industrial
  {
    primary: "#64748B",
    secondary: "#475569",
    accent: "#F97316",
    background: "linear-gradient(135deg, #334155 0%, #475569 100%)",
    text: "#FFFFFF",
    gradient: "linear-gradient(135deg, #0F172A 0%, #334155 100%)",
    cardBg: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    statBg: "rgba(255, 255, 255, 0.1)",
    sectionBg: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
    authorBg: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
  },
];

export const generateColorPalette = (): ColorPalette => {
  const randomIndex = Math.floor(Math.random() * colorPalettes.length);
  return colorPalettes[randomIndex];
};
