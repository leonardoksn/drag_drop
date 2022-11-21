import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { DragDropContext, DragUpdate, DropResult } from 'react-beautiful-dnd'
import { Column } from './Column'
import { initialData } from './resources/data'

export const Apenas = () => {

    const [state, setState] = useState(initialData)

    const onDragStart = () => {
        document.body.style.color = 'orange'
        document.body.style.transition = 'background-color 0.2s ease'
    }
    const onDragUpdate = (update: DragUpdate) => {

        const { destination } = update;
        const opacity = destination
            ? destination.index / Object.keys(state.tasks).length : 0

        document.body.style.backgroundColor = `rgba(153,141,217,${opacity})`
    }


    const onDragEnd = (result: DropResult) => {
        document.body.style.color = 'inherit'

        const auxState = state;
        const { destination, source, draggableId } = result;
        console.log( { destination, source, draggableId })
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const start = auxState.columns[source.droppableId];
        const finish = auxState.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

            const newState = {
                ...auxState,
                columns: {
                    ...auxState.columns,
                    [newColumn.id]: newColumn
                }
            }
            console.log(newState)
            setState(newState)
            return
        }

        const startTasksIds = Array.from(start.taskIds)
        startTasksIds.splice(source.index, 1)
        
        const newStart = {
            ...start,
            taskIds: startTasksIds,
        };

        const finishTaskIds = finish.taskIds
        finishTaskIds.splice(destination.index, 0, draggableId)

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        }

        const newState = {
            ...auxState,
            columns: {
                ...auxState.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }

        setState(newState)
    }
    return (
        <DragDropContext
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
        >
            <Flex

            >{
                    state.columnOrder.map((columnId) => {
                        const column = state.columns[columnId]
                        const tasks = column.taskIds.map(taksId => state.tasks[taksId])
                        return <Column
                            key={column.id}
                            column={column}
                            tasks={tasks}
                        />
                    })

                }</Flex>
        </DragDropContext>
    )
}
