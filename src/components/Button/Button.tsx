import React, { ComponentProps } from 'react';
import { Pressable, Text, ViewStyle, PressableStateCallbackType, StyleProp, ActivityIndicator } from 'react-native';

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

const pressStyle = (disabled: Props['disabled'], loading?: Props['loading'], backgroundColor?: ViewStyle['backgroundColor']) => ({ pressed }: PressableStateCallback): StyleProp<ViewStyle> => ({
  width: '90%',
  height: 50,
  backgroundColor: loading || disabled ? '#DDD' : pressed ? '#EEE' : backgroundColor || '#DDD',
  margin: 5,
  alignItems: 'center',
  justifyContent: 'center',
});

const Button = ({ text, onPress, disabled , loading }: Props) => {
  const style = pressStyle(disabled, loading);

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
        <Text>
          {text}
        </Text>
      )}

    </Pressable>
  );
};

export default Button;
