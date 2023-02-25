import React, {useEffect} from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, ScrollView} from "react-native";
import { TextInputMask } from 'react-native-masked-text';
import vinhoTela from '../../../assets/resetSenhaSuave.jpg';
import Variaveis from "../../components/global/Variaveis";

function ResetPasswordWaiter({navigation}) {
    
    const [user, setUser] = React.useState('');
    const [valueError, setValueError] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmed, setPasswordConfirmed] = React.useState('');
    const [page, setPage] = React.useState("ConfirmedUser");
    const [codeAleatorio, setCodeAleatorio] = React.useState('');
    const [codeReceived, SetCodeReceived] = React.useState('');
    const [disabledButton, setDisabledButton] = React.useState(true);

    useEffect(() => { 
        setValueError('');
    }, [])

    const AWS = require("aws-sdk");
    const credentials = {
        id: 'AKIA4J233NBVDMQ6MQMX',
        secret: '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'
    }

    AWS.config.update({
        region: 'us-east-1',
        accessKeyId: credentials.id,
        secretAccessKey: credentials.secret
    });
    // Create publish parameters
    let params = {
        Message: 'seu codigo de verificação é ', /* required */
        PhoneNumber: '+55',
    };
    // Create promise and SNS service object
    function sendSMS(params) {
        var publishTextPromise = new AWS.SNS().publish(params).promise();
        // Handle promise's fulfilled/rejected states
        publishTextPromise.then(function (data) {
            console.log("MessageID is " + data.MessageId);
        }).catch(function (err) {
            console.error(err, err.stack);
        });
    }

    function verificarTelefone(tele, num){
        if(tele !== ''){
            var resultado = tele.replace("(", "");
            var resultado1 = resultado.replace(" ", "");
            var resultado2 = resultado1.replace("-", "");
            var resultado3 = resultado2.replace(")", "");
            console.log(resultado3);
            params.Message = 'seu codigo de verificação é ' + num;
            params.PhoneNumber = '+55' + resultado3;
            sendSMS(params);
        }
    }

    function resetPassword(){
        if(user != undefined && user != ''){
            console.log(password);
            console.log(passwordConfirmed);
            if(password != '' && passwordConfirmed != ''){
                if(password == passwordConfirmed){
                    fetch(Variaveis.urlBase + ":8080/webapp/rest/waiter",
                    {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({["waiter_login"]: user, ["waiter_password"]: password})
                    }).then(response => {
                        console.log(response.status);
                        if(response.status == 204){
                            console.log("alterado");
                            navigation.navigate('Login');
                            Alert.alert("Sucesso", "Senha alterada com sucesso!.");
                        }else{
                            Alert.alert("usuario inexistente.");
                            setValueError("Usuario não localizado.");
                        }
                    }).catch((error) => {
                        Alert.alert("Erro na alteração.", "descrição: erro interno.");
                    });
                }else{
                    setValueError("As senhas não coincidem.");
                    Alert.alert("Senha não correspondente.", "A senha confirmada não é correspondente a senha digitada no campo Password.");
                }
                        
            }else{
                setValueError("não pode haver campos vazios.");
            }
        }else{
            setValueError("Usuario expirado.");
            Alert.alert("Usuario invalido.", "usuario expirado.");
        }
    }

    function submit(){
        if(user != undefined && user != ''){
            fetch(Variaveis.urlBase + ":8080/webapp/rest/validate",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({["waiter_login"]: user})
            }).then(response => {
                return response.json();
            }).then(r => {
                console.log(r);
                if(r.waiter_found == true){
                    var numero = Math.floor(Math.random() * 65536);
                    if(numero.toString().length == 1){
                        var valor = "0000" + numero;
                        numero = valor;
                    }else if(numero.toString().length == 2){
                        var valor = "000" + numero;
                        numero = valor;
                    }else if(numero.toString().length == 3){
                        var valor = "00" + numero;
                        numero = valor;
                    }else if(numero.toString().length == 4){
                        var valor = "0" + numero;
                        numero = valor;
                    }
                    console.log(numero);
                    setPage("ConfirmedCode");
                    setCodeAleatorio(numero);
                    verificarTelefone(r.waiter_telephone, numero);
                }else{
                    Alert.alert("Usuario inexistente.");
                    setValueError("Usuario não localizado.");
                }
            });
        }else{
            setValueError("Campo login é obrigatorio.");
            Alert.alert("Usuario invalido.", "não é possivel submeter valor nulo.");
        }
    }

    function onChangeUser(value){
        setUser(value);
    }

    function onChangePassWord(value){
        setPassword(value);
    }

    function onChangePassWordConfirmed(value){
        setPasswordConfirmed(value);
    }

    function codeReceivedOnChange(value){
        SetCodeReceived(value);
        if(value.toString().length == 5){
            setDisabledButton(false);
        }else{
            setDisabledButton(true);
        }
    }

    function confirmedCode(){
        if(codeReceived == codeAleatorio){
            console.log("opa");
            setPage("ConfirmedPassword");
        }else{
            Alert.alert("Error", "Codigo incompativel!");
        }
    }

    function voltar(){
        navigation.navigate('Login'); 
    }

    if(page == "ConfirmedUser"){
        return <ScrollView>
        <Image source={vinhoTela} style={estilos.topo}/>
        <View style={estilos.ViewDescription}>
            <Text style={estilos.titulo}>Reset de senha</Text>
            <Text style={estilos.subTitulo}>Digite seu login para receber por SMS o codigo de verificação!</Text>  
        </View>  
        <View style={estilos.ViewInputs}>
            <TextInput style={estilos.InputLogin} value={user} onChangeText={onChangeUser} placeholder=" Login: digite seu usuario"/>
            <Text style={estilos.Error}>{valueError}</Text>
        </View>
        <View style={estilos.ViewButtonConfirmed}>
            <Button style={estilos.ButtonConfirmed} title="confirmar" onPress={submit}/>
            <View style={estilos.ViewButtonCancel}>
                <Button style={estilos.ButtonCancel} title="Cancelar" onPress={voltar}/>
            </View>
        </View>
        
    </ScrollView>
    }else if(page == "ConfirmedCode"){
        return <ScrollView>
        <Image source={vinhoTela} style={estilos.topo}/>
        <View style={estilos.ViewDescription}>
            <Text style={estilos.titulo}>Recebeu nosso SMS ?</Text>
            <Text style={estilos.subTitulo}>Ele possui o codigo para a validação!</Text>  
        </View>  
        <View style={estilos.ViewInputs}>
        <TextInputMask style={estilos.InputLogin} value={codeReceived} placeholder=" code: ex: 00000" keyboardType='numeric' type={'custom'} options={{mask:'99999'}} onChangeText={codeReceivedOnChange}/>
            <Text style={estilos.Error}>{valueError}</Text>
        </View>
        <View style={estilos.ViewButtonConfirmed}>
            <Button style={estilos.ButtonConfirmed} title="confirmar" disabled={disabledButton} onPress={confirmedCode}/>
            <View style={estilos.ViewButtonCancel}>
                <Button style={estilos.ButtonCancel} title="Cancelar" onPress={voltar}/>
            </View>
        </View>
        
    </ScrollView>
    }else if(page == "ConfirmedPassword"){
        return <ScrollView>
        <Image source={vinhoTela} style={estilos.topo}/>
        <View style={estilos.ViewDescription}>
            <Text style={estilos.tituloReset}>Reset de senha.</Text>
            <Text style={estilos.subTitulo}>Altere a senha para uma senha forte!</Text>  
        </View>  
        <View style={estilos.ViewInputsReset}>
        <Text style={estilos.Label}>User</Text>
        <TextInput style={estilos.InputReset} value={user} disabled={true}/>
        <Text style={estilos.Label}>New Password</Text>
        <TextInput style={estilos.InputReset} value={password} secureTextEntry={true} onChangeText={onChangePassWord}/>
        <Text style={estilos.Label}>Confirmed Password</Text>
        <TextInput style={estilos.InputReset} value={passwordConfirmed}  secureTextEntry={true} onChangeText={onChangePassWordConfirmed}/>
        <Text style={estilos.ErrorReset}>{valueError}</Text>
        </View>
        <View style={estilos.ViewButtonConfirmedReset}>
            <Button style={estilos.ButtonConfirmed} title="Confirmar" onPress={resetPassword}/>
            <View style={estilos.ViewButtonCancel}>
                <Button style={estilos.ButtonCancel} title="Cancelar" onPress={voltar}/>
            </View>
        </View>
        
    </ScrollView>
    }
    
    }

