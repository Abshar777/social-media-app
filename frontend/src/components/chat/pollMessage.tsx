import { motion } from "framer-motion";
import { useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { cn } from "@/lib/utils";
import {Progress} from "@nextui-org/progress";
import {Button} from "@nextui-org/button";

const PollMessage = ({ own = false }: { own: boolean }) => {
  const colors = [{ from: "#FF4B2B", to: "#D4145A" }];
  const index = Math.floor(Math.random() * colors.length);
  const [selectOne, setselectOne] = useState(true);

  return (
    <motion.div
      id={"aa"}
      className={`w-full px-[.3rem] py-[.2rem] flex items-center justify-${
        !own ? "start" : "end"
      }`}
    >
      <motion.div
        layout
        style={{
          background: `${
            own &&
            `linear-gradient(to right, ${colors[index].from}, ${colors[index].to})`
          }`,
        }}
        className={` ${
          !own && "bg-zinc-800"
        }  cursor-pointer  w-fit min-w-[15rem] px-[.5rem] py-[.3rem] flex flex-col justify-start gap-1 items-start ${
          own ? "rounded-l-xl" : "rounded-r-xl"
        } rounded-lg`}
      >
        <motion.div
          layout
          className={`flex w-full px-2 flex-col items-start  py-2  relative gap-2`}
        >
          <h1 className={` font-bold tracking-wider  text-[1rem]`}>
            what is your ambition
          </h1>
          <p id="title" className={`opacity-50 text-xs flex gap-1`}>
            {!selectOne ? (
              <>
                <div className="flex">
                  <i className="ri-checkbox-circle-fill"></i>
                  <i className="ri-checkbox-circle-fill -ml-[.30rem] stroke-black stroke-2 "></i>
                </div>
                select one or more
              </>
            ) : (
              <>
                <i className="ri-checkbox-circle-fill"></i>
                select one
              </>
            )}
          </p>
          <div className="w-full flex-1 flex-col flex">
            <div className="w-full flex flex-col">
              <div className="w-full flex   justify-between">
                <div className="check  flex gap-2">
                  <Checkbox
                    radius="full"
                    color={`primary`}
                    classNames={{
                      icon: cn("border-white outline-none stroke-white"),
                      label: cn(""),
                    }}
                    size="sm"
                  >
                    Option
                  </Checkbox>
                </div>
                <div className="flex gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-5 h-5 rounded-full border-2 border-black bg-violet-500"></div>
                    <div className="w-5 h-5 rounded-full border-2 border-black bg-violet-500"></div>
                    <div className="w-5 h-5 rounded-full border-2 border-black bg-violet-500"></div>
                  </div>
                  <p className="text-xs">3</p>
                </div>
              </div>
              <div className="w-full px-3 relative">
              <Progress aria-label="Loading..." value={60} className="max-w-md mt-2"/>
              </div>
            </div>
          </div>
          <div className="w-full flex-1 flex-col flex">
            <div className="w-full flex flex-col">
              <div className="w-full flex   justify-between">
                <div className="check  flex gap-2">
                  <Checkbox
                    radius="full"
                    color={`primary`}
                    classNames={{
                      icon: cn("border-white outline-none stroke-white"),
                      label: cn(""),
                    }}
                    size="sm"
                  >
                    Option
                  </Checkbox>
                </div>
                <div className="flex gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-5 h-5 rounded-full border-2 border-black bg-violet-500"></div>
                    <div className="w-5 h-5 rounded-full border-2 border-black bg-violet-500"></div>
                    <div className="w-5 h-5 rounded-full border-2 border-black bg-violet-500"></div>
                  </div>
                  <p className="text-xs">3</p>
                </div>
              </div>
              <div className="w-full px-3 relative">
              <Progress aria-label="Loading..." value={60} className="max-w-md mt-2"/>
              </div>
            </div>
          </div>
          <div className="w-full flex  px-3">
            <Button radius="md" className={`flex-1 mt-1 ${own&&"bg-white/20"}`}>View Votes</Button>
          </div>
          <div className="flex w-full justify-end ">
            <div className="flex gap-2 mt-1">
              <p className="text-white/40 text-xs ">11:00pm</p>
              <i className="ri-check-double-line text-violet-500"></i>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PollMessage;
