import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { Tooltip } from "@nextui-org/tooltip";
import React from "react";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  content?: string;
};

const Modal = ({ children, description, title, trigger, className }: Props) => {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DialogTrigger className={className} asChild>
              {trigger}
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className={`bg-zinc-900 `}>{title}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogOverlay className="bg-white/15 backdrop-blur-md" />
      <DialogContent className=" bg-[#171717] rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-normal">{title}</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground/50">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
