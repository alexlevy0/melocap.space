import { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, FlatList } from "react-native";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import { GraphQLError } from "graphql";
const client = generateClient<Schema>();

const TodoList = () => {
  const dateTimeNow = new Date();
  const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);
  const [errors, setErrors] = useState<GraphQLError>();

  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => {
        setTodos([...items]);
      },
    });

    return () => sub.unsubscribe();
  }, []);

  const createTodo = async () => {
    try {
      await client.models.Todo.create({
        content: `${dateTimeNow.getUTCMilliseconds()}`,
      });
    } catch (error: unknown) {
      if (error instanceof GraphQLError) {
        setErrors(error);
      } else {
        throw error;
      }
    }
  };

  if (errors) {
    return <Text>{errors.message}</Text>;
  }

  const renderItem = ({ item }: { item: Schema["Todo"]["type"] }) => (
    <TodoItem {...item} />
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={styles.listItemSeparator} />
        )}
        ListEmptyComponent={() => <Text>The todo list is empty.</Text>}
        style={styles.listContainer}
      ></FlatList>
      <Button onPress={createTodo} title="Create Todo" />
    </View>
  );
};

const TodoItem = (todo: Schema["Todo"]["type"]) => (
  <View style={styles.todoItemContainer} key={todo.id}>
    <Text
      style={{
        ...styles.todoItemText,
        textDecorationLine: todo.isDone ? "line-through" : "none",
        textDecorationColor: todo.isDone ? "red" : "black",
      }}
    >
      {todo.content}
    </Text>
    <Button
      onPress={async () => {
        await client.models.Todo.delete(todo);
      }}
      title="Delete"
    />
    <Button
      onPress={() => {
        client.models.Todo.update({
          id: todo.id,
          isDone: !todo.isDone,
        });
      }}
      title={todo.isDone ? "Undo" : "Done"}
    />
  </View>
);

const styles = StyleSheet.create({
  todoItemContainer: { flexDirection: "row", alignItems: "center", padding: 8 },
  todoItemText: { flex: 1, textAlign: "center" },
  listContainer: { flex: 1, alignSelf: "stretch", padding:8 },
  listItemSeparator: { backgroundColor: "lightgrey", height: 2 },
});

export default TodoList;