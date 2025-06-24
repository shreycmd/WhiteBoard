"use client";
import React, { use, useEffect, useRef, useState } from "react";
//@ts-ignore
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
//@ts-ignore
import Checklist from "@editorjs/checklist";
import EditorjsList from "@editorjs/list";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FILE } from "../../dashboard/_component/FileList";
const rawdoc = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
  ],
  version: "2.8.1",
};
const Editor = ({
  onsaveTrigger,
  fileId,
  filed,
}: {
  onsaveTrigger: any;
  fileId: any;
  filed: FILE;
}) => {
  const ref = useRef<EditorJS | null>(null);
  const updatedocument = useMutation(api.files.UpdateDoc);
  useEffect(() => {
    filed && initeditor();
  }, [filed]);
  useEffect(() => {
    console.log("triggervalue", onsaveTrigger);
    onsaveTrigger && onSaveDocument();
  }, [onsaveTrigger]);
  const [doc, setdoc] = useState(rawdoc);
  const initeditor = () => {
    const editor = new EditorJS({
      /**
       * Id of Element that should contain Editor instance
       */ tools: {
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        header: {
          //@ts-ignore
          class: Header,
          shortcut: "CMD+SHIFT+H",
        },
        List: {
          //@ts-ignore
          class: EditorjsList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
      },
      holder: "editorjs",
      data: filed.document ? JSON.parse(filed.document) : doc,
    });
    ref.current = editor;
  };
  const onSaveDocument = () => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
          updatedocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          });
        })
        .then(
          (res) => {
            toast("Document Updated");
          },
          (e) => {
            toast("Server Error");
          }
        )
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  };
  return (
    <div>
      <div id="editorjs" className="ml-20"></div>
    </div>
  );
};

export default Editor;
