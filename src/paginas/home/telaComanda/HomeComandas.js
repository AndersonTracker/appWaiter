import React, {useLayoutEffect, useState} from "react";
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Variaveis from "../../../components/global/Variaveis";
import { Feather } from 'react-native-vector-icons';
import CreateCommands from "./CreateCommands";

function HomeComandas({navigation}) {
    
    const [waiter, setWaiter] = React.useState(localStorage.getItem("nome"));
    const [comandass, setComandass] = useState(comandas);
    const [table, setTable] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    var comandas = [
        {
            commands_id: '',
            commands_table: '',
            commands_client_name: '',
            commands_waiter_name: '',
            commands_ready: '',
            commands_delivered: '',
            commands_paid: '',
            commands_total: '',
            commands_date: ''
        }
    ]

    useLayoutEffect( () => {
        const waiterNome = localStorage.getItem("nome");
        Variaveis.name = waiterNome;
        setWaiter(waiterNome);
        fetch(Variaveis.urlBase + ":8080/webapp/rest/CommandsForWaiter/" + Variaveis.name).then(response => response.json()).then(
      data => {
        data.sort(function (a, b) {
            if (a.commands_ready < b.commands_ready) {
                return 1;
            }
            if (a.commands_ready > b.commands_ready) {
              return -1;
            }
            if(a.commands_delivered > b.commands_delivered){
                return 1;
            }if(a.commands_delivered < b.commands_delivered){
                return -1;
            }
            return 0;
        });
        comandas = data;
        setComandass(data);
      }
    )
      },[]);

      function clickHandler(){
        setModalVisible(true);
    }

    function logOut(){
        localStorage.clear();
        navigation.navigate('Login');
    }

    function onChangeTable(value){
        setTable(value);
        if(value != ''){
            fetch(Variaveis.urlBase + ":8080/webapp/rest/Commands/" + value).then(response => response.json()).then(
                data => {
                data.sort(function (a, b) {
                    if (a.commands_ready < b.commands_ready) {
                        return 1;
                    }
                    if (a.commands_ready > b.commands_ready) {
                        return -1;
                    }
                    if(a.commands_delivered > b.commands_delivered){
                        return 1;
                    }if(a.commands_delivered < b.commands_delivered){
                        return -1;
                    }
                    return 0;
                });
                  comandas = data;
                  setComandass(data);
                  console.log(comandas);
                }
            )
        }else{
            fetch(Variaveis.urlBase + ":8080/webapp/rest/CommandsForWaiter/" + waiter).then(response => response.json()).then(
                data => {
                  data.sort(function (a, b) {
                      if (a.commands_ready < b.commands_ready) {
                          return 1;
                      }
                      if (a.commands_ready > b.commands_ready) {
                        return -1;
                      }
                      if(a.commands_delivered > b.commands_delivered){
                          return 1;
                      }if(a.commands_delivered < b.commands_delivered){
                          return -1;
                      }
                      return 0;
                  });
                  comandas = data;
                  setComandass(data);
                }
              )
        }  
    }

    function CommandsDetails(value){
        navigation.navigate('DetailsCommands', { 
            commands_id: value.commands_id, 
            commands_table: value.commands_table,
            commands_client_name: value.commands_client_name,
            commands_waiter_name: value.commands_waiter_name, 
        });
    }

    function close(){
        onChangeTable('');
        setModalVisible(false);
    }

    return <View>
        <CreateCommands navigation={navigation} isVisible={modalVisible} fechar={() => {close()}}></CreateCommands>
      
        <LinearGradient style={estilos.Gradient}
        // Background Linear Gradient
        colors={["#af1f", "#0a3203"]}>
                <Text style={estilos.titulo}>Sistema de comandas do garçom</Text>
                <Text style={estilos.subTitulo}>logado como: {waiter}</Text>  
                <TouchableOpacity style={estilos.botaoLogOut} onPress={logOut}> 
                    <Text style={estilos.textBotao}>log-out</Text>
                </TouchableOpacity>
        <View style={estilos.filter} >
            <Feather style={estilos.search} name="search" size={25} color="black"/>
            <TextInput style={estilos.InputFilterTable} keyboardType='numeric' value={table} onChangeText={onChangeTable} placeholder=" numero da mesa"/>   
        </View>
        </LinearGradient>
        <ScrollView>
        <View>
            <FlatList style={estilos.viewTable}
            data={comandass}
            keyExtractor={item => item.commands_id}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => {CommandsDetails(item)}}> 
                        <View style={estilos.item}>
                            <Text style={item.commands_ready == true && item.commands_delivered == false ? estilos.textPronto : estilos.text}>mesa: {item.commands_table} <Text style={item.commands_ready == true && item.commands_delivered == false ? estilos.textPronto : estilos.text}>    {item.commands_client_name}</Text></Text>
                            <Text style={estilos.text}>{item.commands_waiter_name}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }}
            /> 
            </View>
        </ScrollView> 
        
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={clickHandler}
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
        paddingTop: "5%",
        backgroundColor: "#1711",
        width: "100%",
        height: "96%",
    },
    item: {
        borderRadius: 2,
        borderColor: "black",
        borderWidth: 1,
        width: "100%",
    },
    text: {
        backgroundColor: "white",
        fontSize: 20,
    },
    textPronto: {
        backgroundColor: "green",
        fontSize: 20,
    },
    touchableOpacityStyle: {
        position: 'absolute',
        marginTop: "160%",
        marginLeft: "70%",
        borderRadius: 60,
        borderColor: "black",
      },
      floatingButtonStyle: {
        resizeMode: 'contain',
        width: 80,
        height: 80,
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

});
export default HomeComandas;
