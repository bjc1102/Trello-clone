import React from 'react';
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd"
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atom';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`

const Board = styled.div`
  padding-top: 30px;
  padding: 20px 30px;
  background-color: ${props=>props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`
const Card = styled.div`
  border-radius: 5px;
  background-color: ${props => props.theme.cardColor};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`


function App() {
  const [toDos, setToDos]  = useRecoilState(toDoState)
  const onDragEnd = ({ draggableId ,destination, source}:DropResult) => {
    if(!destination) return;
    setToDos(oldToDos => {
      const toDosCopy = [...oldToDos]
      // 1) Delete item on source.index
      console.log("delete item on ", source.index)
      console.log(toDosCopy)
      toDosCopy.splice(source.index, 1);
      console.log("delete item")
      console.log(toDosCopy)

      // 2) 새로운 위치에 다시 넣어준다
      console.log("put back", draggableId, " on ", destination.index)
      toDosCopy.splice(destination?.index, 0, draggableId)
      console.log(toDosCopy)
      return toDosCopy
    })
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId='one'>
            {(provided) => 
              <Board ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map((todo, index) => (
                <Draggable key={todo} draggableId={todo} index={index}>
                  {(provided) => (
                  <Card 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}>
                      {todo}
                  </Card>
                  )}
                </Draggable>
                ))}
                {provided.placeholder}
              </Board>}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
