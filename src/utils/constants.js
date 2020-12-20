export const URL = 'http://myapiuri.com/api/controller'
// export const fakeavatar = 'https://randomuser.me/api/portraits/women/10.jpg';
export const fakeavatar =	'https://elcomercio.pe/resizer/oJXTPUyJwv30CxKHvSSWyGuvfwc=/980x528/smart/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/7MZZLBWAZVBP5DM5DU6UCY4G3I.png'
export const SLUG = 'iceCreamUnicorn'

export const variables = {
  COMPANYNAME: 'iceCream Unicorn',
  COMPANYSLOGAN: '❝ Change the World, One Scoop at a time...❞',
  COMPANYURL: `https://www.${SLUG}.com`,
  COMPANYFACEBOOK: `https://www.facebook.com/${SLUG}`,
  COMPANYTWITTER: `https://www.twitter.com/${SLUG}`,
  COMPANYINSTAGRAM: `https://www.instagram.com/${SLUG}`,
  COMPANYPHONE1: '5620222699',
  COMPANYPHONE2: '6181092045',
  COMPANYWHATSAPP: '526181092045',
  COMPANYMAIL: `help@${SLUG}.com`,
  AVATAR_USER_DEFAULT:
		'https://www.researchgate.net/profile/Maria_Monreal2/publication/315108532/figure/fig1/AS:472492935520261@1489662502634/Figura-2-Avatar-que-aparece-por-defecto-en-Facebook.png',
}

export const base = {
  FONT_SIZE_TINY: 8,
  FONT_SIZE_SEMISMALL: 10,
  FONT_SIZE_SMALL: 12,
  FONT_SIZE_SEMIMEDIUM: 13,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_SEMILARGE: 16,
  FONT_SIZE_LARGE: 18,
  FONT_SIZE_EXTRA_LARGE: 24,
  FONT_SIZE_SEMIMASSIVE: 28,
  FONT_SIZE_MASSIVE: 34,

  FONT_WEIGHT_LIGHT: '200',
  FONT_WEIGHT_SEMIMEDIUM: '400',
  FONT_WEIGHT_MEDIUM: '500',
  FONT_WEIGHT_BOLD: '700',

  PRIMARY_FONT_FAMILY: 'AvertaDemo-Regular',
  PRIMARY_FONT_FAMILY_BOLD: 'AvertaDemo-ExtraBoldItalic',

  SECONDARY_FONT_FAMILY: 'Product-Sans-Regular',
  SECONDARY_FONT_FAMILY_ITALIC: 'Product-Sans-Italic',

  SHADOW: 'rgba(153, 153, 153, 0.3)',
  TRANSPARENT: 'rgba(0, 0, 0, 0)',
  WHITE: 'rgba(255, 255, 255, 1)',
  WHITE10: 'rgba(255, 255, 255, 0.10)',
  WHITE25: 'rgba(255, 255, 255, 0.25)',
  WHITE50: 'rgba(255, 255, 255, 0.50)',
  WHITE75: 'rgba(255, 255, 255, 0.75)',
  WHITE85: 'rgba(255, 255, 255, 0.85)',
  WHITE90: 'rgba(255, 255, 255, 0.90)',
  BLACK20: 'rgba(0, 0, 0, 0.2)',
  BLACK30: 'rgba(0, 0, 0, 0.3)',
  BLACK50: 'rgba(0, 0, 0, 0.5)',
  BLACK: 'rgba(0, 0, 0, 1)',
  GRAYSEMILIGHT: 'rgba(217, 217, 217, 1)',
  GRAYLIGHT: 'rgba(242, 243, 245, 1)',
  GRAYFBINPUTTEXT: 'rgba(141, 148, 158, 1)',
  YELLOW: 'rgba(246, 173, 0, 1)',
  RED: 'rgba(255, 59, 48, 1)',
  GREEN: '#4CD964',

  noImage:
		'https://www.brandenforcement.co.uk/wp-content/themes/brand-enforce/img/default-placeholder.png',
}

