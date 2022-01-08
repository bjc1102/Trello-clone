import React, {useRef} from 'react'
import {Droppable} from "react-beautiful-dnd"
import DragabbleCard from './DragabbleCard'
import styled from 'styled-components'

interface IBoardProps {
    toDos:string[];
    boardId:string;
}

interface IAreaProps {
    draggingFromThisWith:boolean
    isDraggingOver:boolean
}

function Board({toDos, boardId}:IBoardProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const onClick = () => {
        inputRef.current?.focus();
        setTimeout(() => {inputRef.current?.blur()}, 5000)
    }

    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <input ref={inputRef} placeholder='grab me'/>
            <button onClick={onClick}>Click me</button>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) => (
                <Area 
                    isDraggingOver={snapshot.isDraggingOver}
                    draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}>
                    {toDos.map((todo, index) => (
                    <DragabbleCard key={todo} index={index} todo={todo}/>
                    ))} {provided.placeholder}
                </Area>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default Board

const Wrapper = styled.div`
  padding-top: 30px;
  padding-top: 10px;
  background-color: ${props=>props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`
const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 20px;
    font-size: 18px;
`

const Area = styled.div<IAreaProps>`
    background-color: ${props=> props.isDraggingOver ? "#dfe6e9" : props.draggingFromThisWith ? "#b2bec3" : "transparent"};
    padding: 20px;
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
`