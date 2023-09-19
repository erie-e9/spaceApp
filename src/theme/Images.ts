import { ThemeVariables } from 'types/theme';

export default function ({}: ThemeVariables) {
  return {
    logo: require('@assets/light/images/tom_light.webp'),
    space: require('@assets/light/images/AestheticSpace.webp'),
    sparkles: {
      topLeft: require('@assets/shared/images/sparkles-top-left.webp'),
      top: require('@assets/shared/images/sparkles-top.webp'),
      topRight: require('@assets/shared/images/sparkles-top-right.webp'),
      right: require('@assets/shared/images/sparkles-right.webp'),
      bottomRight: require('@assets/shared/images/sparkles-bottom-right.webp'),
      bottom: require('@assets/shared/images/sparkles-bottom.webp'),
      bottomLeft: require('@assets/shared/images/sparkles-bottom-left.webp'),
    },
    icons: {
      colors: require('@assets/shared/images/colorswatch.webp'),
      send: require('@assets/shared/images/send.webp'),
      translate: require('@assets/shared/images/translate.webp'),
    },
  };
}
