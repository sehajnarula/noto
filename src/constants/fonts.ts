import { isIOS } from "./utils";

console.log("✅ fontFamilies.ts loading. isIOS():", isIOS());

export const fontFamilies = {
  INTER: {
    regular: isIOS() ? 'Inter18ptRegular' : 'Inter18ptRegular',
    medium: isIOS() ? 'Inter18ptSemiBold' : 'Inter18ptSemiBold',
    bold: isIOS() ? 'Inter18ptBold' : 'Inter18ptBold',
    black: isIOS() ? 'Inter18ptBlack' : 'Inter18ptBlack',
    light: isIOS() ? 'Inter18ptLight' : 'Inter18ptLight',
    italic: isIOS() ? 'Inter18ptItalic' : 'Inter18ptItalic',
  },
};
