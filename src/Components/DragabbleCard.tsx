import React from 'react'
import {Draggable} from "react-beautiful-dnd"
import { useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { toDoState } from '../atom'

interface ICardProps {
    toDoId:number
    boardId:string
    toDoText:string
    index:number
}

function DragabbleCard({toDoId, boardId, index, toDoText}:ICardProps) {

    const setToDos = useSetRecoilState(toDoState)
    const DeleteTodo = () => {
        setToDos(allBoard => {
            const DeleteToDo = allBoard[boardId].findIndex(toDo => toDo.id === toDoId)
            return {
                ...allBoard,
                [boardId]:[...allBoard[boardId].slice(0, DeleteToDo), ...allBoard[boardId].slice(DeleteToDo+1)],
            }
        })
    }

    return (
        <Draggable key={toDoId} draggableId={toDoId+""} index={index}>
            {(provided, snapshot) => (
            <Card
                isDragging={snapshot.isDragging}
                ref={provided.innerRef} 
                {...provided.draggableProps} 
                {...provided.dragHandleProps}>
                {toDoText}
                <DeleteButton onClick={DeleteTodo}>-</DeleteButton>
            </Card>
            )}
      </Draggable>
    )
}

export default React.memo(DragabbleCard)
//DragabbleCard가 prop이 변하지 않았다면 다시 렌더링하지 말라고 말함

const Card = styled.div<{isDragging:boolean}>`
  border-radius: 150px;
  background-color: ${props => props.theme.cardColor};
  border: 1px solid ${props => props.isDragging ? props.theme.boardColor : "transparent"};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  box-shadow: ${props=> props.isDragging ? "0px 2px 5px rgba(0,0,0, 0.5)" : "none"};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DeleteButton = styled.button`
    border: 1px solid ${({theme}) => theme.boardColor};
    background-color : transparent;
`
