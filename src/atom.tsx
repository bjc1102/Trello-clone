import { atom, selector } from "recoil";


interface IToDoProps  {
    [key: string]:string[];
    //키가 string value가 string[]을 가진다는 것을 표현
}
export const toDoState = atom<IToDoProps>({
    key:"todo",
    default:{
        "To Do":["A" , "B" , "C"],
        Doing:[ "D" , "E", "F"],
        Done:["G"],
    }
})