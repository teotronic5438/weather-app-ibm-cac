import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const weatherApiKey = "7cf230770e1762669ad95f72737a463d";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

export default function Weather(props) {
  const { latitude, longitude } = props;
  const [currentWeather, setCurrentWeather] = useState({
    temp: "loading",
    desc: "loading",
    icon: "loading",
  });

  useEffect(() => {
    getWeather();
  }, []);
  const getWeather = () => {
    const weatherUrl = `${baseUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherApiKey}&lang=es`;

    fetch(weatherUrl)
      .then((data) => data.json())
      .then((results) => {
        setCurrentWeather({
          temp: results.main.temp,
          desc: results.weather[0].description,
          icon: results.weather[0].icon,
        });
      });
  };
  const iconUrl = `http://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`;

  return (
    <View style={styles.viewWeather}>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={styles.currentWeatherDesc}>{currentWeather.desc}</Text>
      <Text style={styles.currentWeatherTemp}>{currentWeather.temp}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewWeather: {
    alignItems: "center",
    backgroundColor: "#9adbb3",
    padding: 30,
  },
  weatherIcon: {
    width: 120,
    height: 120,
  },
  currentWeatherTemp: {
    fontSize: 30
  },
  currentWeatherDesc: {
    fontWeight: 'bold'
  }
});
