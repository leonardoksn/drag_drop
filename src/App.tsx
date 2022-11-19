import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import listApenas from './resources/index'
import { DotsSix, DotsSixVertical } from "phosphor-react";
import { Box, Button, Flex, Heading, Icon, Input, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function App() {
  const [list, setList] = useState(listApenas)
  const buttonRef: any = useRef(null)
  useEffect(() => {

  }, [list])

  return (
    <Flex
      border="1px solid red"
      w="100%"
      minH="100vh"
      justifyContent="center"
      alignContent="center"
      alignItems="center"
    >
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          let listAux = list;
          if (desI || desI === 0) {
            const [removed] = listAux.splice(srcI, 1);
            listAux.splice(desI, 0, removed)
            setList(() => [...listAux])
            buttonRef.current.disabled = false
            console.log(listAux)
          }

        }}
      >
        <Box boxShadow='2xl' rounded='2xl' minW="500px" minH="500px" m="0 auto" p="10px">
          <Heading p="10px">The List
            <Button
              isDisabled
              ref={buttonRef}
            > Send </Button>
          </Heading>


          <Text fontSize="1.2em">Reverter <Button 
          onClick={() =>{
            buttonRef.current.disabled = false
            setList((prev) => [...prev.reverse()])}
          }>X</Button></Text>

          <Droppable droppableId='droppable-1'>
            {
              (provided, snapshot) => (
                <List
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {
                    list.map((item, index) => (
                      <Draggable key={item.rua} draggableId={'draggable-' + item.rua} index={index}>
                        {(provided, snapshot) =>

                        (
                          <ListItem
                            {...provided.dragHandleProps}
                            boxShadow={`${snapshot.isDragging ? "0 0 .5rem #666" : "none"}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            fontSize="1.3em"
                            p="2"
                            mx="20px"
                            borderBottom="1px solid #b0abab"
                          >
                            <span>
                              <Icon as={DotsSixVertical} />
                            </span>
                            {item.rua} - Ordem:{index + 1}                          </ListItem>
                        )}
                      </Draggable>

                    ))
                  }
                  {provided.placeholder}
                </List>
              )
            }

          </Droppable>
        </Box>
      </DragDropContext>

     
    </Flex >
  )
}

export default App
