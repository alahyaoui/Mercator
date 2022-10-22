/* eslint-disable react/jsx-no-literals */
import React, { useMemo, useState } from "react";
import { StyleSheet, View, Button, TextInput, Text } from "react-native";
import { type EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import MapTemplate from "./MapTemplate";

import { RoundButton } from "../components/RoundButton";

export default function MapView() {
  const edgeInsets = useSafeAreaInsets();

  const styles = useMemo(() => generateStyle(edgeInsets), [edgeInsets]);

  let webRef: WebView<any> | null;
  const [mapCenter, setMapCenter] = useState("-121.913, 37.361");

  const onButtonClick = () => {
    const [lng, lat] = mapCenter.split(",");
    // Added true next line at injected js to hide warning: Error evaluating injectedJavaScript
    webRef?.injectJavaScript(`map.setCenter([${parseFloat(lng)}, ${parseFloat(lat)}]); true`);
  };

  const handleMapEvent = (event: any) => {
    setMapCenter(event.nativeEvent.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput style={styles.textInput} onChangeText={setMapCenter} value={mapCenter} />
        <Button title="Set Center" onPress={onButtonClick} />
      </View>
      <WebView
        ref={(r) => {
          webRef = r;
        }}
        onMessage={handleMapEvent}
        style={styles.map}
        originWhitelist={["*"]}
        source={{ html: MapTemplate }}
      />
      <View style={styles.recenterButton}>
        <RoundButton onPress={onButtonClick}>
          <Text>Center</Text>
        </RoundButton>
      </View>
    </View>
  );
}

const generateStyle = (edgeInsets: EdgeInsets) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      flex: 1,
    },
    searchBar: {
      flexDirection: "row",
      height: "auto",
      backgroundColor: "rgba(52, 52, 52, 0.8)",
      color: "#000",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 12,
    },
    textInput: {
      height: 40,
      width: "60%",
      marginRight: 12,
      paddingLeft: 5,
      borderWidth: 1,
    },
    recenterButton: {
      position: "absolute",
      bottom: edgeInsets.bottom,
      right: edgeInsets.right,
      marginBottom: 12,
      marginRight: 12,
    },
    map: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return styles;
};