export const darkTheme = {
  PRIMARY_COLOR: '#F54F8E',
  PRIMARY_COLOR_LIGHT: '#FFF6F9',
  // PRIMARY_COLOR: '#7B3F00',
  PRIMARY_BACKGROUND_COLOR: '#595959',
  PRIMARY_BACKGROUND_COLOR_LIGHT: '#797979',

  SECONDARY_COLOR: '#911830',
  SECONDARY_BACKGROUND_COLOR: '#363636',
  SECONDARY_BACKGROUND_COLOR_LIGHT: '#F7F7F7',

  THIRD_BACKGROUND_COLOR: '#333232',
  THIRD_BACKGROUND_COLOR_LIGHT: '#333333',

  FOURTH_BACKGROUND_COLOR: '#EFEFF4',
  FOURTH_BACKGROUND_COLOR_LIGHT: '#18191a', // background navigation

  REDGRAY: 'rgba(237, 41, 57, 1)',
  REDBADGE: 'rgba(230, 0, 0, 1)',
  SUCCESS_COLOR: 'rgba(0, 255, 0, 1)',
  ACTIVE: '#25D366',
  FAIL_COLOR: 'rgba(255, 0, 0, 1)',
  LINK: '#2196F3',
  GRAYFACEBOOK: '#777777',
  STAR: '#FFBF00',

  BACKGROUND_COLOR: '#18191a',

  PRIMARY_TEXT_COLOR: '#FFFFFF',
  PRIMARY_TEXT_COLOR_LIGHT: '#b0b3b8',
  SECONDARY_TEXT_COLOR: '#3D3D3D',
  SECONDARY_TEXT_COLOR_LIGHT: 'rgba(90, 90, 90, 1)',
  THIRD_TEXT_COLOR: '#FFFFFF',
  THIRD_TEXT_COLOR_LIGHT: 'rgba(169, 169, 169, 1)',

  PRIMARY_TEXT_BACKGROUND_COLOR: '#242526',
  PRIMARY_TEXT_BACKGROUND_COLOR_LIGHT: '#2b2d2e',
  SECONDARY_TEXT_BACKGROUND_COLOR: '#e4e6eb',
  SECONDARY_TEXT_BACKGROUND_COLOR_LIGHT: 'rgba(255, 255, 255, 0.5)',
  MAPSTYLE: [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9E9E9E',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#BDBDBD',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#181818',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1B1B1B',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#2C2C2C',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8A8A8A',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#373737',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#3C3C3C',
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#4E4E4E',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#3D3D3D',
        },
      ],
    },
  ],
}

export const lightTheme = {
  PRIMARY_COLOR: '#F54F8E',
  PRIMARY_COLOR_LIGHT: '#FFF6F9',
  PRIMARY_BACKGROUND_COLOR: '#E6E6E6',
  PRIMARY_BACKGROUND_COLOR_LIGHT: '#F7F7F7',

  SECONDARY_COLOR: '#D32345',
  SECONDARY_BACKGROUND_COLOR: '#3D3D3D', // shadow
  SECONDARY_BACKGROUND_COLOR_LIGHT: '#797979',

  THIRD_BACKGROUND_COLOR: '#D1D1D1',
  THIRD_BACKGROUND_COLOR_LIGHT: '#F7F7F7',

  FOURTH_BACKGROUND_COLOR: '#EFEFF4',
  FOURTH_BACKGROUND_COLOR_LIGHT: '#F1F1F1', // background navigation

  REDGRAY: 'rgba(141, 148, 158, 1)',
  REDBADGE: 'rgba(230, 0, 0, 1)',
  SUCCESS_COLOR: 'rgba(0, 205, 0, 1)',
  ACTIVE: '#25D366',
  FAIL_COLOR: 'rgba(255, 0, 0, 1)',
  LINK: '#2196F3',
  GRAYFACEBOOK: '#E4E6EB',
  STAR: '#FFBF00',

  BACKGROUND_COLOR: '#F1F1F1',

  PRIMARY_TEXT_COLOR: '#000000',
  PRIMARY_TEXT_COLOR_LIGHT: '#595959',
  SECONDARY_TEXT_COLOR: '#FFFFFF',
  SECONDARY_TEXT_COLOR_LIGHT: '#bdbdbd',
  THIRD_TEXT_COLOR: '#FFFFFF',
  THIRD_TEXT_COLOR_LIGHT: 'rgba(169, 169, 169, 1)',

  PRIMARY_TEXT_BACKGROUND_COLOR: '#FFFFFF',
  PRIMARY_TEXT_BACKGROUND_COLOR_LIGHT: '#f0f0f0',
  SECONDARY_TEXT_BACKGROUND_COLOR: '#313131',
  SECONDARY_TEXT_BACKGROUND_COLOR_LIGHT: 'rgba(0, 0, 0, 0.5)',
  MAPSTYLE: [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#F5F5F5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#F5F5F5',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#BDBDBD',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#EEEEEE',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#E5E5E5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9E9E9E',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#FFFFFF',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#DADADA',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9E9E9E',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#E5E5E5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#EEEEEE',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#C9C9C9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9E9E9E',
        },
      ],
    },
  ],
}

