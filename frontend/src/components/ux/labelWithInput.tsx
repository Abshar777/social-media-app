import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../ui/input";
import { FieldError, useForm } from "react-hook-form";

interface prop {
  i: number;
  type: string;
  name: string;
  label: string;
  error?: string | undefined | FieldError;
  placeholder?: string;
  register: ReturnType<typeof useForm<any>>["register"];
}

const LabelWithInput = ({
  i,
  type,
  name,
  label,
  placeholder,
  error,
  register,
}: prop) => {
  const [show, setShow] = useState<boolean>(false);
  const [Type, setType] = useState<string>(type);

  return (
    <div className="grid gap-2">
      <Label htmlFor={`input${i}`}>
        {label} <span className="text-red-700">*</span>
      </Label>

      <div className="flex items-center justify-end">
        {" "}
        <Input
          {...register(`${name}`)}
          id={`input${i}`}
          type={Type}
          placeholder={placeholder}
          className={`${error&&"errInput"}`}
        />
        {type == "password" && (
          <i
            onClick={() => {
              setShow(!show);
              Type == "password" ? setType("text") : setType("password");
            }}
            className={`cursor-pointer ${
              show ? "ri-eye-close-line" : "ri-eye-2-line"
            } absolute me-2`}
          ></i>
        )}
      </div>
    </div>
  );
};

export default LabelWithInput;
