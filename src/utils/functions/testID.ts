/**
 * Add a unique test id for iOS and Android
 *
 * NOTE: All touchable elements are accessible, meaning that it groups its children into a single selectable component,
 * sometimes this is not needed for testing and prevents getting proper data from elements. By providing
 * `disableAccessible = true` the elements should be visible / provide all needed data
 */

import { Platform } from 'react-native';

export function testProperties(
  id: string,
  disableAccessible = false,
): { accessible?: boolean; accessibilityLabel?: string; testID?: string } {
  const disableAccessibility = disableAccessible ? { accessible: false } : {};

  if (Platform.OS === 'ios') {
    return { ...disableAccessibility, testID: id };
  }

  return { ...disableAccessibility, accessibilityLabel: id, testID: id };
}
