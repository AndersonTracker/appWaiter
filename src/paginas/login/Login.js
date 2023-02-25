import React, {useState} from "react";
import { StyleSheet, Image, Text, View, TextInput, Button, TouchableOpacity, Alert} from "react-native";
import topo from '../../../assets/loginWaiter.webp';
import ModalAdmin from "../../components/modais/ModalAdmin";
import Variaveis from "../../components/global/Variaveis";

function Login({navigation}) {
    
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [page, setPage] = useState('');
  
    function submit(){
        console.log(user + " " + password);
        if(user != undefined && user != '' && password != undefined && password != ''){
            fetch(Variaveis.urlBase + ":8080/webapp/rest/validate",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({["waiter_login"]: user, ["waiter_password"]: password})
            }).then(response => {
                return response.json();
            }).then(r => {
                console.log(r);
                var liberado = false;
                if(r.waiter_found == true){
                    localStorage.setItem("nome", r.waiter_name);
                    liberado = true;
                    setUser('');
                    setPassword('');
                }else{
                    Alert.alert("usuario ou senha invalido");
                }
                if(liberado == true){
                    Variaveis.name = r.waiter_name;
                    navigation.navigate('HomeComandas');
                }
            });
                
        }else{
            Alert.alert("Valores invalidos.", "não é possivel submeter valores nulos.");
        }
    }

    function onChangeUser(value){
        setUser(value);
    }

    function onChangePassWord(value){
        setPassword(value);
    }

    function createWaiter(){
        setPage("CreateWaiter");
        setModalVisible(!modalVisible);
        //navigation.navigate('createWaiter');
    }

    function resetPassword(){
        setPage("ResetPassword");
        setModalVisible(!modalVisible);
    }

    return <View>
        <ModalAdmin navigation={navigation} page={page} isVisible={modalVisible} fechar={() => {setModalVisible(false)}}></ModalAdmin>
        <Image source={topo} style={estilos.topo}/>
        <View style={estilos.ViewDescription}>
            <Text style={estilos.titulo}>Sistema de login do garçom</Text>
            <Text style={estilos.subTitulo}>Faça login para ter acesso!</Text>  
        </View>  
        <View style={estilos.ViewInputs}>
            <TextInput style={estilos.InputLogin} value={user} onChangeText={onChangeUser} placeholder=" Login: digite seu usuario"/>
            <TextInput style={estilos.InputPassword} secureTextEntry={true} value={password} onChangeText={onChangePassWord} placeholder=" Senha: digite sua senha"/>
        </View>
        <View style={estilos.ViewButtonEntrar}>
            <Button style={estilos.ButtonEntrar} title="Entrar" onPress={submit}/>
            <View style={estilos.ViewButtonCadastrar}>
                <Button style={estilos.ButtonCadastrar} title="cadastrar garçon" onPress={createWaiter}/>
                <TouchableOpacity onPress={resetPassword}> 
                    <Text style={estilos.ButtonResetSenha}>esqueci minha senha</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    </View>
    }

const estilos = StyleSheet.create({
    topo: {
        width:450,
        height: 840,
    },
    ViewDescription:{
       position: "absolute",
       width: "100%",
        height: "100%",
    },
    titulo: {
        width: "100%",
        height: "37%",
        position: "relative",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 29,
        lineHeight: 26,
        color: "white",
        fontWeight: "bold",
    },
    subTitulo:{
        width: "100%",
        height: "45%",
        position: "absolute",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 25,
        lineHeight: 26,
        color: "white",
        fontWeight: "bold",
    },
    ViewInputs:{
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    InputLogin:{
        position: "absolute",
        width: "80%",
        height: "7%",
        marginTop: 220,
        marginLeft: 40,
        backgroundColor: "white",
        fontWeight: "bold",
        borderRadius: 15,
        borderColor: "black",
        fontSize: 20,
        padding: 10,
        borderWidth: 2
    },
    InputPassword:{
        position: "absolute",
        width: "80%",
        height: "7%",
        marginTop: 290,
        marginLeft: 40,
        backgroundColor: "white",
        fontWeight: "bold",
        borderRadius: 15,
        borderColor: "black",
        fontSize: 20,
        padding: 10,
        borderWidth: 2
    },
    ViewButtonEntrar: {
        position: "absolute",
        width: "79%",
        height: "40%",
        marginTop: 360,
        marginLeft: 40,
        padding: 15,
    },
    ButtonEntrar:{
        borderRadius: 1,
        borderColor: "black",
        fontSize: 20,
        padding: 10,
        borderWidth: 2
    },
    ViewButtonCadastrar:{
        width: "100%",
        height: "50%",
        padding: 15,
    },
    ButtonCadastrar:{
        padding:11,
    },
    ButtonResetSenha:{
        width: "65%",
        height: "59%",
        marginLeft: 49,
        marginTop: 5,
        padding: 10,
        fontSize: 15,
        color: "#0cff",
        backgroundColor: "#1114",
        fontWeight: "bold",
    },
});
export default Login;
