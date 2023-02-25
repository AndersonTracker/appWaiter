import React, {useLayoutEffect, useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from 'react-native-vector-icons';
import Variaveis from "../../../../components/global/Variaveis";

function ProductLunchs({navigation, route}) {
    
    const [itemCommands, setItemCommands] = useState(comandas);
    const [waiter, setWaiter] = React.useState(localStorage.getItem("nome"));
    const { commands_id } = route.params;

    var comandas = [
        {
            item_commands_idCommand: '',
            item_commands_category: '',
            item_commands_idProduct: '',
            item_commands_nameProduct: '',
            item_commands_note: '',
            item_commands_quantity: '',
            item_commands_unitAmount: '',
        }
    ]

    useLayoutEffect( () => {
        const waiterNome = localStorage.getItem("nome");
        setWaiter(waiterNome);
        fetch(Variaveis.urlBase + ":8080/webapp/rest/Refrigerante").then(response => response.json()).then(
            data => {
                console.log(data);
                setItemCommands(data);
            }
          )
        setItemCommands({
            "item_commands_idCommand": commands_id,
        });

      },[]);

    function logOut(){
        localStorage.clear();
        navigation.navigate('Login');
    }

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
            <Feather style={estilos.search} name="search" size={25} color="black"/>
            <TextInput style={estilos.InputFilterTable} placeholder=" numero da mesa"/>   
        </View>
        </LinearGradient>
        <View style={estilos.ViewProducts}>
            <View style={estilos.ViewRow}>
                <View style={estilos.ViewLunch}>
                    <TouchableOpacity onPress={() => {navegar("Almoços")}}> 
                        <Image style={estilos.imageAlmoco}></Image>
                        <Text style={estilos.textImage}>Almoços</Text>
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
      search: {
        marginTop: "5%",
      },
      InputFilterTable: {
        fontSize: 15,
        marginLeft: "25%",
        marginTop: "5%",
        width: "150%",
        height: "65%",
        padding: 2,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: "white",
        position: 'absolute',
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
export default ProductLunchs;
