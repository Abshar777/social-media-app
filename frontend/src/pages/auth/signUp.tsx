import { useEffect, useState } from "react";
import Alert from "../../components/ui/alert";
import LabelWithInput from "../../components/ux/labelWithInput";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signUpSchema, signUpSchemaType } from "../../lib/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import  { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { SetUser } from "../../state/auth/authSlice";
import { register as signUp } from "@/api/auth";


const SignUp = () => {
  const [err, setErr] = useState<string | undefined>();
  const navigete=useNavigate()
  const dispatch=useDispatch<AppDispatch>();
  const {userInfo}=useSelector((state:RootState)=>state.Auth)
  const {register,handleSubmit,reset,formState: { isSubmitting, errors },setError,} = useForm<signUpSchemaType>({resolver: zodResolver(signUpSchema),});
  const submit: SubmitHandler<signUpSchemaType> = async (data) => {
    setErr(undefined); 
    try {
     const {data:payload,}= await signUp(data.email,data.password,data.firstName,data.lastName)
      toast.success("Account created successfully");
      dispatch(SetUser(payload.data))
      localStorage.setItem("__accessToken",payload.token);
      reset();
    } catch (err) {
      interface data{message:string}
      const {message}=(err as AxiosError).response?.data as data
      setError("email",{ type:"custom",})
      setErr(message);
      toast.error("login failed", { description:message });
    }
  };
  const errorfn: SubmitErrorHandler<signUpSchemaType> = (err) => {
    Object.values(err).forEach((error, i) => {
      i == 0 && setErr(error.message);
      if (error) toast.error(error.message);
    });
  };
  useEffect(()=>{
    if(userInfo ){ navigete('/home');}
  },[userInfo])
  return (
   <>
 
   <div className="flex h-lvh md:h-lvh items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-5 text-start">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          {err && <Alert cont={err} />}
          <p className="text-balance text-[0.8rem] text-start text-muted-foreground">
            Enter your information to create an account
          </p>
        </div>
        <form onSubmit={handleSubmit(submit, errorfn)} className="grid gap-5">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <LabelWithInput
                register={register}
                i={1}
                type="text"
                name="firstName"
                label="first name"
                error={errors.firstName}
                placeholder="Max"
              />
              <LabelWithInput
                register={register}
                i={2}
                type="text"
                name="lastName"
                label="last name"
                error={errors.lastName}
                placeholder="Robinson"
              />
            </div>
            <LabelWithInput
              i={3}
              type="email"
              label="email"
              register={register}
              name="email"
              placeholder="m@example.com"
              error={errors.email}
            />
            <LabelWithInput
              i={4}
              type="password"
              label="password"
              register={register}
              name="password"
              error={errors.password}
            />
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create an account
            </Button>
            <Button
              type="button"
              onClick={() => {
                setError("email", {
                  type: "custom",
                  message: "this is a custom error message",
                });
                console.log(errors);
              }}
              variant="outline"
              className="w-full"
            >
              Sign up with GitHub
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/login" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
   </>
  );
};

export default SignUp;
