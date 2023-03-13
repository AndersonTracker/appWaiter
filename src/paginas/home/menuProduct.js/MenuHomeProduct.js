import React, {useLayoutEffect, useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Variaveis from "../../../components/global/Variaveis";
import { Feather } from 'react-native-vector-icons';

function MenuHomeProduct({navigation, route}) {
    
    const [itemCommands, setItemCommands] = useState();
    const [waiter, setWaiter] = React.useState(localStorage.getItem("nome"));
    const { commands_id, commands_table, commands_client_name, commands_waiter_name } = route.params;

    useLayoutEffect( () => {
        const waiterNome = localStorage.getItem("nome");
        setWaiter(waiterNome);
      },[]);

    function logOut(){
        localStorage.clear();
        navigation.navigate('Login');
    }

    function navegar(value){
        console.log(value);
        if(value == "Almoços"){
            navigation.navigate('ProductLunchs', { 
                commands_id: commands_id, 
                commands_client_name: commands_client_name,
                commands_table: commands_table
            });
        }
    };

    return <View>
        <LinearGradient style={estilos.Gradient}
        // Background Linear Gradient
        colors={["#af1f", "#0a3203"]}>
                <Text style={estilos.titulo}>comanda: {JSON.stringify(commands_id)} </Text>
                <Text style={estilos.subTitulo}>logado como: {waiter} </Text>  
                <TouchableOpacity style={estilos.botaoLogOut} onPress={logOut}> 
                    <Text style={estilos.textBotao}>log-out</Text>
                </TouchableOpacity>   
        <View style={estilos.filter} >
        <Text style={estilos.DetailCommandsTable}>mesa: {JSON.stringify(commands_table)} </Text>
        </View>
        </LinearGradient>
        <Text style={estilos.DetailCommands}>Mesa: {JSON.stringify(commands_table)}  Cliente: {commands_client_name}</Text>
        
        <View style={estilos.ViewProducts}>
            <View style={estilos.ViewRow}>
                <View style={estilos.ViewLunch}>
                    <TouchableOpacity onPress={() => {navegar("Almoços")}}> 
                        <Image source={{uri: Variaveis.urlBase + ':8080/images/almoco.jpg'}} style={estilos.imageAlmoco}></Image>
                        <Text style={estilos.textImage}>Almoços</Text>
                    </TouchableOpacity>
                </View>
                <View style={estilos.ViewLunch}>
                    <TouchableOpacity onPress={() => {navegar("Refrigerantes")}}> 
                        <Image source={{uri: Variaveis.urlBase + ':8080/images/refrigerante.png'}} style={estilos.imageAlmoco}></Image>
                        <Text style={estilos.textImage}>Refrigerantes</Text>
                    </TouchableOpacity>
                </View>
                <View style={estilos.ViewLunch}>
                    <TouchableOpacity onPress={() => {navegar("Sucos")}}> 
                        <Image source={{uri: Variaveis.urlBase + ':8080/images/sucos.jpg'}} style={estilos.imageAlmoco}></Image>
                        <Text style={estilos.textImage}>Sucos</Text>
                    </TouchableOpacity>
                </View>
            </View> 
            <View style={estilos.ViewRow}>
                <View style={estilos.ViewLunch}>
                    <TouchableOpacity onPress={() => {navegar("Caipirinhas")}}> 
                        <Image source={{uri: Variaveis.urlBase + ':8080/images/caipirinha.jpg'}} style={estilos.imageAlmoco}></Image>
                        <Text style={estilos.textImage}>Caipirinhas</Text>
                    </TouchableOpacity>
                </View>
                <View style={estilos.ViewLunch}>
                    <TouchableOpacity onPress={() => {navegar("Destilados")}}> 
                        <Image source={{uri: Variaveis.urlBase + ':8080/images/destilados.jpg'}} style={estilos.imageAlmoco}></Image>
                        <Text style={estilos.textImage}>Destilados</Text>
                    </TouchableOpacity>
                </View>
                <View style={estilos.ViewLunch}>
                    <TouchableOpacity onPress={() => {navegar("Vinhos")}}> 
                        <Image source={{uri: Variaveis.urlBase + ':8080/images/vinhos.jpg'}} style={estilos.imageAlmoco}></Image>
                        <Text style={estilos.textImage}>Vinhos</Text>
                    </TouchableOpacity>
                </View>
            </View> 
            <View style={estilos.ViewRow}>
                <View style={estilos.ViewLunch}>
                    <TouchableOpacity onPress={() => {navegar("Cervejas")}}> 
                        <Image source={{uri: Variaveis.urlBase + ':8080/images/beer.jpg'}} style={estilos.imageAlmoco}></Image>
                        <Text style={estilos.textImage}>Cervejas</Text>
                    </TouchableOpacity>
                </View>
                <View style={estilos.ViewLunch}>
                    <TouchableOpacity onPress={() => {navegar("Drinks")}}> 
                        <Image source={{uri: Variaveis.urlBase + ':8080/images/drinks.jpg'}} style={estilos.imageAlmoco}></Image>
                        <Text style={estilos.textImage}>Drinks</Text>
                    </TouchableOpacity>
                </View>
                <View style={estilos.ViewLunch}>
                <TouchableOpacity onPress={() => {navegar("Drinks")}}> 
                        <Image style={estilos.imageAlmoco}></Image>
                        <Text style={estilos.textImage}>outros</Text>
                    </TouchableOpacity>
                </View>
            </View> 
        </View>
        <View style={estilos.ViewProductsRow2}>

        </View>
        
    </View>
    }

const estilos = StyleSheet.create({
    Gradient: {
        height: 80,
        width: "100%",
    },
    titulo: {
        width: "100%",
        height: "37%",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 22,
        lineHeight: 26,
        color: "black",
        fontWeight: "bold",
    },
    subTitulo:{
        marginTop: "4%",
        marginLeft: "1%",
        position: "absolute",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 12,
        lineHeight: 26,
        color: "black",
        fontWeight: "bold",
    },
    botaoLogOut: {
        marginTop: "4%",
        marginLeft: "1%",
        paddingLeft: "1%",
        backgroundColor: "white",
        width: "15%",
        height: "40%",
        borderRadius: 6,
        borderColor: "black",
        borderWidth: 1
    },
    textBotao: {
        marginTop: "10%",
        fontWeight: "400",
        fontSize: 16,
    },
    viewTable: {
        width: "100%",
        height: "95%",
    },
    item: {
        borderRadius: 2,
        borderColor: "black",
        borderWidth: 1,
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 5,
    },
    text: {
        fontSize: 20,
    },
    textPronto: {
        fontSize: 15,
    },
    touchableOpacityStyle: {
        position: 'absolute',
        marginTop: "160%",
        marginLeft: "70%",
        borderRadius: 60,
        borderColor: "black",
      },
      filter: {
        position: 'absolute',
        marginLeft: "55%",
        marginTop: "10%",
      },
      DetailCommands: {
        marginLeft: "4%",
        fontSize: 19,
        fontWeight: "bold",
      },
      DetailCommandsTable: {
        fontSize: 30,
        fontWeight: "bold",
      },
      add: {
        alignItems: 'flex-end',
      },
      DetailAlmoços:{
        backgroundColor: "#181f",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "2%",
        borderRadius: 2,
        borderColor: "black",
        borderWidth: 1
      },
      minus: {
        marginLeft: 100,
        backgroundColor: "red",
      },
      max: {
        backgroundColor: "green",
      },
      textCount: {
        fontSize: 20,
        fontWeight: "bold",
      },
      ViewProducts: {
          height: "100%",
          width: "100%",
      },
      ViewRow: {
        marginTop: "3%",
        height: "15%",
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-between",
      },
      ViewProductsRow2:{
        backgroundColor: "red"
      },
      ViewLunch: {
        backgroundColor: "green",
        width: "29%",
        height: "100%",
        marginLeft: "1%",
        marginRight: "1%",
        borderRadius: 6,
        borderColor: "black",
        borderWidth: 2
      },
      imageAlmoco:{
        width: "100%",
        height: "83%",
      },
      textImage: {
        color: "black",
        fontWeight: "900",
        fontSize: 17,
        textAlign: "center",
        textAlignVertical: "center",
      }

});
export default MenuHomeProduct;

