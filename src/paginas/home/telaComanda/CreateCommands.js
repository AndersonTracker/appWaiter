import React, {useState, useLayoutEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput} from 'react-native';
import Variaveis from '../../../components/global/Variaveis';

export default function CreateCommands(props) {

  const [waiterName, setWaiterName] = useState();
  const [table, setTable] = useState('');
  const [nomeCommands, setNomeCommands] = useState('');

    function submit(){
        if(table != ''){
          fetch(Variaveis.urlBase + ":8080/webapp/rest/Commands",
          {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({["commands_table"]: table, ["commands_client_name"]: nomeCommands, ["commands_waiter_name"]: waiterName})
          }).then(response => {
              console.log(response.status);
              if(response.status == 204){
                console.log("opa");
                  Alert.alert("comanda criada!", "oba, agora voce ja pode vender!");
                  setTable('');
                  setNomeCommands('');
                  props.fechar();
              }else{
                Alert.alert("Erro na criação.", "descrição: erro no sistema.");
              }
          });
        }else{
            Alert.alert("Necessario informar a mesa!", "Não é permitido criar comandas sem estar associado a uma mesa.");
        }
    }

    function onchangedTable(value){
        setTable(value);
    }

    function onchangedNameCommands(value){
        setNomeCommands(value);
    }

    useLayoutEffect( () => {
        const waiterNome = localStorage.getItem("nome");
        setWaiterName(waiterNome);
      }
    );

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Criação de comanda</Text>
            <Text style={styles.modalTextSub}>Crie uma comanda</Text>
            <View style={styles.ViewInputs}>
              <TextInput style={styles.InputLoginAdmin} value={table} onChangeText={onchangedTable} keyboardType='numeric' placeholder=" Digite o numero da mesa"/>
              <TextInput style={styles.InputPasswordAdmin} value={nomeCommands} onChangeText={onchangedNameCommands} placeholder=" Nome na comanda"/>
            </View>
            <Pressable  
              style={styles.buttonAcept}
              onPress={submit}>
              <Text style={styles.textStyle}>Criar nova comanda</Text>
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
    width: 410,
    height: 610,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    width: "90%",
    height: "68%",
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 15,
    borderColor: "#040f",
    borderWidth: 5,
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
    marginTop: "22%",
    width: '100%',
    borderRadius: 10,
    padding: 10,
    elevation: 12,
    backgroundColor: '#2196F3',
  },
  buttonClosed: {
    width: '80%',
    marginTop: "5%",
    borderRadius: 10,
    padding: 10,
    elevation: 12,
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
    fontSize: 25,
  },
  modalTextSub:{
    fontSize: 20,
    marginBottom: 100,
  },
  ViewInputs:{
    position: "absolute",
    width: "100%",
    height: "100%",
},
InputLoginAdmin:{
    position: "absolute",
    width: "100%",
    height: "13%",
    marginTop: 130,
    fontWeight: "bold",
    borderRadius: 7,
    borderColor: "black",
    fontSize: 15,
    padding: 5,
    borderWidth: 2
},
InputPasswordAdmin:{
    position: "absolute",
    width: "100%",
    height: "13%",
    marginTop: 182,
    fontWeight: "bold",
    borderRadius: 7,
    borderColor: "black",
    fontSize: 15,
    padding: 5,
    borderWidth: 2
},
});