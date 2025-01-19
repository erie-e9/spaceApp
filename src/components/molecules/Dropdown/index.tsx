import React, { memo, useEffect, useState, useCallback, useRef, forwardRef } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useSharedValue } from 'react-native-reanimated';
import truncate from 'lodash/truncate';
import type { DropDownProps } from '@types';
import { testProperties } from '@utils/functions';
import { useModal } from '@hooks';
import useAutoFocus from '../TextInput/hooks/useAutoFocus';
import { FieldInputMask } from '@components/molecules';
import {
  StyledButton,
  StyledElementContainer,
  Item,
  StyledText,
  ItemText,
  DropdownsContainer,
  ItemsContainer,
  ListItemContainer,
  StyledTextInput,
} from './styles';

export const Dropdown: React.FC<DropDownProps> = forwardRef(
  (
    {
      testID,
      label,
      description,
      value,
      required,
      placeholder = 'Select an item',
      error,
      touched,
      editable = true,
      maintainFocus,
      type = 'button',
      data,
      isNumeric = false,
      onSelect,
      width = 380,
      dropdownHeight,
      openDropdown,
      setOpenDropdown,
      disableInput,
      bottomSheet,
      maxValueLength,
    },
    ref,
  ) => {
    const theme = useTheme();
    const { focused } = useAutoFocus(
      () => null,
      () => null,
    );
    const { showModal } = useModal();
    const dropdownHeightValue = useSharedValue(0);
    const listRef = useRef<FlatList>(null);

    const [selectedLabel, setSelectedLabel] = useState<string>(
      data.find((option: { value: any }) => option.value === value)?.label,
    );

    useEffect(() => {
      // Scroll animation to selected item.
      if (openDropdown && listRef.current) {
        const index = data.indexOf(selectedLabel);
        if (index >= 0) {
          listRef.current.scrollToOffset({
            offset: index * 35,
            animated: true,
          });
        }
      }
    }, [openDropdown, data]);

    const handleSelect = useCallback(
      (item: { value: any; label: any }) => {
        onSelect(item.value);
        setSelectedLabel(item?.label);
      },
      [onSelect],
    );

    const toggleDropdown = useCallback(() => {
      if (bottomSheet) {
        showModal({
          type: 'bottomsheet',
          title: label,
          description,
          list: {
            data: data,
            onPressItem: (item: { value: any; label: any }) => handleSelect(item),
          },
          dropdownOptions: {
            height: dropdownHeight,
            justifyContent: 'center',
            alignItems: 'center',
            autoCloseOnSelect: true,
          },
        });
      }
      setOpenDropdown && setOpenDropdown(!openDropdown);
    }, [openDropdown, dropdownHeight, dropdownHeightValue, data]);

    const handleInputChange = useCallback((text: string) => {
      if (isNumeric && isNaN(Number(text))) return;
      onSelect(text);
      setSelectedLabel(text);
    }, []);

    const getItemLayout = (_: any, index: number) => ({
      length: 40,
      offset: 40 * index,
      index,
    });

    return (
      <DropdownsContainer {...testProperties(testID || 'DropdownID')}>
        <FieldInputMask
          {...testProperties(testID || 'FieldInputMaskDropdownID')}
          value={selectedLabel || ''}
          required={required}
          label={label}
          maintainFocus={maintainFocus || !!value}
          error={error}
          touched={touched}
          editable={editable}
          focused={focused || !!value}
          rightIcon={'arrow'}
          rightIconHandler={toggleDropdown}
          style={{ width }}
        >
          <>
            {type === 'textinput' ? (
              <StyledTextInput
                ref={ref}
                value={String(selectedLabel) || ''}
                onChangeText={handleInputChange}
                keyboardType={isNumeric ? 'numeric' : 'default'}
                style={{
                  width: Number(width) * 0.65,
                  paddingHorizontal: 13,
                  color: theme.tokens.colors.secondary950,
                  zIndex: 200,
                }}
                editable={!disableInput}
              />
            ) : (
              <StyledButton onPress={toggleDropdown} width="100%">
                <StyledElementContainer error={selectedLabel && !!error} hasValue={!!selectedLabel}>
                  <StyledText
                    type="Caption"
                    error={selectedLabel && !!error}
                    hasValue={!!selectedLabel}
                  >
                    {maxValueLength
                      ? truncate(selectedLabel, {
                          length: maxValueLength,
                        })
                      : selectedLabel || placeholder || ''}
                    {required && !selectedLabel ? '*' : ''}
                  </StyledText>
                </StyledElementContainer>
              </StyledButton>
            )}
          </>
        </FieldInputMask>

        {openDropdown && (
          <ItemsContainer height={dropdownHeight}>
            <FlatList
              ref={listRef}
              data={data}
              keyExtractor={({ item, index }) => index}
              renderItem={({ item, index }) => (
                <ListItemContainer width={width}>
                  <Item key={index} onPress={() => handleSelect(item)}>
                    <ItemText>{item.label || ''}</ItemText>
                  </Item>
                </ListItemContainer>
              )}
              getItemLayout={getItemLayout}
            />
          </ItemsContainer>
        )}
      </DropdownsContainer>
    );
  },
);

Dropdown.displayName = 'Dropdown';
export default memo(Dropdown);
