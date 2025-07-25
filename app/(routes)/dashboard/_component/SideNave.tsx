import { Archive, ChevronDown, Flag, Github } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/Filelistcontext";
import SideNavtop, { TEAM } from "./SideNavtop";
import SideNavbottom from "./SideNavbottom";

function SideNav() {
  const { user }: any = useKindeBrowserClient();
  const createFile = useMutation(api.files.createfile);
  const [activeTeam, setActiveTeam] = useState<TEAM | any>();
  const convex = useConvex();
  const [totalFiles, setTotalFiles] = useState<Number>();
  const { fileList_, setFileList_ } = useContext(FileListContext);
  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);
  const onFileCreate = (fileName: string) => {
    console.log(fileName);
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteboard: "",
    }).then(
      (resp) => {
        if (resp) {
          getFiles();
          toast("File created successfully!");
        }
      },
      (e) => {
        toast("Error while creating file");
      }
    );
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFile, {
      teamId: activeTeam?._id,
    });
    console.log(result);
    setFileList_(result);
    setTotalFiles(result?.length);
  };

  return (
    <span
      className=" h-screen 
     w-72 borde-r border-[1px] p-6
    flex flex-col
    "
    >
      <span className="flex-1">
        <SideNavtop
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </span>

      <span>
        <SideNavbottom totalFiles={totalFiles} onFileCreate={onFileCreate} />
      </span>
    </span>
  );
}

export default SideNav;
