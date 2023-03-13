import React, {useLayoutEffect, useState} from "react";
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from 'react-native-vector-icons';
import Variaveis from "../../../../components/global/Variaveis";
import ModalPrice from "../../../../components/modais/ModalPrice";

function ProductLunchs({navigation, route}) {
    
    const [itemCommands, setItemCommands] = React.useState(comandas);
    const [lunchs, setLunchs] = useState(lunch);
    const [contador, setCont] = React.useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [waiter, setWaiter] = React.useState(localStorage.getItem("nome"));
    const { commands_id, commands_client_name, commands_table } = route.params;

    var lunch = [
      {
        lunch_id: '',
        lunch_name: '',
        lunch_category: '',
        lunch_unitAmount: '',
        lunch_url_image: '',
      }
    ]
  
    var comandas = [
        {
            item_commands_idCommand: '',
            item_commands_category: '',
            item_commands_idProduct: '',
            item_commands_nameProduct: '',
            item_commands_quantity: '',
            item_commands_unitAmount: '',
            item_product_url: '',
        }
    ]
    
    function adicionarNaCommands(){
      var array = itemCommands;
      array.map(function(elemento){
        if(elemento.item_commands_quantity > 0){
          console.log(elemento.item_commands_quantity);
          fetch(Variaveis.urlBase + ":8080/webapp/rest/ItemCommands",
          {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ["item_commands_idCommand"]: JSON.stringify(commands_id),
              ["item_commands_category"]: elemento.item_commands_category,
              ["item_commands_idProduct"]: elemento.item_commands_idProduct, 
              ["item_commands_nameProduct"]: elemento.item_commands_nameProduct,
              ["item_commands_quantity"]: elemento.item_commands_quantity, 
              ["item_commands_unitAmount"]: elemento.item_commands_unitAmount,
            })
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
        }
      });
    }


    useLayoutEffect( () => {
        const waiterNome = localStorage.getItem("nome");
        let arrs = [];
        setWaiter(waiterNome);
        fetch(Variaveis.urlBase + ":8080/webapp/rest/lunch").then(response => response.json()).then(
            data => {
                lunch = data;
                let arr = [];
                lunch.map(function(elemento, índice, array){
                  arr = {
                  "item_commands_idCommand": JSON.stringify(commands_id), 
                  "item_commands_category": elemento.lunch_category, 
                  "item_commands_idProduct": elemento.lunch_id,
                  "item_commands_nameProduct": elemento.lunch_name,
                  "item_commands_note": '',
                  "item_commands_quantity": JSON.stringify(0),
                  "item_product_url": elemento.lunch_url_image,
                  "item_commands_unitAmount": JSON.stringify(elemento.lunch_unitAmount)}
                  arrs.push(arr);
              });
            }
            ).finally(response => {
              setItemCommands(arrs);
            });
      },[]);

    function logOut(){
        localStorage.clear();
        navigation.navigate('Login');
    }

    function kgLunch(value){
      let arrs = itemCommands;
      let arr = arrs.find(x => x.item_commands_idProduct === value);
      if(arr.item_commands_quantity > 0){
        return;
      }else{
        setModalVisible(true);
      }
    }

    function ValorKg(valor){
      var index; 
      let arrs = itemCommands;
      let arr = arrs.find(x => x.item_commands_nameProduct === "kg");
      arr.item_commands_unitAmount = valor;
      arr.item_commands_quantity = 1;
      var result = arrs.filter(function(el) {
        return el.item_commands_nameProduct == "kg";
      });
        
      for(var elemento of result){
        index = arrs.indexOf(elemento);    
        arrs.splice(index, 1);
      }
      arrs.splice(index, 0, arr);
      setCont(arr.item_commands_quantity);
      setItemCommands(arrs);
      console.log(arr);
      setModalVisible(false);
    }
    
    function max(value, name){
      console.log(name);
      var index; 
      let arrs = itemCommands;
      let arr = arrs.find(x => x.item_commands_idProduct === value);
      if(name == "kg"){
        kgLunch(value);
        return;
      }
      arr.item_commands_quantity++;
      var result = arrs.filter(function(el) {
        return el.item_commands_idProduct == value;
      });
        
      for(var elemento of result){
        index = arrs.indexOf(elemento);    
        arrs.splice(index, 1);
      }
      arrs.splice(index, 0, arr);
      setCont(arr.item_commands_quantity);
      setItemCommands(arrs);
    }

    function min(value){
      var index; 
      let arrs = itemCommands;
      let arr = arrs.find(x => x.item_commands_idProduct === value);
      if(arr.item_commands_quantity <= 0){
        return;
      }else{

      arr.item_commands_quantity--;
      var result = arrs.filter(function(el) {
        return el.item_commands_idProduct == value;
      });
        
      for(var elemento of result){
        index = arrs.indexOf(elemento);    
        arrs.splice(index, 1);
      }
      arrs.splice(index, 0, arr);
      setCont(arr.item_commands_quantity);
      setItemCommands(arrs);
      }
    }

    return <View>
      <ModalPrice isVisible={modalVisible} adicionar={(valor) => {ValorKg(valor)}} fechar={() => {setModalVisible(false)}}></ModalPrice>
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
        <Text style={estilos.DetailCommands}>Mesa: {JSON.stringify(commands_table)}  Cliente: {commands_client_name}</Text>
        <View style={estilos.viewCenter} >
          <ScrollView>
            <View>
              <FlatList
                style={estilos.viewTable}
                data={itemCommands}
                keyExtractor={item => item.item_commands_idProduct}
                renderItem={({ item }) => {
                  return (      
                    <View style={estilos.cardProduction}>
                      <View style={estilos.rowView}>
                        <View style={estilos.cardProductionView}>
                          <Image source={{uri: Variaveis.urlBase + ":8080/images/almoco/" + item.item_product_url}} style={estilos.imageAlmoco}></Image>
                          <Text style={estilos.textImage}>{item.item_commands_nameProduct}</Text>
                        </View>
                        <View style={estilos.rowViewNumber}>
                          <TouchableOpacity onPress={() => {min(item.item_commands_idProduct)}}>
                            <Feather style={estilos.minus} name="minus-square" size={50} color="black"/>
                          </TouchableOpacity>
                          <Text style={estilos.textCount}> {item.item_commands_quantity} </Text>
                          <TouchableOpacity onPress={() => {max(item.item_commands_idProduct, item.item_commands_nameProduct)}}>
                            <Feather style={estilos.max} name="plus-square" size={50} color="black"/>
                          </TouchableOpacity>
                        </View>
                      </View>       
                    </View>                    
                  );
                }}
              /> 
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={adicionarNaCommands}
          style={estilos.touchableOpacityStyle}>
          <Feather name="check-circle" size={90} color="#131f"/>
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
    viewCenter: {
      marginTop: "2%",
      height: "100%",
      width: "100%",
    },
    cardProductionView: {
      width: "40%",
      height: "94%",
      backgroundColor: "green",
      paddingBottom: "2%",
      borderColor: "black",
      borderWidth: 1,
    },
    cardProduction: {
      width: "100%",
      height: 100,
      borderRadius: 2,
      borderColor: "black",
      borderWidth: 2,
      marginTop: 12,
    },
    viewTable: {
      width: "100%",
      height: "95%",
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
    },
    DetailCommands: {
      marginLeft: "4%",
      fontSize: 19,
      fontWeight: "bold",
    },
    rowView: {
      flexDirection: 'row',
      justifyContent: "space-between",
    },
    rowViewNumber: {
      flexDirection: 'row',
      justifyContent: "space-between",
      marginTop: "6%",
      marginRight: "5%",
    },
    minus: {
      color: "red"
    },
    max: {
      color: "green"
    },
    textCount: {
      marginTop: "3%",
      fontSize: 30,
      fontWeight: "bold",
    },
    touchableOpacityStyle: {
      position: 'absolute',
      marginTop: "160%",
      marginLeft: "70%",
      borderRadius: 60,
      borderColor: "black",
    },
});
export default ProductLunchs;