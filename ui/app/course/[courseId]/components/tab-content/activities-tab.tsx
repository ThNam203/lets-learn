import { Button } from "@/lib/shadcn/button";
import { Plus } from "lucide-react";
import React from "react";

interface Props {}
export default function ActivitiesTab({}: Props) {
  return (
    <div>
      <Button>
        <Plus size={16} />
        Create
      </Button>
    </div>
  );
}
