import React from "react";
import { View, Text, Stylesheet, Linking } from "react-native";

export default function WeAre(){
  return(
    <View style={styles.view}>
      <Text Style={styles.title}>Quiénes somos?</Text>
      <Text style={styles.text}>
        Somos un grupo de estudiantes egresados del Programa Codo a Codo 
        a quienes se les brindó la posibilidad de hacer una especialización 
        en desarrollo mobile y este es el resultado. Esperamos te sea de utilidad!
      </Text> 

      <Text style={styles.text}>
        Para este proyecto usamos:
      </Text>
      <Text style={styles.links} onPress={() => Linking.openURL('https://reactnative.dev/docs/getting-started')} >
        React Native
      </Text>
      <Text style={styles.links} onPress={() => Linking.openURL('https://openweathermap.org/api')} >
        API Weather - openweathermap {/*Hay que completar esto cuando sepamos que api usamos*/} 
      </Text> 
      <Text style={styles.links} onPress={() => Linking.openURL('https://www.sqlite.org/index.html')} >
        SQL Lite {/*Chequear esto*/}
      </Text>
      <Text style={styles.links} onPress={() => Linking.openURL('https://git-scm.com/')} >
        Git
      </Text>
      <Text style={styles.links} onPress={() => Linking.openURL('https://github.com/')} >
        GitHub
      </Text>

      <Text style={styles.title}>Cómo usar la app?</Text>
      <Text style={styles.text}>
        Nuestra app NOMBRE DE LA APP te ayudará a monitorear el clima en varias ciudades
        a la vez de una forma rápida y sencilla. Para agregar una ciudad a tu listado sólo 
        tienes que tocar en el + y buscar en el mapa la ciudad que deseas agregar.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view:{

  },
  title:{

  },
  text:{

  },
  links:{

  }
})