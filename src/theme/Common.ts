/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native';
import { type CommonParams } from '@types';

export default function <C>({}: CommonParams<C>) {
  return {
    ...StyleSheet.create({
      textInput: {
        height: 45,
        borderRadius: 10,
        paddingStart: 20,
      },
    }),
  };
}
