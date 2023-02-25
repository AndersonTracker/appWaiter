import React from "react";
import CreateWaiter from "./src/paginas/createWaiter/CreateWaiter";
import Login from "./src/paginas/login/Login";
import ResetPasswordWaiter from "./src/paginas/resetPassword/ResetPasswordWaiter";
import HomeComandas from "./src/paginas/home/telaComanda/HomeComandas";
import DetailsCommands from "./src/paginas/home/telaComanda/DetailsCommands";
import MenuHomeProduct from "./src/paginas/home/menuProduct.js/MenuHomeProduct";
import ProductLunchs from "./src/paginas/home/pagesProducts/productLunchs/ProductLunchs";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import 'localstorage-polyfill'; 

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{title:"", headerTransparent:true, headerShown: false}}/>
      <Stack.Screen name="CreateWaiter" component={CreateWaiter} options={{title:"", headerTransparent:true, headerShown: false}}/>
      <Stack.Screen name="ResetPassword" component={ResetPasswordWaiter} options={{title:"", headerTransparent:true, headerShown: false}}/>
      <Stack.Screen name="HomeComandas" component={HomeComandas} options={{title:"", headerTransparent:true, headerShown: false}}/>
      <Stack.Screen name="DetailsCommands" component={DetailsCommands} options={{title:"", headerTransparent:true, headerShown: false}}/>
      <Stack.Screen name="MenuHomeProduct" component={MenuHomeProduct} options={{title:"", headerTransparent:true, headerShown: false}}/>
      <Stack.Screen name="ProductLunchs" component={ProductLunchs} options={{title:"", headerTransparent:true, headerShown: false}}/>
      
    </Stack.Navigator>
  );
}

export default function App() {
  return (<>
    <StatusBar hidden={true}/>
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>      
  </>
  );
}
