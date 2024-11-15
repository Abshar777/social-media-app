
interface userType  {
    name: string;
    email:string;
    password:string;
    img?:string;
    isBlock?:boolean;
    isVerify?:boolean;
    isAdmin?:boolean
}

export default userType