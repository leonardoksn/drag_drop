import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { ITasks } from './resources/data'

export const Task = ({ task, index }: { task: ITasks, index: number }) => {
    return (
        <Draggable
            draggableId={task.id}
            index={index}
        >
            {
                (provided, snapshot) => (
                    <Flex
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        sx={
                            {
                                backgroundColor: `${snapshot.isDragging ? 'lightgreen' : "#fff"}`,
                            }
                        }

                        border="1px solid lightgray"
                        bg="#fff"
                        p="8px"
                        mb="8px"
                        rounded="md"
                    >
                        <Box 
                                                {...provided.dragHandleProps}

                        w="20px"
                        h="20px"
                        bg="orange"
                        rounded="md"
                        mr="8px"
                        />
                        {task.content}</Flex>
                )
            }

        </Draggable>
    )
}