const estilos = StyleSheet.create({
    topo: {
        width:450,
        height: 823,
    },
    ViewDescription:{
        position: "absolute",
       width: 400,
        height: 800,
    },
    titulo: {
        borderRadius: 10,
        marginTop: "27%",
        marginLeft: "6%",
        backgroundColor: "#fffd",
        position: "absolute",
        width: "90%",
        height: "12%",
        textAlign: "center",
        fontSize: 25,
        lineHeight: 26,
        paddingTop: "5%",
        color: "black",
        fontWeight: "bold",
    },
    tituloReset: {
        borderRadius: 10,
        marginTop: "27%",
        marginLeft: "6%",
        backgroundColor: "#fffd",
        position: "absolute",
        width: "90%",
        height: "55%",
        textAlign: "center",
        fontSize: 25,
        lineHeight: 26,
        paddingTop: "5%",
        color: "black",
        fontWeight: "bold",
    },
    subTitulo:{
        width: "90%",
        height: "46%",
        marginLeft: "6%",
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
        width: "100%",
        height: "100%",
    },
    InputLogin:{
        position: "absolute",
        width: "80%",
        height: "5%",
        marginTop: "55%",
        marginLeft: "9%",
        backgroundColor: "#fffd",
        fontWeight: "bold",
        borderRadius: 10,
        borderColor: "black",
        fontSize: 20,
        padding: 10,
        borderWidth: 1
    },
    ViewButtonConfirmed: {
        position: "absolute",
        width: "79%",
        height: "30%",
        marginTop: "75%",
        marginLeft: "10%",
        padding: 15,
    },
    ViewButtonConfirmedReset:{
        position: "absolute",
        width: "79%",
        height: "30%",
        marginTop: "99%",
        marginLeft: "10%",
        padding: 15,
    },
    ButtonConfirmed:{
        borderRadius: 50,
        borderColor: "black",
        fontSize: 20,
        padding: 10,
        borderWidth: 2
    },
    ViewButtonCancel:{
        width: "100%",
        height: "50%",
        padding: 15,
    },
    ButtonCancel:{
        padding:11,
    },
    ViewInputsReset: {
        position: "absolute",
        width: "100%",
        height: "100%",
        marginTop: "49%",
    },
    InputReset: {
        width: "80%",
        height: "5%",
        marginTop: "1%",
        marginLeft: "9%",
        backgroundColor: "white",
        fontWeight: "bold",
        borderRadius: 10,
        borderColor: "black",
        fontSize: 20,
        padding: 10,
        borderWidth: 1
    },
    Label: {
        color: "black",
        marginLeft: "12%",
        fontWeight: "bold",
        fontSize: 15,
    },
    Error:{
        marginTop: "71%",
        marginLeft: "12%",
        fontWeight: "bold",
        color: "red",
        fontSize: 15,
    },
    ErrorReset: {
        marginLeft: "12%",
        color: "red",
        fontSize: 15,
    }
});
export default ResetPasswordWaiter;
