import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { ReactNode } from "react";

export function CustomTooltip({
  triggerSlot,
  contentSlot,
}: {
  triggerSlot: ReactNode;
  contentSlot: ReactNode;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{triggerSlot}</TooltipTrigger>
        <TooltipContent className="max-w-md border text-primary bg-primary-foreground">
          {contentSlot}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
