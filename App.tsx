import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MapView from "./source/Map/MapView";

export default function App() {
  return (
    <SafeAreaProvider>
      <MapView />
    </SafeAreaProvider>
  );
}
