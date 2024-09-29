import React, { useState, useEffect } from 'react';
import { Box, VStack, HStack, Text, Heading, List, ListItem, ListIcon, Button } from '@chakra-ui/react';
import { MdCheckCircle, MdError } from 'react-icons/md';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);

  useEffect(() => {
    fetchTodos();
    fetchOverdueTasks();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const fetchOverdueTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/overdue-tasks');
      const data = await response.json();
      setOverdueTasks(data);
    } catch (error) {
      console.error('Error fetching overdue tasks:', error);
    }
  };

  return (
    <HStack spacing={8} align="start" p={5}>
      <Box flex={1}>
        <Heading size="lg" mb={4}>Todo List</Heading>
        <List spacing={3}>
          {todos.map(todo => (
            <ListItem key={todo.id}>
              <HStack>
                <ListIcon as={todo.completed ? MdCheckCircle : MdError} color={todo.completed ? "green.500" : "red.500"} />
                <Text>{todo.task}</Text>
                <Text fontSize="sm" color="gray.500">Due: {new Date(todo.deadline).toLocaleDateString()}</Text>
              </HStack>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box flex={1}>
        <Heading size="lg" mb={4}>Overdue Tasks</Heading>
        <List spacing={3}>
          {overdueTasks.map(task => (
            <ListItem key={task.id}>
              <HStack>
                <ListIcon as={MdError} color="red.500" />
                <Text>{task.task}</Text>
                <Text fontSize="sm" color="red.500">Overdue since: {new Date(task.deadline).toLocaleDateString()}</Text>
              </HStack>
            </ListItem>
          ))}
        </List>
      </Box>
    </HStack>
  );
};

export default TodoApp;