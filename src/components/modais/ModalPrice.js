import React from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput} from 'react-native';
import Variaveis from "../../components/global/Variaveis";

export default function ModalPrice(props) {
  const [valor, setValor] = React.useState(0);

    function onChangeValor(value){
      setValor(value);
  }

  function adicionarValor(){
    props.adicionar(valor);
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isVisible}
        onPress={props.fechar}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Digite o valor!</Text>
            <View style={styles.ViewInputs}>
              <TextInput style={styles.InputLoginAdmin} value={valor} onChangeText={onChangeValor} keyboardType='numeric' placeholder="  valor: "/>
            </View>
            <Pressable  
              style={styles.buttonAcept}
              onPress={adicionarValor}>
              <Text style={styles.textStyle}>Acessar</Text>
            </Pressable>
            <Pressable  
              style={styles.buttonClosed}
              onPress={props.fechar}>
              <Text style={styles.textStyle}>cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    marginTop:" 45%",
    width: 410,
    height: 300,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    width: "90%",
    height: "75%",
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonAcept: {
    marginTop: 55,
    width: '100%',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  buttonClosed: {
    width: '80%',
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 1,
    textAlign: 'center',
    fontSize: 20,
  },
  ViewInputs:{
    position: "absolute",
    width: 250,
    height: 300,
},
InputLoginAdmin:{
    position: "absolute",
    width: "100%",
    height: "13%",
    marginTop: 70,
    fontWeight: "bold",
    borderRadius: 7,
    borderColor: "black",
    fontSize: 15,
    padding: 5,
    borderWidth: 2
},
});