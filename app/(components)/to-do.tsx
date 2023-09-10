"use client";
import { useState } from "react";
import TodoType from "../(types)/todoType";
import {
  Box,
  FormControl,
  Heading,
  Input,
  Button,
  Flex,
  TableContainer,
  Table,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
  TableCaption,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

export default function Todo() {
  const [tasks, setTask] = useState<string>("");
  const [isTrue, setIsTrue] = useState(false);
  const [fullTask, setFullTask] = useState<TodoType[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [newItem, setNewItem] = useState();

  const task1: TodoType = {
    task: tasks,
    mellisecond:
    new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
  };
  function taskFunction() {
    if (tasks != "") {
      setFullTask([task1, ...fullTask]);
      setIsTrue(false);
    } else {
      setIsTrue(true);
    }
    setTask("");

  }

  function Delete(items: any) {
    const newTask = fullTask.filter((item: any) => item.task != items);
    console.log(newTask);
    setFullTask(newTask);
  }

  const updateHandler = (item: any,index:number) => {
    setTask(item);
     setNewItem(index)
    setIsUpdate(true);
  };

  const editHandler = () => {
    const newArray = fullTask.map((item,index) => {
      if (newItem == index) {
        const updatedTodo: TodoType = {
          task: tasks,
          mellisecond:      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),

         
        };
        return updatedTodo;
      } else {
        return fullTask;
      }

    });
    setFullTask(newArray);
    setIsUpdate(false);
    setTask("")
  };

  return (
    <>
      {isTrue && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>An Error Occured!</AlertTitle>
          <AlertDescription>Due to you don't enter any task</AlertDescription>
        </Alert>
      )}
      <Box
        bg="#f0f0f0"
        w="60%"
        m="auto"
        pt="50px"
        mt="30px"
        mb="50px"
        textAlign={"center"}
      >
        <Heading mt="-20px" color={"blue"} fontWeight={"hairline"}>
          Simple To Do List App
        </Heading>
        <br />
        <hr />
        <Flex justify="center" mt="50px" gap="10px">
          <FormControl w="50%">
            <Input
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter Your Task"
              value={tasks}
            />
          </FormControl>

          {!isUpdate ? (
            <Button bg="blue" color={"white"} onClick={() => taskFunction()}>
              Add Task
            </Button>
          ) : (
            <Button
              bg="teal"
              color={"white"}
              onClick={() => editHandler()}
            >
              Update
            </Button>
          )}
        </Flex>
        <br />
        <hr />
        <Box textAlign={"center"} overflow={"scroll"} h="300px" mt="50px">
          <TableContainer ml="30px" mr="20px">
            <Table variant="striped" bg="blue.100">
              <TableCaption>Here You See Your Entered Task</TableCaption>

              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Task</Th>
                  <Th>Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {fullTask.map((item: any, index: any) => {
                  return (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{item.task}</Td>
                      <Td>{item.mellisecond}</Td>
                      <Td display="flex" gap={10}>
                        <Button
                          onClick={() => Delete(item.task)}
                          fontWeight={"bolder"}
                          bg="red"
                          w="30px"
                          h="40px"
                          color="white"
                        >
                          X
                        </Button>

                        <Button
                          onClick={() => updateHandler(item.task,index)}
                          fontWeight={"bolder"}
                          bg="teal"
                          w="30px"
                          h="40px"
                          color="white"
                        >
                          Edit
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

// const month = new Date().getMonth() + 1;
//   const year = new Date().getFullYear();
//   const date = new Date().getDate();
//   const hours = new Date().getHours()
//   const minutes = new Date().getMinutes();
//   const second = new Date().getSeconds();
//   const fullDate =
//     year +
//     "/" +
//     month +
//     "/" +
//     date +
//     " " +
//     hours +
//     ":" +
//     minutes +
//     ":" +
//     second;
