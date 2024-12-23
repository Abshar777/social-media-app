import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import LabelWithInput from "../../components/ux/labelWithInput";
import Alert from "../../components/ui/alert";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema, loginSchemaType } from "../../lib/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { SetUser } from "../../state/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { login } from "@/api/auth";


function Login() {
  const [err, setErr] = useState<string | undefined>();
  const dispatch = useDispatch();
  const navigete = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.Auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const submit: SubmitHandler<loginSchemaType> = async (data) => {
    try {
      const { data: payload } = await login(data.email,data.password);
      toast.success(" successfully logined");
      dispatch(SetUser(payload.data));
      localStorage.setItem("__accessToken",payload.token);
      reset();
    } catch (err) {
      interface data {
        message: string;
      }
      const { message } = (err as AxiosError).response?.data as data;
      setErr(message);
      toast.error("login failed", { description: message });
    }
  };
  const errorfn: SubmitErrorHandler<loginSchemaType> = (err) => {
    Object.values(err).forEach((error) => {
      setErr(error.message);
      if (error) toast.error(error.message);
    });
  };

  useEffect(() => {
    if (userInfo) navigete("/home");
  }, [userInfo]);

  return (
    <div className="flex px-5 h-lvh md:h-lvh items-center justify-center py-12">
      <form onSubmit={handleSubmit(submit, errorfn)}>
        <div className="grid gap-5 text-start">
          <h1 className="text-3xl font-bold">Login</h1>
          {err && <Alert cont={err} />}
          <p className="text-balance w-full  md:text-sm text-[.8rem] text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="grid gap-4 mt-2">
          <LabelWithInput
            i={1}
            type="email"
            label="email"
            register={register}
            name="email"
            placeholder="m@example.com"
            error={errors.email}
          />
          <LabelWithInput
            i={2}
            type="password"
            label="password"
            register={register}
            name="password"
            placeholder="*********"
            error={errors.password}
          />
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
          <Button
            variant="outline"
            className=" transition-all ease-in duration-[.5]  w-full"
          >
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/auth/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Login;
