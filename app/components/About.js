import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { Overlay } from "react-native-elements";

export default function About({ isVisible, setIsVisible }) {
  const closeModal = () => setIsVisible(false);

  return (
    <Overlay
      style={styles.view}
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal}
    >
      <Text style={styles.title}>Quiénes somos?</Text>
      <Text style={styles.text}>
        Somos un grupo de estudiantes egresados del Programa Codo a Codo a
        quienes se les brindó la posibilidad de hacer una especialización en
        desarrollo mobile, siendo esta App el resultado. ¡Esperamos te sea de utilidad!
      </Text>

      <Text style={styles.subtitle}>Para este proyecto usamos:</Text>
      <Text
        style={styles.links}
        onPress={() =>
          Linking.openURL("https://reactnative.dev/docs/getting-started")
        }
      >
        - React Native
      </Text>
      <Text
        style={styles.links}
        onPress={() => Linking.openURL("https://openweathermap.org/api")}
      >
        - API Weather - openweathermap
      </Text>
      <Text
        style={styles.links}
        onPress={() => Linking.openURL("https://docs.expo.dev/")}
      >
        - EXPO-CLI
      </Text>
      <Text
        style={styles.links}
        onPress={() => Linking.openURL("https://firebase.google.com/")}
      >
        - Firebase
      </Text>
      <Text
        style={styles.links}
        onPress={() => Linking.openURL("https://git-scm.com/")}
      >
        - Git
      </Text>
      <Text
        style={styles.links}
        onPress={() => Linking.openURL("https://github.com/")}
      >
        - GitHub
      </Text>

      <Text style={styles.title}>Cómo usar la app?</Text>
      <Text style={styles.text}>
        Nuestra app Ice Cream Weather te ayudará a monitorear el clima en varias
        ciudades a la vez de una forma rápida y sencilla. Para agregar una
        ciudad a tu listado sólo tienes que tocar en el + y buscar en el mapa la
        ciudad que deseas agregar.
      </Text>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  view: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,

  },
  text: {
    marginBottom: 15
  },
  links: {
    color: '#55828B'
  },
  overlay: {
    height: "auto",
    width: "90%",
    backgroundColor: "#fff",
  },
});
