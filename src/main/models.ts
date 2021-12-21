import { PersistentUnorderedMap	, PersistentVector } from "near-sdk-core";

type Address = string;

/*State can be: 
0: Off - In Test
1: On - In Production
*/
export enum State{
   off,
   on
}

/**
 * A message sent to another account
 */
 @nearBindgen
 export class Message {
    public sender: Address;
    public text: string;

    constructor(_sender: Address, _text: string){
       this.sender=_sender;
       this.text=_text;
    }
 }

 @nearBindgen
 export class User_Profile {
   private profileId: string;
   private userName:string;
   private publicDescription:string;
   private age:i16;
   private messages: PersistentVector<Message>;

   constructor(_profileId:string, _userName?:string, _publicDescription?:string, _age?:i16){
      this.profileId=_profileId;
      this.messages=new PersistentVector<Message>("msg");
      this.userName=_userName?_userName:"";
      this.publicDescription=_publicDescription?_publicDescription:"";
      this.age=_age?_age:-1;
   }

   public getUserName():string{
      return this.userName;
   }

   public setUserName(_userName:string):void{
      this.userName=_userName;
   }

   public getPublicDescription():string{
      return this.publicDescription;
   }
   public setPublicDescription(_publicDescription:string):void{
      this.publicDescription=_publicDescription;
   }
   public getAge():i16{
      return this.age;
   }

   public setAge(_age:i16):void{
      this.age=_age;
   }
   public addMessage(message: Message):void{
      this.messages.push(message);
   }
   public getMessages():PersistentVector<Message>{
      return this.messages;
   }

 }


export let profiles: PersistentUnorderedMap	<string, User_Profile>=new PersistentUnorderedMap	<string, User_Profile>("prfl");