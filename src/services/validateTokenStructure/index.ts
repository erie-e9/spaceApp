import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Logger } from '@services';

export const validateTokenStructure = (
  token: string,
): {
  validToken: boolean;
  decodedToken?: JwtPayload;
} => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    return { validToken: false };
  }
  try {
    const decodedToken: JwtPayload = jwtDecode(token);

    // - expiration (`exp`)
    // - emmisor (`iss`)
    // - destinatary (`aud`)
    if (!decodedToken.exp || !decodedToken.iss || !decodedToken.aud) {
      return { validToken: false };
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTimestamp) {
      return { validToken: false };
    }

    return {
      // passed validations then is a valid token
      validToken: true,
      decodedToken: { ...decodedToken },
    };
  } catch (error) {
    Logger.error('Token decoding failed:', error);
    return { validToken: false };
  }
};
