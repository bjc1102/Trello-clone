import React from 'react'
import {Draggable} from "react-beautiful-dnd"
import styled from 'styled-components'

interface ICardProps {
    toDoId:number
    toDoText:string
    index:number
}

function DragabbleCard({toDoId, index, toDoText}:ICardProps) {
    return (
        <Draggable key={toDoId} draggableId={toDoId+""} index={index}>
            {(provided, snapshot) => (
            <Card
                isDragging={snapshot.isDragging}
                ref={provided.innerRef} 
                {...provided.draggableProps} 
                {...provided.dragHandleProps}>
                {toDoText}
            </Card>
            )}
      </Draggable>
    )
}

export default React.memo(DragabbleCard)
//DragabbleCard가 prop이 변하지 않았다면 다시 렌더링하지 말라고 말함

const Card = styled.div<{isDragging:boolean}>`
  border-radius: 5px;
  background-color: ${props => props.theme.cardColor};
  border: 1px solid ${props => props.isDragging ? props.theme.boardColor : "transparent"};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  box-shadow: ${props=> props.isDragging ? "0px 2px 5px rgba(0,0,0, 0.5)" : "none"};
`
