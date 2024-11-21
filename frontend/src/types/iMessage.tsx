export interface IMessage{
    _id:string,
    chatId:string,
    sender:string,
    seend:string[],
    createdAt:Date,
    isUnsend:boolean,
    isDeleteForMe:boolean,
    type:"doc"|"message"|"img"|"poll"|"video"|"voice",
    isReplay:boolean,
    Replay?:{
        _id:string,
        sender:string,
        type:"doc"|"message"|"img"|"poll"|"video"|"voice",  
        content:"string"
    }
    content:string
    
}