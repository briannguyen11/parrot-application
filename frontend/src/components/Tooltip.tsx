import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import QuestionIcon from "../assets/icons/question.svg";

export interface TooltipProps {
  text: string;
  title: string;
}

export function Tooltip({ text, title }: TooltipProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <img
          src={QuestionIcon}
          alt="question mark"
          className="h-4 w-4 hover:cursor-pointer"
        />
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-sm text-secondary">{text}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
