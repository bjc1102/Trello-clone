import { atom, selector } from "recoil";

export interface ITodo {
    id:number;
    text:string;
}
interface IToDoProps  {
    [key: string]:ITodo[];
    //키가 string value가 string[]을 가진다는 것을 표현
}
export const toDoState = atom<IToDoProps>({
    key:"todo",
    default:{
        "To Do":[],
        Doing:[],
        Done:[],
    }
})