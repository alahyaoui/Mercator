/* eslint-disable react/jsx-no-literals */
import React, { useState } from "react";
import { StyleSheet, TouchableHighlight, Platform, View, Image } from "react-native";
import Androw from "react-native-androw";

import shine from "./assets/Shine.png";

export type RoundButtonProps = {
  onPress?: () => void;
  onLongPress?: () => void;
  isDisabled?: boolean;
  underlayColor?: string;
  children?: React.ReactNode;
};

RoundButton.defaultProps = {
  onPress: () => {},
  onLongPress: () => {},
  isDisabled: false,
  underlayColor: "#ffffff",
  children: {},
};

export function RoundButton(props: RoundButtonProps) {
  const { onPress, onLongPress, isDisabled, underlayColor, children } = props;
  const [isPressed, setIsPressed] = useState(false);

  const styles = generateStyle(isPressed, !!isDisabled);

  return (
    <Androw style={styles.container}>
      <TouchableHighlight
        onPress={onPress}
        delayLongPress={Platform.OS === "android" ? 500 : Number.MAX_VALUE}
        onLongPress={() => onLongPress && onLongPress()}
        style={styles.innerContainer}
        disabled={isDisabled}
        underlayColor={underlayColor}
        onShowUnderlay={() => setIsPressed(true)}
        onHideUnderlay={() => setIsPressed(false)}
      >
        {children}
      </TouchableHighlight>
      <View pointerEvents="none" style={styles.shine}>
        <Image source={shine} style={styles.shineImage} />
      </View>
    </Androw>
  );
}

const generateStyle = (isPressed: boolean, isDisabled: boolean) => {
  const size = 64;
  const halfSize = size / 2;

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      height: size,
      width: size,
      elevation: isPressed ? 0 : 5, // Android
      shadowColor: "#000000",
      shadowOffset: isPressed ? { width: 0, height: 0 } : { width: 0, height: 1 },
      shadowOpacity: isPressed ? 0 : 2, // iOS
      shadowRadius: isPressed ? 0 : 1,
      margin: 2, // Androw shadow fix
    },
    innerContainer: {
      backgroundColor: isDisabled ? "#c2c6ca" : "#f3f4f6",
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
