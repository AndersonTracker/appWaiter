import React from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput} from 'react-native';
import Variaveis from "../../components/global/Variaveis";

export default function ModalAdmin(props) {
  const [userAdmin, setUserAdmin] = React.useState('');
  const [passwordAdmin, setPasswordAdmin] = React.useState('');

  function submit(){
    if(userAdmin != undefined && userAdmin != '' && passwordAdmin != undefined && passwordAdmin != ''){
        fetch(Variaveis.urlBase + ":8080/webapp/rest/sistem",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({["sistem_login"]: userAdmin, ["sistem_password"]: passwordAdmin})
        }).then(response => {
            return response.json();
        }).then(r => {
            console.log(r);
            if(r){
                console.log("push para outra tela");
                liberarSistema();
            }else{
                Alert.alert("Acesso negado!","Usuario ou senha invalido.");
            }
        });
            
    }else{
        Alert.alert("Os campos não podem estar vazios.", "digite um valor valido.");
    }
}

    function onChangeUserAdmin(value){
      setUserAdmin(value);
  }

  function onChangePassWordAdmin(value){
      setPasswordAdmin(value);
  }

  function liberarSistema(){
    setUserAdmin('');
    setPasswordAdmin('');
    console.log(props.page);
    if(props.page == "ResetPassword"){
      props.navigation.navigate('ResetPassword');
    }else if(props.page == "CreateWaiter"){
      props.navigation.navigate('CreateWaiter');
    }
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
            <Text style={styles.modalText}>liberação de criação!</Text>
            <Text style={styles.modalTextSub}>faça login como admin</Text>
            <View style={styles.ViewInputs}>
              <TextInput style={styles.InputLoginAdmin} value={userAdmin} onChangeText={onChangeUserAdmin} placeholder=" usuario do admin"/>
              <TextInput style={styles.InputPasswordAdmin} secureTextEntry={true} value={passwordAdmin} onChangeText={onChangePassWordAdmin} placeholder=" Senha do admin"/>
            </View>
            <Pressable  
              style={styles.buttonAcept}
              onPress={submit}>
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
    borderRadius: 30,
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
    marginTop: 70,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  buttonClosed: {
    width: '80%',
    marginTop: 10,
    borderRadius: 10,
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
  modalTextSub:{
    fontSize: 15,
    marginBottom: 100,
    color: 'red',
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