import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const sameTitle = tasks.find(task => task.title === newTaskTitle)
    if(!sameTitle){
      const newTask: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks((oldTasks) => [...oldTasks, newTask]);
    }else{
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          {text: "OK"}
        ]
      );
    }
    return
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const foundItem = updatedTasks.find(item => item.id === id);

    if(!foundItem)
      return;

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter(task => task.id !== id);

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {text: "Não"},
        {text: "Sim", onPress: () => setTasks(updatedTasks)}
      ]
    );
    return;
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const taskToBeUpdated = updatedTasks.find(task => task.id === taskId);

    if(!taskToBeUpdated)
     return;
    
    taskToBeUpdated.title = taskNewTitle;

    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        editTask={handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})