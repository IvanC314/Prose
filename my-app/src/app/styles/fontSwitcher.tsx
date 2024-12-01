// styles/fontSwitcher.js
import { Monsieur_La_Doulaise } from "next/font/google";
// Load the font
const monsieurFont = Monsieur_La_Doulaise({
  subsets: ['latin'],
  weight: '400', // Adjust the weight if needed
});

export const monsieurClass = monsieurFont.className;

