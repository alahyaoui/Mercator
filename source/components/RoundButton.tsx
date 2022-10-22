/* eslint-disable react/jsx-no-literals */
import React, { useState } from "react";
import { StyleSheet, TouchableHighlight, Platform, View, Image } from "react-native";
import Androw from "react-native-androw";

import shine from "./assets/Shine.png";

export type RoundButtonProps = {
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  underlayColor?: string;
  children?: React.ReactNode;
};

RoundButton.defaultProps = {
  onPress: () => {},
  onLongPress: () => {},
  disabled: false,
  underlayColor: "#ffffff",
  children: {},
};

export function RoundButton(props: RoundButtonProps) {
  const { onPress, onLongPress, disabled, underlayColor, children } = props;
  const [pressed, setPressed] = useState(false);

  const styles = generateStyle(pressed, disabled);

  return (
    <Androw style={styles.container}>
      <TouchableHighlight
        onPress={onPress}
        delayLongPress={Platform.OS === "android" ? 500 : Number.MAX_VALUE}
        onLongPress={() => onLongPress && onLongPress()}
        style={styles.innerContainer}
        disabled={disabled}
        underlayColor={underlayColor}
        onShowUnderlay={() => setPressed(true)}
        onHideUnderlay={() => setPressed(false)}
      >
        {children}
      </TouchableHighlight>
      <View pointerEvents="none" style={styles.shine}>
        <Image source={shine} style={styles.shineImage} />
      </View>
    </Androw>
  );
}

const generateStyle = (pressed: boolean, disabled: boolean) => {
  const size = 64;
  const halfSize = size / 2;

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      height: size,
      width: size,
      elevation: pressed ? 0 : 5, // Android
      shadowColor: "#000000",
      shadowOffset: pressed ? { width: 0, height: 0 } : { width: 0, height: 1 },
      shadowOpacity: pressed ? 0 : 2, // iOS
      shadowRadius: pressed ? 0 : 1,
      margin: 2, // Androw shadow fix
    },
    innerContainer: {
      backgroundColor: disabled ? "#c2c6ca" : "#f3f4f6",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: halfSize,
      overflow: "hidden",
    },
    shine: {
      position: "absolute",
      top: 0,
      left: 0,
      width: size,
      height: halfSize,
    },
    shineImage: {
      width: size,
      height: halfSize,
      tintColor: "#ffffff",
      opacity: 1,
    },
  });

  return styles;
};
