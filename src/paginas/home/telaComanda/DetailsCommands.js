import React, {useLayoutEffect, useState} from "react";
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Variaveis from "../../../components/global/Variaveis";
import { Feather } from 'react-native-vector-icons';

function DetailsCommands({navigation, route}) {
    
    const [itemCommands, setItemCommands] = useState();
    const [waiter, setWaiter] = React.useState(localStorage.getItem("nome"));
    const { commands_id, commands_table, commands_client_name, commands_waiter_name } = route.params;

    useLayoutEffect( () => {
        const waiterNome = localStorage.getItem("nome");
        Variaveis.name = waiterNome;
        setWaiter(waiterNome);
        fetch(Variaveis.urlBase + ":8080/webapp/rest/ItemCommands/" + commands_id).then(response => response.json()).then(
            data => {
                console.log(data);
                setItemCommands(data);
            }
          )
      },[]);

    function logOut(){
        localStorage.clear();
        navigation.navigate('Login');
    }

    function addProduct(){
        navigation.navigate('MenuHomeProduct', { 
            commands_id: commands_id, 
            commands_table: commands_table,
            commands_client_name: commands_client_name,
            commands_waiter_name: commands_waiter_name, 
        });
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
        <Text style={estilos.DetailCommandsTable}>mesa: {JSON.stringify(commands_table)} </Text>
        </View>
        </LinearGradient>
        <Text style={estilos.DetailCommands}>mesa: {JSON.stringify(commands_table)} </Text>
        <Text style={estilos.DetailCommands}>cliente: {commands_client_name} </Text>
        <Text style={estilos.DetailCommands}>garçom: {commands_waiter_name} </Text>
        <ScrollView>
            <Text style={estilos.DetailAlmoços}>almoços</Text>
        <View>
            <FlatList style={estilos.viewTable}
            data={itemCommands}
            keyExtractor={item => item.item_commands_id}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => {}}> 
                        <View style={estilos.item}>
                            <Text style={estilos.textPronto}>   {item.item_commands_nameProduct} <Text style={estilos.textPronto}></Text></Text>
                            <Text style={estilos.text}>   {item.item_commands_id}</Text><View style={estilos.add}></View>
                            <Feather style={estilos.minus} name="minus-square" size={25} color="black"/>
                            <Text style={estilos.textCount}>   {item.item_commands_id}</Text>
                            <Feather style={estilos.max} name="plus-square" size={25} color="black"/>
                        </View>
                    </TouchableOpacity>
                );
            }}
            /> 
            </View>
        </ScrollView> 
        <ScrollView>
        <Text style={estilos.DetailAlmoços}>bebidas</Text>
        <View>
            <FlatList style={estilos.viewTable}
            data={itemCommands}
            keyExtractor={item => item.item_commands_id}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => {}}> 
                        <View style={estilos.item}>
                            <Text style={estilos.textPronto}>   {item.item_commands_nameProduct} <Text style={estilos.textPronto}></Text></Text>
                            <Text style={estilos.text}>   {item.item_commands_id}</Text><View style={estilos.add}>
                                <Feather style={estilos.max} name="plus-square" size={25} color="black"/>
                            <Text style={estilos.textCount}>   {item.item_commands_id}</Text>
                                <Feather style={estilos.minus} name="minus-square" size={25} color="black"/></View>
                        </View>
                    </TouchableOpacity>
                );
            }}
            /> 
            </View>
        </ScrollView> 
        
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={addProduct}
          style={estilos.touchableOpacityStyle}>
          <Feather name="plus-circle" size={90} color="#131f"/>
        </TouchableOpacity>
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
      }

});
export default DetailsCommands;
