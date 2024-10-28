import { Text,Button,View,StyleSheet,TouchableOpacity } from "react-native";

export default function AddItemButton({onPressed}) {
    return (
        <TouchableOpacity style={styles.button} onPress={() => {
          console.log(onPressed)
          onPressed()} }>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
    button: {
      width: 40,
      height: 40,
      justifyContent: 'center', // Dikeyde ortalama
      alignItems: 'center', // Yatayda ortalama
      borderRadius: 20, // Yuvarlak kenar (dairesel buton)
      marginRight: 10, // Sağdan boşluk (navigasyon barına yapışmasını önlemek için)
    },
    buttonText: {
      color: '#000', // Yazı rengi
      fontSize: 24, // Yazı boyutu
      fontWeight: 'bold', // Yazı kalınlığı
    },
  });