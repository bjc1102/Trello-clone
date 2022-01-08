import React, {useRef} from 'react'
import { useForm } from 'react-hook-form'
import {Droppable} from "react-beautiful-dnd"
import DragabbleCard from './DragabbleCard'
import styled from 'styled-components'
import { ITodo, toDoState } from '../atom'
import { useSetRecoilState } from 'recoil'

interface IBoardProps {
    toDos:ITodo[];
    boardId:string;
}

interface IAreaProps {
    draggingFromThisWith:boolean
    isDraggingOver:boolean
}

interface IForm {
    toDo:string
}

function Board({toDos, boardId}:IBoardProps) {
    const {
        register,
        setValue,
        handleSubmit
    } = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState)
    const onValid = ({toDo}:IForm) => {
        const newToDo = {
            id:Date.now(),
            text: toDo,
        }
        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId]:[newToDo, ...allBoards[boardId]]
            }
        })
        setValue("toDo", "")
    }

    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo", {required:true})}type={"text"} placeholder={`Add task on ${boardId}`}></input>
            </Form>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) => (
                <Area 
                    isDraggingOver={snapshot.isDraggingOver}
                    draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}>
                    {toDos.map((todo, index) => (
                    <DragabbleCard key={todo.id} index={index} toDoId={todo.id} toDoText={todo.text}/>
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

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`