export const colorOptions = {
  orange: {
    PRIMARY_COLOR_FAINT: '#FFF3E0',
    PRIMARY_COLOR_LIGHT: '#FFB74D',
    PRIMARY_COLOR: '#FF9800',
    PRIMARY_COLOR_BOLD: '#EF6C00',
    PRIMARY_FOREGROUND_COLOR: '#FFFFFF',
  },
  red: {
    PRIMARY_COLOR_FAINT: '#FFEBEE',
    PRIMARY_COLOR_LIGHT: '#E57373',
    PRIMARY_COLOR: '#F44336',
    PRIMARY_COLOR_BOLD: '#C62828',
    PRIMARY_FOREGROUND_COLOR: '#FFFFFF',
  },
  blue: {
    PRIMARY_COLOR_FAINT: '#E3F2FD',
    PRIMARY_COLOR_LIGHT: '#64B5F6',
    PRIMARY_COLOR: '#2196F3',
    PRIMARY_COLOR_BOLD: '#1565C0',
    PRIMARY_FOREGROUND_COLOR: '#FFFFFF',
  },
  cyan: {
    PRIMARY_COLOR_FAINT: '#E0F7FA',
    PRIMARY_COLOR_LIGHT: '#4DD0E1',
    PRIMARY_COLOR: '#00BCD4',
    PRIMARY_COLOR_BOLD: '#00838F',
    PRIMARY_FOREGROUND_COLOR: '#FFFFFF',
  },
  teal: {
    PRIMARY_COLOR_FAINT: '#E0F2F1',
    PRIMARY_COLOR_LIGHT: '#4DB6AC',
    PRIMARY_COLOR: '#009688',
    PRIMARY_COLOR_BOLD: '#00695C',
    PRIMARY_FOREGROUND_COLOR: '#FFFFFF',
  },
  gray: {
    PRIMARY_COLOR_FAINT: '#FAFAFA',
    PRIMARY_COLOR_LIGHT: '#E0E0E0',
    PRIMARY_COLOR: '#9E9E9E',
    PRIMARY_COLOR_BOLD: '#424242',
    PRIMARY_FOREGROUND_COLOR: '#FFFFFF',
  },
  purlple: {
    PRIMARY_COLOR_FAINT: '#EDE7F6',
    PRIMARY_COLOR_LIGHT: '#9575CD',
    PRIMARY_COLOR: '#673AB7',
    PRIMARY_COLOR_BOLD: '#4527A0',
    PRIMARY_FOREGROUND_COLOR: '#FFFFFF',
  },
  green: {
    PRIMARY_COLOR_FAINT: '#E8F5E9',
    PRIMARY_COLOR_LIGHT: '#81C784',
    PRIMARY_COLOR: '#4CAF50',
    PRIMARY_COLOR_BOLD: '#2E7D32',
    PRIMARY_FOREGROUND_COLOR: '#FFFFFF',
  },
  pink: {
    PRIMARY_COLOR_FAINT: '#F5E8F2',
    PRIMARY_COLOR_LIGHT: '#C781C2',
    PRIMARY_COLOR: '#FF2B4F',
    PRIMARY_COLOR_BOLD: '#7D2E5D',
    PRIMARY_FOREGROUND_COLOR: '#FFFFFF',
  },
  white: {
    PRIMARY_COLOR_FAINT: '#FFFFFF',
    PRIMARY_COLOR_LIGHT: 'rgba(255, 255, 255, 0.7)',
    PRIMARY_COLOR: '#FF2B4F',
    PRIMARY_COLOR_BOLD: '#7D2E5D',
    PRIMARY_FOREGROUND_COLOR: '#FFFFFF',
  },
}

export const navLightMode = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '#F1F1F1',
    // background: '#FFFFFF',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
  },
}

export const navDarkMode = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '#18191a',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(242, 242, 242)',
    border: 'rgb(199, 199, 204)',
  },
}
