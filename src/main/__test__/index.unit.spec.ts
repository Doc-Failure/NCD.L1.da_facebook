import * as contract from "../assembly";

describe("Create a new Profile",()=>{
  it("Age test", ():void => {
    expect((): void => { contract.createProfile("Goofy", 11, "A random description", "address-0") }).toThrow("Age must be greater than 14");
    expect((contract.createProfile("Micky", 16, "A random description", "address-1"))).toBe("profile created");
  });
  it("Username test", ():void => {
    expect((): void => { contract.createProfile("", 16, "A random description", "address-2") }).toThrow("Username is mandatory");
  });
  it("Create a new profile", () => {
    expect(contract.createProfile("Goofy", 16, "A random description", "address-3")).toBe("profile created");
    expect((): void => { contract.createProfile("Micky", 16, "A random description", "address-3") }).toThrow("Profile already exist!");
  });

  it("Profile Id", ():void => {
    contract.setProduction(true);
    expect((): void => { contract.createProfile("Goofy", 16, "A random description", "address-3") }).toThrow("Is not possible to pass _profileId as a parameter in production");
    expect((contract.createProfile("Goofy", 16, "A random description", ""))).toBe("profile created");

    contract.setProduction(false);
    expect((contract.createProfile("Goofy", 16, "A random description", "address-4"))).toBe("profile created"); 
  });
  it("Retrieve profiles list", () => {
    expect(() => {
        contract.getProfiles();
    }).not.toThrow();
  }); 
  it("Retrieve single profile", () => {
    //Testing get single profile without parameter, the function should returns an error
    expect((): void => { contract.getProfile("")}).toThrow("Please, insert a valid profileId");
    expect(() => {contract.getProfile("address-4")}).not.toThrow();
  }); 
})

describe("Messages test",()=>{
  it("Add Message", ():void => {
    expect((): void => { contract.addMessage("address-8", "A random message") }).toThrow("Receiver does not exists!");
    expect(contract.createProfile("Goofy", 16, "A random description", "address-8")).toBe("profile created");
    expect((): void => {contract.addMessage("address-8", "A random message")}).not.toThrow();
  });
  it("Get Messages", ():void => {
    expect((): void => { contract.getMessages("address-7") }).toThrow("Receiver does not exists!");
    expect(contract.createProfile("Goofy", 16, "A random description", "address-7")).toBe("profile created");
    expect((): void => {contract.getMessages("address-7")}).not.toThrow();
  });

})