import React from "react";
import EmptyIcon from "../assets/icons/blank.svg";

interface TeamCardProps {
  img?: string;
  name?: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ img, name }) => {
  return (
    <div className="w-full text-sm p-2 rounded-lg bg-white shadow-light flex items-center gap-4 cursor-pointer">
      <img src={img || EmptyIcon} alt="empty" className="w-7 h-7 rounded-full" />
      <p className={`${!name && "text-secondary-foreground"}`}>{name ? name : "Empty"}</p>
    </div>
  );
};

export default TeamCard;
