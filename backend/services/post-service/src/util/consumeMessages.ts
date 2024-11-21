import userSchema, { UserDocument } from "../model/userSchema";
import proccesData from "../service/proccesData";




const consumeMessages = () => {
  proccesData<UserDocument>("User-Topic", "user-group", userSchema); //for user
};

export default consumeMessages
