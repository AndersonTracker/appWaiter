import React, { useState } from "react";
import { StyleSheet, Image, Text, View, TextInput, Button, Alert} from "react-native";
import create from '../../../assets/createWaiter.png';
import { TextInputMask } from 'react-native-masked-text';
import Variaveis from "../../components/global/Variaveis";

const CreateWaiter = ({navigation}) => {

    const [form, setForm] = useState(initialState);
    const [error, setErros] = useState(initialStateError);

    function initialState(){
        return {
            "nome": "",
            "user": "",
            "password": "",
            "confirmPassword": "",
            "telephone": ""
        }
    }

    function initialStateError(){
        return {
            "errorName": "",
            "errorUser": "",
            "errorPassword": "",
            "errorPasswordConfirm": "",
            "errorTelephone": "",
        }
    }

    function submit(){
        var isRelease = true;
        var errorName = ''; 
        var errorUser = '';
        var errorPassword = '';
        var errorPasswordConfirm = '';
        var errorTelephone = '';
        if(form.nome.length < 3){errorName = "Deve conter mais que 2 Caracteres!"; isRelease = false;}
        if(form.nome == ''){ errorName = "Não é permitido campo vazio!"; isRelease = false;}
        if(form.user.length < 6){errorUser = "Deve conter mais que 6 Caracteres!"; isRelease = false;}
        if(form.user == ''){errorUser = "Não é permitido campo vazio!"; isRelease = false;}
        if(form.telephone.length != 15){errorTelephone = "Telefone invalido!"; isRelease = false;}
        if(form.telephone == ''){errorTelephone = "Não é permitido campo vazio!"; isRelease = false;}
        if(form.password.length < 6){errorPassword = "Deve conter mais que 6 Caracteres!"; isRelease = false;}
        if(form.password == ''){errorPassword = "Não é permitido campo vazio!"; isRelease = false;}
        if(form.confirmPassword !== form.password){errorPasswordConfirm = "Senha incorreta!"; isRelease = false;}
        if(form.confirmPassword == ''){errorPasswordConfirm = "Deve confirmar a senha!"; isRelease = false;}
        setErros({"errorName": errorName, "errorUser": errorUser, "errorPassword": errorPassword, "errorPasswordConfirm": errorPasswordConfirm, "errorTelephone": errorTelephone});
        if(isRelease){
            fetch(Variaveis.urlBase + ":8080/webapp/rest/waiter",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({["waiter_name"]: form.nome, ["waiter_login"]: form.user, ["waiter_password"]: form.password, ["waiter_telephone"]: form.telephone})
            }).then(response => {
                console.log(response.status);
                if(response.status == 204){
                    Alert.alert("Usuario criado com sucesso!", "voce foi redirecionado para a pagina inicial.");
                    navigation.navigate('Login');
                }else{
                    throw new Error();
                }
            }).catch((error) => {
                Alert.alert("Erro na criação.", "descrição: usuario ja existente.");
            });
        }else{
            Alert.alert("Os campos não podem estar vazios.", "verifique os dados e tente novamente!");
        }
    }

    function voltar(){
        navigation.navigate('Login'); 
    }
    
    return <View>
        <Image source={create} style={estilos.topo}/>
        <View style={estilos.ViewDescription}>
            <Text style={estilos.titulo}>Criação de garçom</Text>
            <Text style={estilos.subTitulo}>preencha o fomulario para criar um novo colaborador</Text>  
        </View>  

        <View style={estilos.ViewInputs}>
            <TextInput style={estilos.Input} value={form.nome} placeholder=" Nome: digite seu nome" 
            onChangeText={(value)=>setForm({"nome": value, "user": form.user, "password": form.password, "confirmPassword": form.confirmPassword, "telephone": form.telephone})}/>
            <Text style={estilos.error}>{error.errorName}</Text>

            <TextInput style={estilos.Input} value={form.user} placeholder=" Login: digite o login" 
            onChangeText={(value)=>setForm({"nome": form.nome, "user": value, "password": form.password, "confirmPassword": form.confirmPassword, "telephone": form.telephone})}/>
            <Text style={estilos.error}>{error.errorUser}</Text>

            <TextInputMask style={estilos.Input} value={form.telephone} placeholder=" Telefone: ex:(54)9 9152-5151" keyboardType='numeric' type={'custom'} options={{mask:'(99)9 9999-9999'}} onChangeText={(value)=>setForm({"nome": form.nome, "user": form.user, "password": form.password, "confirmPassword": form.confirmPassword, "telephone": value})}/>
            <Text style={estilos.error}>{error.errorTelephone}</Text>

            <TextInput style={estilos.Input} value={form.password} placeholder=" Senha: digite a senha" secureTextEntry={true} 
            onChangeText={(value)=>setForm({"nome": form.nome, "user": form.user, "password": value, "confirmPassword": form.confirmPassword, "telephone": form.telephone})}/>
            <Text style={estilos.error}>{error.errorPassword}</Text>

            <TextInput style={estilos.Input} value={form.confirmPassword} placeholder=" Senha: confirme sua senha" secureTextEntry={true}  
            onChangeText={(value)=>setForm({"nome": form.nome, "user": form.user, "password": form.password, "confirmPassword": value, "telephone": form.telephone})}/>
            <Text style={estilos.error}>{error.errorPasswordConfirm}</Text>

            <View style={estilos.ViewButtonEntrar}>
                <Button style={estilos.ButtonEntrar} title="Criar" onPress={submit}/>
                <View style={estilos.ViewButtonVoltar}>
                    <Button style={estilos.ButtonVoltar} title="voltar" onPress={voltar}/>
                </View>
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
        textAlign: "center",
        position: "relative",
        textAlignVertical: "center",
        fontSize: 25,
        lineHeight: 20,
        color: "black",
        fontWeight: "bold",
    },
    subTitulo:{
        width: "100%",
        height: "42%",
        position: "absolute",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 15,
        lineHeight: 26,
        color: "black",
        fontWeight: "bold",
    },
    ViewInputs:{
        position: "absolute",
        width: "79%",
        height: "50%",
        marginTop: "47%",
        marginLeft: "10%",
        //backgroundColor: "black",
    },
    Input: {
        marginBottom: -4,
        width: "80%",
        height: 40,
        marginLeft: '9%',
        backgroundColor: "white",
        fontWeight: "bold",
        borderRadius: 6,
        borderColor: "black",
        fontSize: 15,
        padding: 5,
        borderWidth: 1,
    },
    ViewButtonEntrar: {
        width: "60%",
        height: "30%",
        marginTop: "3%",
        marginLeft: "17%"
    },
    ButtonEntrar:{
        borderRadius: 1,
        fontSize: 20,
        padding: 10,
        borderWidth: 2
    },
    ViewButtonVoltar:{
        width: "100%",
        height: "50%",
        padding: 15,
    },
    ButtonVoltar:{
        padding:11,
    },
    error: {
        width: "70%",
        height: "4%",
        marginLeft: "11%",
        marginBottom: 2,
        color:"red",
        fontWeight: "500",
        fontSize: 13,
    }
});
export default CreateWaiter;
