import userSchema, { UserDocument } from "../model/userSchema";
import proccesData from "../service/proccesData";




const consumeMessages = () => {
  proccesData<UserDocument>("Post-Topic-User", "user-group", userSchema); //for user from post service
  proccesData<UserDocument>("Story-topic", "user-group-story", userSchema); //for user from story service
};

export default consumeMessages
