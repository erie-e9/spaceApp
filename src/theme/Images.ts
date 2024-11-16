import { type ThemeVariables } from '@types';

export default function ({ }: ThemeVariables) {
  return {
    logo: require('@assets/shared/images/AestheticSpace.webp'),
    sparkles: {
      topLeft: require('@assets/shared/images/space1.webp'),
      top: require('@assets/shared/images/sparkles-top.webp'),
      topRight: require('@assets/shared/images/sparkles-top-right.webp'),
      right: require('@assets/shared/images/sparkles-right.webp'),
      bottomRight: require('@assets/shared/images/space2.webp'),
      bottom: require('@assets/shared/images/sparkles-bottom.webp'),
      bottomLeft: require('@assets/shared/images/solarsystem.webp'),
      bottomLeft2: require('@assets/shared/images/sparkles-bottom-left.webp'),
    },
    wallpapers: {
      background1: require('@assets/shared/images/background.jpg'),
      background2: require('@assets/shared/images/background2.jpg'),
      background3: require('@assets/shared/images/background3.webp'),
      backgroundstar1: require('@assets/shared/images/background-star1.webp'),
      backgroundstar2: require('@assets/shared/images/background-star2.webp'),
      backgroundstar3: require('@assets/shared/images/background-star3.webp'),
      backgroundstar4: require('@assets/shared/images/background-star4.webp'),
      backgroundstar5: require('@assets/shared/images/background-star5.webp'),
      doodle: require('@assets/shared/images/doodle.webp'),
    },
    icons: {
      // colors: require('@assets/shared/images/colorswatch.webp'),
      // send: require('@assets/shared/images/send.webp'),
      // translate: require('@assets/shared/images/translate.webp'),
    },
  };
}
