import { storage, Context, PersistentMap, PersistentVector } from "near-sdk-as"
import {Books,BookInformation, Rate, RateEnum, Message} from "../models"

const MAX_DESCRIPTION_LENGTH :i32 =255;
const MAX_BOOKPAGE_LENGTH :u64 =1200;
let messages: PersistentMap<string, Array<Message>>=new PersistentMap<string, Array<Message>>("msg");
// return the string 'hello world'
export function helloWorld(): string {
    return 'hello world'
  }

/**
 * 
 * @param isbn 
 * @param name 
 * @param description 
 * @param numpage 
 * @param author 
 * @param datepublished 
 * @param editions 
 */
export function AddBook(
        isbn:string,
        name:string,
        description:string,
        numpage:u64,
        author:string,
        datepublished:string,
        editions:u64
):void{
  assert(isbn.length>0 ,"the ISBN is required")
  assert(name.length>0,"the name is required")
  assert(description.length>0  && description.length< MAX_DESCRIPTION_LENGTH,"the description is required or you exceed the character's number")
  assert(numpage>0 && numpage< MAX_BOOKPAGE_LENGTH,"the numpage is required or you exceed the page's number")
  assert(author.length>0 ,"the author is required")
  assert(datepublished.length>0 ,"the datepublished is required")
  assert(editions >0 ,"the editions is required")

   Books.push(
     new BookInformation(Books.length,Context.sender,
      isbn,name,description,numpage,author,datepublished,editions,Context.blockTimestamp)
   );
}

export function getBooks():Array<BookInformation>{
  const result = new Array<BookInformation>(Books.length);
  for (let i =0; i< Books.length; i++){
    result[i] = Books[i];
  }
  return result;
}

export function getBook(id :i32): BookInformation{
  assert(Books.length >0,"we haven't any Books")
  assert(id<= (Books.length-1),"we haven't that Book")
  return Books[id];
}

export function getNBooks(): u64 {
  return Books.length;
}

export function addMessage(receiver: string, message: string): string {
  let arrayMessages : Array<Message>= new Array<Message>();
  /* arrayMessages.push(new Message(Context.sender,"messaggio bellaccio"));
  arrayMessages.push(new Message(Context.sender,"messaggio aaa"));
  arrayMessages.push(new Message(Context.sender,"messaggio bbb")); */
  if(messages.contains(Context.sender)){
    let receiversMessages=messages.get(receiver);
    if(receiversMessages!=null)
      arrayMessages=receiversMessages
   /*  messages.set(new Message(Context.sender, message)); */
  }
  arrayMessages.push(new Message(Context.sender,message))
  /* if(messages.contains(receiver))
    messages.set(receiver, new Array<Message>());
    
  let receiver_messages :Array<Message>|null=messages.get(receiver);
  if(receiver_messages!=null)
    receiver_messages.push(new Message(Context.sender,"messaggio bellaccio")); */
  //arrayMessages?.push(new Message(Context.sender, message));
  //storage.set(key, value)

  messages.set(receiver, arrayMessages);
  return Context.sender;
  
}

export function getMessage(receiver: string): Array<Message> | null{
  //let message = new Message( Context.sender,"vuototto fessacchiotto!");
  let result = messages.get(receiver);
  return result;
}
 
/* export function getMessage():Array<Message>{
  const result: Array<Message> = new Array<Message>(3);
  for (let i =0; i< 3; i++){
    let asd =messages.get(Context.sender);
    result[i] = new Message(Context.sender, "äaaaaa");
  }
  return result;
} */

/* export function getComplaints(): Array<CitizenComplaint> {
  const result = new Array<CitizenComplaint>(complaints.length);
  for (let i = 0; i < complaints.length; i++) {
    result[i] = complaints[i];
  }
  return result;
} */
/*
 -----Things that we can add in the future-------------

export function rate(id:i32,valor:i32):BookInformation{
  assert(id < Books.length,"we haven't that Book")
  let book = Books[id];
  let key = Context.sender+id.toString()
  book.rates.push(new Rate(key,valor))
  /*Books[id]=book;
  Books.replace(<i32>id,book)
  return "Book rated";
  return book
}

export function getRateBook(id :i32): Array<Rate>{
  assert(Books.length >0,"we haven't any Books")
  assert(id<= (Books.length-1),"we haven't that Book")
  const result = new Array<Rate>();
  for(let i = 0; i < Books[id].rates.length; i++) {
    result[i] = Books[id].rates[i];
  }
  return result;
}
*/