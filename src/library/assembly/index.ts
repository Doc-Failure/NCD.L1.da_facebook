import {Context} from "near-sdk-as"
import {profiles, Message, User_Profile} from "../models"

const MAX_DESCRIPTION_LENGTH :i32 =255;
const MAX_BOOKPAGE_LENGTH :u64 =1200;

//_profileId should't be used in production.
export function createProfile(_userName?:string, _publicDescription?:string, _age?:i16, _profileId?:string): string{
  let profileId=_profileId?_profileId:Context.sender;
  assert(!profiles.contains(profileId), "Profile already exist!");
  profiles.set(profileId,new User_Profile(_userName, _publicDescription, _age));
    
  return "profile created";
}

export function getProfile(_profileId?:string): User_Profile | null{
  assert(_profileId, "Please, insert a valid profileId");
  if(_profileId)
    return profiles.get(_profileId);
  else
    return null
}

export function getProfiles(): Array<User_Profile>{
  //assert(profiles.contains(Context.sender), "Profile already exist!")
  let result: Array<User_Profile>=new Array<User_Profile>();

  result = profiles.values();

  return result;
}

export function test(receiver: string): bool{
  return profiles.contains(receiver);
}

export function addMessage(receiver: string, message: string): number {
  //assert(receiver===Context.sender, "You can not post a message on your's profile!")
  assert(!profiles.contains(receiver), "Receiver does not exists!")
  let arrayMessages : Array<Message>= new Array<Message>();
  
  let receiversMessages: User_Profile | null=profiles.get(receiver);
  let size:number =0;
  if(receiversMessages!=null)
    size = receiversMessages.addMessage(new Message(Context.sender,message))
    
  return size;
}

export function getMessage(receiver: string): Array<Message>{
  assert(!profiles.contains(receiver), "Receiver does not exists!")
  let profile: User_Profile | null=profiles.get(receiver);

  let result: Array<Message>=new Array<Message>();

  if(profile!=null){
    const resources = profile.getMessages(); 
    for(let i = 0; i < resources.length; i++) {
      result[i] = resources[i];
    }
  }
  return result;
}
