import { Logger } from '@services';
import { Platform } from 'react-native';
import Share, { ShareOptions, Social } from 'react-native-share';

interface UseShareResult {
  shareMessage: (message: string) => Promise<void>;
  shareImage: (url: string) => Promise<void>;
  shareFile: (filePath: string, fileType: string) => Promise<void>;
  shareUrl: (url: string, title?: string) => Promise<void>;
  shareToSocial: (url: string, social: Social) => Promise<void>;
  shareCustomContent: (url: string, title: string, message: string, icon: string) => Promise<void>;
}

export const useShare = (): UseShareResult => {
  // Function to share a simple text
  const shareMessage = async (message: string) => {
    const options: ShareOptions = {
      message,
    };
    try {
      await Share.open(options);
    } catch (error) {
      Logger.error('useShare - shareMessage', { error });
    }
  };

  // Function to share an image by URL
  const shareImage = async (url: string) => {
    const options: ShareOptions = {
      url,
      type: 'image/jpeg',
      failOnCancel: false, // Useful for handling cancellations
    };
    try {
      await Share.open(options);
    } catch (error) {
      Logger.error('useShare - shareImage', { error });
    }
  };

  // Function to share a file from a local path
  const shareFile = async (filePath: string, fileType: string) => {
    const options: ShareOptions = {
      url: `file://${filePath}`,
      type: fileType,
    };
    try {
      await Share.open(options);
    } catch (error) {
      Logger.error('useShare - shareFile', { error });
    }
  };

  // Function to share a URL with optional title
  const shareUrl = async (url: string, title?: string) => {
    const options: ShareOptions = {
      url,
      title,
      failOnCancel: false, // Avoid error if user cancels
    };
    try {
      await Share.open(options);
    } catch (error) {
      Logger.error('useShare - shareUrl', { error });
    }
  };

  // Function to share content directly to a specific social app
  const shareToSocial = async (url: string, social: Social, whatsAppNumber?: string) => {
    const options = {
      // Share WhatsAp
      title: 'Share via',
      message: 'some message',
      url,
      social,
      whatsAppNumber, // country code + phone number
      filename: 'test', // only for base64 file in Android

      appId: '', // facebook/insgragram app id
      // Share Instagram Stories - Share.Social.INSTAGRAM_STORIES
      backgroundImage: 'http://urlto.png',
      stickerImage: 'data:image/png;base64,<imageInBase64>', //or you can use "data:" link
      backgroundBottomColor: '#fefefe',
      backgroundTopColor: '#906df4',
      attributionURL: 'http://deep-link-to-app', //in beta
    };
    try {
      await Share.shareSingle(options);
    } catch (error) {
      Logger.error(`useShare - shareToSocial sharing in ${social}`, { error });
    }
  };

  const shareCustomContent = async (url: string, title: string, message: string, icon: string) => {
    // Define options for iOS and Android
    const options: ShareOptions = Platform.select({
      ios: {
        activityItemSources: [
          {
            // For sharing url with custom title.
            placeholderItem: { type: 'url', content: url },
            item: {
              default: { type: 'url', content: url },
            },
            subject: {
              default: title,
            },
            linkMetadata: { originalUrl: url, url, title },
          },
          {
            // For sharing text.
            placeholderItem: { type: 'text', content: message },
            item: {
              default: { type: 'text', content: message },
              message: null, // Specify no text to share via Messages app.
            },
            linkMetadata: {
              // For showing app icon on share preview.
              title: message,
            },
          },
          {
            // Custom icon for share preview
            placeholderItem: { type: 'url', content: icon },
            item: {
              default: { type: 'text', content: `${message} ${url}` },
            },
            linkMetadata: {
              title: message,
              icon: icon,
            },
          },
        ],
      },
      default: {
        title,
        subject: title,
        message: `${message} ${url}`,
      },
    });

    try {
      await Share.open(options!);
    } catch (error) {
      Logger.error('useShare - shareCustomContent', { error });
    }
  };

  return {
    shareMessage,
    shareImage,
    shareFile,
    shareUrl,
    shareToSocial,
    shareCustomContent,
  };
};
