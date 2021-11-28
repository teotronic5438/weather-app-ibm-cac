import React from "react";
import MapView from "react-native-maps";

export default function Map(props) {
  const { name, latitude, longitude, height } = props;
  const location = {
    latitude,
    longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  return (
    <MapView style={{ height: height, width: "100%" }} initialRegion={{...location, longitudeDelta: 0.4, latitudeDelta: 0.4}}>
      <MapView.Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      />
    </MapView>
  );
}
