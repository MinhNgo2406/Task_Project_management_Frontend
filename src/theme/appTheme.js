export const getScreenTheme = (isDarkMode) => {
  if (isDarkMode) {
    return {
      background: "#0F172A",
      surface: "#1E293B",
      surface2: "#111827",
      text: "#F8FAFC",
      subText: "#CBD5E1",
      border: "#334155",

      blueCard: ["#1E293B", "#172554"],
      purpleCard: ["#1E293B", "#3B0764"],
      greenCard: ["#1E293B", "#14532D"],
      orangeCard: ["#1E293B", "#431407"],
      cyanCard: ["#1E293B", "#164E63"],
      whiteCard: ["#1E293B", "#0F172A"],
      headerCard: ["#1E293B", "#0F172A", "#111827"],

      shadow: "#000000",
      softWhite: "rgba(255,255,255,0.08)",
      cardBorder: "#334155",
    };
  }

  return {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surface2: "#F8FAFC",
    text: "#020617",
    subText: "#64748B",
    border: "#E2E8F0",

    blueCard: ["#F8FAFF", "#EAF2FF"],
    purpleCard: ["#FCF7FF", "#F3E8FF"],
    greenCard: ["#F0FDF4", "#DCFCE7"],
    orangeCard: ["#FFF7ED", "#FEF3C7"],
    cyanCard: ["#ECFEFF", "#DFFBFF"],
    whiteCard: ["#FFFFFF", "#F8FAFC"],
    headerCard: ["#EFF6FF", "#F5F3FF", "#F8FAFC"],

    shadow: "#64748B",
    softWhite: "rgba(255,255,255,0.76)",
    cardBorder: "rgba(255,255,255,0.9)",
  };
};
