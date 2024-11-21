import userSchema, { UserDocument } from "../model/userSchema";
import proccesData from "../service/proccesData";




const consumeMessages = () => {
  proccesData<UserDocument>("User-Topic", "user-group", userSchema); // for user from user-service
  proccesData<UserDocument>("Post-Topic-User", "post-user-group", userSchema); //for user from post service
};

export default consumeMessages
