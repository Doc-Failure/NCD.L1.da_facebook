import {Context, storage} from "near-sdk-as"
import {profiles, Message, User_Profile, State} from "../models"


const MAX_DESCRIPTION_LENGTH :i32 =255;
const MAX_BOOKPAGE_LENGTH :u64 =1200;

//I used this flag just for educational purpose
storage.set("isProduction", false);

export function setProduction(_isProduction: bool): void{
  storage.set("isProduction", _isProduction);
}

export function isProduction(): bool{
  let result : bool = storage.getPrimitive("isProduction", false);
  return result;
}

//_profileId should't be used in production.
//this is project is for educational purpose, so i let the variable here
export function createProfile(_userName:string, _age:i16, _publicDescription?:string, _profileId?:string): string{
  assert( (!storage.getPrimitive("isProduction", false) || !(_profileId!=null && _profileId.length>0)), "Is not possible to pass _profileId as a parameter in production");
  
  let profileId=_profileId!=null && _profileId.length>0 ? _profileId : Context.sender;
  assert(!profiles.contains(profileId), "Profile already exist!");
  assert(_userName.length>0, "Username is mandatory");
  assert(_age>14, "Age must be greater than 14");
  profiles.set(profileId,new User_Profile(_userName, _publicDescription, _age));
    
  return "profile created";
}

export function getProfile(_profileId?:string): User_Profile | null{
  assert(!(_profileId==null || _profileId.length==0), "Please, insert a valid profileId");
  if(_profileId)
    return profiles.get(_profileId);
  else
    return null
}

export function getProfiles(): Array<User_Profile>{
  return profiles.values();
}

export function addMessage(receiver: string, message: string): void {
  assert(profiles.contains(receiver), "Receiver does not exists!");
  let arrayMessages : Array<Message>= new Array<Message>();
  
  let receiversMessages: User_Profile | null=profiles.get(receiver);
  if(receiversMessages!=null)
    receiversMessages.addMessage(new Message(Context.sender,message))
}

export function getMessages(receiver: string): Array<Message>{
  assert(profiles.contains(receiver), "Receiver does not exists!");
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