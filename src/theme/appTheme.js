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
      tealCard: ["#1E293B", "#164E63"],
      greenCard: ["#1E293B", "#14532D"],
      orangeCard: ["#1E293B", "#431407"],
      cyanCard: ["#1E293B", "#164E63"],
      whiteCard: ["#1E293B", "#0F172A"],
      headerCard: ["#1E293B", "#0F172A", "#111827"],

      shadow: "#000000",
      cardBorder: "#334155",
      softWhite: "rgba(255,255,255,0.08)",
    };
  }

  return {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surface2: "#F8FAFC",
    text: "#020617",
    subText: "#64748B",
    border: "#E2E8F0",

    blueCard: ["#EFF6FF", "#DBEAFE"],
    tealCard: ["#F0FDFA", "#CCFBF1"],
    greenCard: ["#F0FDF4", "#DCFCE7"],
    orangeCard: ["#FFF7ED", "#FEF3C7"],
    cyanCard: ["#ECFEFF", "#DFFBFF"],
    whiteCard: ["#FFFFFF", "#F8FAFC"],
    headerCard: ["#EFF6FF", "#ECFEFF", "#F8FAFC"],

    shadow: "#64748B",
    cardBorder: "rgba(255,255,255,0.9)",
    softWhite: "rgba(255,255,255,0.76)",
  };
};
