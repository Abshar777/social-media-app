import { useDispatch } from "react-redux";
import { LogoutUser, SetUser } from "../state/auth/authSlice";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../state/store";
import { AxiosError } from "axios"
import { toast } from "sonner"


//  home and other protected route
export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/users/check");
        dispatch(SetUser(data.user));
      } catch (error) {
        navigate("/auth/login");
        dispatch(LogoutUser());
      }
    })();
  });
};


// only route for login and sign-up
export const useAuthCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/users/check");
        dispatch(SetUser(data.user));
        navigate('/home')
      } catch (error) {
        dispatch(LogoutUser());
      }
    })();
  });
}



// export const useLogout = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   useEffect(() => {
//     (async () => {
//         try {
//           await axios.post("/api/logout");
//           dispatch(LogoutUser());
//           navigate("/auth/login")
//           toast.success("logout succefully")
//         } catch (error) {
//           interface data {
//             message: string;
//           }
//           const { message } = (error as AxiosError).response?.data as data;
//           toast.error("logout failed", { description: message });
//         }
//       })()
//   })
// }