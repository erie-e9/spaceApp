import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import { dictionary as commonDictionary, adjacencyGraphs } from '@zxcvbn-ts/language-common';
import { dictionary as enDictionary, translations as enTranslations } from '@zxcvbn-ts/language-en';

export type StrengthLevelProps = 'weak' | 'medium' | 'good' | 'strong';
export interface PasswordStrengthProps {
  passwordStrength: StrengthLevelProps;
}

const configureZxcvbn = () => {
  zxcvbnOptions.setOptions({
    dictionary: {
      ...commonDictionary,
      ...enDictionary,
    },
    graphs: adjacencyGraphs,
    translations: enTranslations,
  });
};

export const usePasswordStrength = (): {
  getPasswordStrength: (password: string) => StrengthLevelProps;
} => {
  configureZxcvbn();

  const getPasswordStrength = (password: string): StrengthLevelProps => {
    const { score } = zxcvbn(password);
    switch (score) {
      case 0:
      case 1:
        return 'weak';
      case 2:
        return 'medium';
      case 3:
        return 'good';
      case 4:
        return 'strong';
      default:
        return 'weak';
    }
  };

  return {
    getPasswordStrength,
  };
};
