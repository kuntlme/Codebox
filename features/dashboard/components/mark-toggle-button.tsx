"use client";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { toggleStarById } from "../actions";

interface MarkedForRevisionProps {
  id: string;
  title: string;
  markedForRevision: boolean;
  onLoading: Dispatch<SetStateAction<boolean>>;
}

const MarkedToggleButton = ({
  id,
  title,
  markedForRevision,
  onLoading,
}: MarkedForRevisionProps) => {
  const handleClick = async () => {
    onLoading(true);
    try {
      await toggleStarById(id);
      toast.success(
        `${markedForRevision ? "Removed" : "Marked"} Star of "${title}"`
      );
    } catch (error) {
      toast.error(
        `${markedForRevision ? "Remove" : "Mark"} Star of "${title}" failed`
      );
    } finally {
      onLoading(false);
    }
  };
  return (
    <Button
      onClick={handleClick}
      variant={"outline"}
      className="flex justify-start items-center w-full"
    >
      <Star
        size={14}
        className={
          markedForRevision
            ? "text-gray-400 -ml-1 mr-2"
            : "fill-yellow-500 text-yellow-500 mr-2"
        }
      />
      {markedForRevision ? "Remove from Star" : "Mark as Star"}
    </Button>
  );
};

export default MarkedToggleButton;
