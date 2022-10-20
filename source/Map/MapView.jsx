/* eslint-disable react/jsx-no-literals */
import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { WebView } from "react-native-webview";

import MapTemplate from "./MapTemplate";

export default function MapView() {
  let webRef;
  const [mapCenter, setMapCenter] = useState("-121.913, 37.361");

  const onButtonClick = () => {
    const [lng, lat] = mapCenter.split(",");
    webRef.injectJavaScript(`map.setCenter([${parseFloat(lng)}, ${parseFloat(lat)}])`);
  };

  const handleMapEvent = (event) => {
    setMapCenter(event.nativeEvent.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    height: "15%",
    backgroundColor: "#fff",
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
  map: {
    width: "100%",
    height: "85%",
    alignItems: "center",
    justifyContent: "center",
  },
});