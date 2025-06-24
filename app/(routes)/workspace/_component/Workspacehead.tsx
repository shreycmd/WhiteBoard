import Image from "next/image";
import React from "react";
import logo from "@/public/logo.jpeg";
import { Button } from "@/components/ui/button";
import { SaveIcon, Share2 } from "lucide-react";
const Workspacehead = ({ onSave, name }: any) => {
  return (
    <div className="p-3 border-b-2 flex items-center justify-between">
      {" "}
      <div className="flex gap-2 items-center">
        <Image src={logo} alt="logo" height={40} width={40} />
        <h2>{name}</h2>
      </div>
      <div>
        <Button
          variant="outline"
          className="bg-yellow-400 hover:bg-yellow-600"
          onClick={() => onSave()}
        >
          <SaveIcon />
          Save
        </Button>
        <Button variant="outline" className="bg-sky-400 hover:bg-blue-600">
          <Share2 />
          Share
        </Button>
      </div>
    </div>
  );
};

export default Workspacehead;
