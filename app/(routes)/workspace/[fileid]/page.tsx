"use client";
import React, { use, useEffect, useState } from "react";
import Workspacehead from "../_component/Workspacehead";

import dynamic from "next/dynamic";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "../../dashboard/_component/FileList";
import { Id } from "@/convex/_generated/dataModel";

const Editor = dynamic(() => import("../_component/Editor"), { ssr: false });
const Canvas = dynamic(() => import("../_component/Canvas"), { ssr: false });

const page = ({ params }: { params: Promise<{ fileid: string }> }) => {
  const { fileid } = use(params);
  const convex = useConvex();
  const [name, setName] = useState<string>();
  const [filed, setfiled] = useState<FILE>();
  const getfiledata = async () => {
    const res = await convex.query(api.files.getfileByID, {
      _id: fileid as Id<"files">,
    });
    console.log(res);
    setfiled(res);
  };
  useEffect(() => {
    filed ? setName(filed?.fileName) : setName("FileName");
    fileid && getfiledata();
  });
  const [trigger, settrigger] = useState(false);
  return (
    <div>
      <Workspacehead onSave={() => settrigger(!trigger)} name={name} />
      <div className=" grid grid-cols-1 md:grid-cols-2">
        <div className="h-screen">
          {filed && (
            <Editor onsaveTrigger={trigger} fileId={fileid} filed={filed} />
          )}
        </div>
        <div className="h-screen">
          {filed && (
            <Canvas onsaveTrigger={trigger} fileId={fileid} filed={filed} />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
