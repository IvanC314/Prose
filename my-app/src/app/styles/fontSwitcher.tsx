import { Monsieur_La_Doulaise } from "next/font/google";

const monsieurFont = Monsieur_La_Doulaise({
  subsets: ['latin'],
  weight: '400', 
});

export const monsieurClass = monsieurFont.className;

