import {DragDropContext, DropResult} from "react-beautiful-dnd"
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atom';
import Board from './Components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`

function App() {
  const [toDos, setToDos]  = useRecoilState(toDoState)
  const onDragEnd = (info:DropResult) => {
    console.log(info);
    const {destination, source, draggableId} = info
    if(!destination) return;
    if(source.droppableId === destination?.droppableId) {
      // same board
      setToDos((allBoard) => {
        const boardCopy = [...allBoard[source.droppableId]]
        // const y = { x: ["a","b","c","d"]}  ===>>  y["x"]  ====> ['a', 'b', 'c', 'd']
        // toDosobject에서 droppableId의 value값을 가져온다
        boardCopy.splice(source.index, 1)
        boardCopy.splice(destination.index, 0, draggableId)
        //자르고 붙인다
        return {
          ...allBoard,
          [source.droppableId]:boardCopy
          // console.log([source.droppableId]) 잘 이해가 되지 않았다 array인데 키값으로 string을 받는다는게..
        }
      })
    }
    if(destination.droppableId !== source.droppableId) {
      //cross board
      setToDos((allBoard) => {
        const sourceBoard = [...allBoard[source.droppableId]]
        const destinationBoard = [...allBoard[destination.droppableId]]

        sourceBoard.splice(source.index, 1)
        destinationBoard.splice(destination.index, 0, draggableId)

        return {
          ...allBoard,
          [source.droppableId]:sourceBoard,
          [destination.droppableId]:destinationBoard
          //js가 To_Do 등 key값으로 바꿔줌
        }
      })
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId, index) => 
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]}/>
          )}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
