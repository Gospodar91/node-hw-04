class BaseError extends Error{
    constructor(name,status,message){
        super(message)
        this.name=name;
        this.status=status;
    }
    
    
}
class UnAuthorized extends BaseError{
    constructor(message){
    super("Email or password wrong",401,message)
}

}
class Conflict extends BaseError{
    constructor(message){
    super("Conflict error",409,message)
}

}
module.exports={
UnAuthorized,
Conflict
}
