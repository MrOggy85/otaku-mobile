import React, { ComponentProps } from 'react';
import { Pressable, Text, ViewStyle, PressableStateCallbackType, StyleProp, ActivityIndicator, StyleSheet } from 'react-native';
import { accent } from '../../core/colors';

type PressProps = ComponentProps<typeof Pressable>

type Props = {
  text: string;
  onPress: PressProps['onPress'];
  disabled?: PressProps['disabled'];
  loading?: boolean;
}

type PressableStateCallback = {
  pressed: PressableStateCallbackType['pressed'];
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const pressStyle = (disabled: Props['disabled'], loading?: Props['loading'], backgroundColor?: ViewStyle['backgroundColor']) => ({ pressed }: PressableStateCallback): StyleProp<ViewStyle> => ({
  width: '100%',
  height: 50,
  backgroundColor: loading || disabled ? '#DDD' : pressed ? '#EEE' : backgroundColor || accent.INFO,
  alignItems: 'center',
  justifyContent: 'center',
});

const Button = ({ text, onPress, disabled , loading }: Props) => {
  const style = pressStyle(disabled, loading);

  const textColor = disabled ? '#999' : accent.WHITE;

  return (
    <Pressable
      style={style}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color="#888"
          size={24}
        />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>
          {text}
        </Text>
      )}

    </Pressable>
  );
};

export default Button;
