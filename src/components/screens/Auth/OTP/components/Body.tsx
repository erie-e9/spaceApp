import { memo, useEffect } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputKeyPressEventData,
} from 'react-native';

type OTPProps = {
  isFormEditable: boolean;
  numberOfInputs?: number;
  onChangeText?: (text: string) => void;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
  onFocus?: (inputIndex: number) => void;
  onSubmit: (value: string) => void;
};

export const OTPBody = ({ isFormEditable, numberOfInputs = 6, onSubmit }: OTPProps) => {
  const theme = useTheme();
  const [code, setCode] = useState<string>('');
  const ref = useRef<TextInput>(null);
  const [error, setError] = useState(undefined);
  const inputsValues = useMemo(() => times((index) => index, numberOfInputs), [numberOfInputs]);

  const { t } = useTranslation();

  const $onSubmit = useCallback(() => {
    Keyboard.dismiss();
    if (code.length < numberOfInputs) {
      // Set local error
      return;
    }

    // Call submit function only when has exact
    // numberOfInputs inputs
    onSubmit(code);
  }, [code, numberOfInputs, onSubmit]);

  // Setup auto submit
  useEffect(() => {
    if (code.length === numberOfInputs) {
      $onSubmit();
    }
  }, [$onSubmit, numberOfInputs, code]);

  return;
  <Box paddingVertical="xxl">
    {!isReaderActive && (
      <Box justifyContent="space-evenly" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
        {inputsValues.map((key, index) => {
          const borderColor = index !== code.length ? theme.colors.grey02 : theme.colors.blue01;

          return (
            <Pressable
              key={key}
              accessibilityRole="button"
              accessibilityHint={t('OPEN_KEYBOARD', { ns: 'accessibility' })}
              accessibilityLabel={t('LIST_ITEM', {
                ns: 'accessibility',
                index: index + 1,
                size: numberOfInputs,
              })}
              onPress={() => {
                ref.current?.focus();
              }}
              disabled={!isFormEditable}
              style={{
                borderRadius: 5,
                borderWidth: 1.5,
                paddingTop: 10,
                width: 38,
                height: 48,
                borderColor: borderColor,
              }}
            >
              <Text
                textAlign="center"
                textAlignVertical="center"
                color="black"
                fontSize={22}
                fontWeight="bold"
              >
                {code[index]}
              </Text>
            </Pressable>
          );
        })}
      </Box>
    )}
    <TextInput
      accessibilityLabel={t('OTP_TEXT_INPUT', { ns: 'accessibility' })}
      style={[
        {
          textAlign: 'center',
          textAlignVertical: 'center',
          color: 'black',
          fontSize: 22,
          fontWeight: 'bold',
        },
        {
          position: 'absolute',
          opacity: 0,
          top: 0,
          left: 0,
        },
      ]}
      returnKeyType="done"
      textContentType="oneTimeCode"
      onChangeText={setCode}
      onFocus={() => {
        // Clear error
      }}
      value={code}
      keyboardType="numeric"
      ref={ref}
      onSubmitEditing={$onSubmit}
      maxLength={numberOfInputs}
    />
    {!isUndefined(error) && (
      <Box accessible ref={errorRef} flexDirection="row" paddingVertical="m" paddingStart="m">
        {getIconByName('I_RED', 20)}
        <Text style={{ paddingTop: Platform.OS === 'ios' ? 3 : 0 }} color="error">
          {t(`GENERAL.OTP.${error}`, { ns: 'translation' })}
        </Text>
      </Box>
    )}
  </Box>;
};
export default memo(OTPBody);
