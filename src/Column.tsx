import { Box, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { IColumn, IInitialData, ITasks } from './resources/data'
import { Task } from './Task';
import { Droppable } from 'react-beautiful-dnd'
interface IColumnProps {
    column: IColumn;
    key: string | number;
    tasks: ITasks[];
}

export const Column = ({
     column,
    tasks }: IColumnProps) => {
    return (
        <Flex
            w="220px"
            m="8px"
            border="1px solid lightgray"
            rounded="md"
            flexDirection="column"
        >
            <Heading
                as="h3"
                p="8px"
            > {column.title}</Heading>

            <Droppable droppableId={column.id}>

                {(provided,snapshot) => (
                    <Box
                        flexGrow="1"
                       transition="background-color 0.2s ease"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        p="8px"
                        minH="100px"
                        backgroundColor = {`${snapshot.isDraggingOver ? 'skyblue' : "#fff"}`}

                    >
                        {tasks.map((task, index) => (
                            <Task
                                key={task.id}
                                task={task}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </Box>
                )}

            </Droppable>

        </Flex>
    )
}
