import { useCallback } from 'react';
import ReactNativeBiometrics from '@marianj97/react-native-biometrics';
import { Logger, useCopy } from '@services';

const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

export type BiometryType = 'TouchID' | 'FaceID' | 'Biometrics';

export interface IsSensorAvailableResult {
  available: boolean;
  biometryType?: BiometryType;
  error?: string;
}

export interface BiometricsProps {
  promptMessage: string;
  callback: () => void;
  fallback?: () => void;
}

export interface CreateSignatureResult {
  success: boolean;
  signature?: string;
  error?: string;
}

export interface AuthBiometricsProps {
  promptMessage: string;
  payload: string;
}

export const useBiometrics = (): {
  registerPublicKey: () => Promise<string>;
  getSignature: ({ promptMessage, payload }: AuthBiometricsProps) => Promise<CreateSignatureResult>;
  authtBiometics: ({ promptMessage, payload }: AuthBiometricsProps) => Promise<string>;
  simpleBiometric: ({ promptMessage, callback, fallback }: BiometricsProps) => Promise<void>;
  checkBiometrics: () => Promise<IsSensorAvailableResult>;
  deleteBiometricKeys: () => Promise<boolean>;
} => {
  const { getCopyValue } = useCopy();

  const registerPublicKey = async (): Promise<string> => {
    try {
      await rnBiometrics.deleteKeys();
      const { keysExist } = await rnBiometrics.biometricKeysExist();
      if (keysExist) {
        Logger.log('registerPublicKey - Keys exist');
      } else {
        Logger.log('registerPublicKey - Creating Keys');
        const { publicKey } = await rnBiometrics.createKeys({
          accessGroup: 'KeyGroup',
        });
        Logger.log('registerPublicKey: ', { publicKey });
        return publicKey; // send it to server
      }
    } catch (err) {
      Logger.log('registerPublicKey: ', err);
      throw err;
    }
    return '';
  };

  const getSignature = async ({
    promptMessage,
    payload,
  }: AuthBiometricsProps): Promise<CreateSignatureResult> => {
    try {
      const { success, signature } = await rnBiometrics.createSignature({
        promptMessage,
        payload,
      });

      if (!success) {
        throw new Error('Error on authenticate with biometics');
      }
      Logger.log('signature', signature);
      return { success, signature };
    } catch (err) {
      Logger.log('getSignature: ', err);
      throw err;
    }
  };

  const checkBiometrics = useCallback(async (): Promise<IsSensorAvailableResult> => {
    try {
      const sensorDevice = await rnBiometrics.isSensorAvailable();
      return sensorDevice;
    } catch (error) {
      Logger.log('checkBiometrics', { error });
      throw error;
    }
  }, []);

  const simpleBiometric = useCallback(
    async ({ promptMessage, callback, fallback }: BiometricsProps): Promise<void> => {
      try {
        const { success } = await rnBiometrics.simplePrompt({
          promptMessage: getCopyValue(promptMessage),
        });
        if (success) {
          await callback();
        } else {
          fallback && (await fallback());
        }
      } catch (error) {
        Logger.log('simpleBiometric', { error });
        fallback && (await fallback());
        throw error;
      }
    },
    [],
  );

  const deleteBiometricKeys = useCallback(async (): Promise<boolean> => {
    try {
      const { keysDeleted } = await rnBiometrics.deleteKeys();
      if (!keysDeleted) {
        throw new Error('Cannot delete biometric keys');
      }
      Logger.log('keysDeleted successfully');
      return keysDeleted; // boolean if true remove from server
    } catch (error) {
      Logger.log('useBiometrics deleteBiometricKeys', { error });
      throw error;
    }
  }, []);

  const authtBiometics = async ({
    promptMessage,
    payload,
  }: AuthBiometricsProps): Promise<string> => {
    // await deleteBiometricKeys();
    try {
      const { available, error } = await checkBiometrics();
      if (!available) {
        throw new Error(error);
      }

      const { keysExist } = await rnBiometrics.biometricKeysExist();

      if (!keysExist) {
        // throw new Error('Athentication with biometric not allowed');
        const publicKey = await registerPublicKey();
        console.log('authtBiometics', { publicKey });
      }

      const { success, signature } = await getSignature({ promptMessage, payload });

      if (!success) {
        throw new Error('Biometric authentication failed');
      }

      return signature as string;
    } catch (err) {
      Logger.log('authtBiometics: ', err);
      throw err;
    }
  };

  return {
    registerPublicKey,
    getSignature,
    authtBiometics,
    simpleBiometric,
    checkBiometrics,
    deleteBiometricKeys,
  };
};
