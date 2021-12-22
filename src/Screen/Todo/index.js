// import { AppRegistry } from 'react-native';
// import Todos from './Todos';
// AppRegistry.registerComponent('MyAppName', () => Todos);

import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, TextInput} from 'react-native';
// import {Text} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {Appbar, Button} from 'react-native-paper';
import Todo from "./Todo";

const Todos = () => {
  const [todo, setTodo] = useState('testToDo');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const ref = firestore().collection('todos');

  // // loading to do
  // useEffect(() => {
  //   return ref.onSnapshot(querySnapshot => {
  //     const list = [];
  //     querySnapshot.forEach(doc => {
  //       const {title, complete} = doc.data();
  //       list.push({
  //         id: doc.id,
  //         title,
  //         complete,
  //       });
  //     });
  //
  //     setTodos(list);
  //
  //     if (loading) {
  //       // setLoading(false);
  //       return null;
  //     }
  //   });
  // }, []);

  // adding to do
  const addTodo = async () => {
    console.log(todo);
    await ref
      .add({
        title: todo,
        complete: false,
      })
      .then(() => {
        console.log('Todo added!');
      })
      .catch((err) => {
        console.log(err)
      });
    setTodo('');
  }

  // if (loading) {
  //   return null; // or a spinner
  // }

  return (
    <>
      <Appbar>
        <Appbar.Content title={'TODOs List'}/>
      </Appbar>
      {/*<ScrollView style={{flex: 1}}>*/}
      {/*  <Text>List of TODOs!</Text>*/}
      {/*</ScrollView>*/}
      <FlatList
        style={{flex: 1}}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Todo {...item} />}
      />
      <View>
        <Text>To Do content here..</Text>
        <TextInput label={'New Todo'} value={todo} onChangeText={setTodo}/>
      </View>
      <Button onPress={() => addTodo()}>Add TODO</Button>
    </>
  );
}

export default Todos;
