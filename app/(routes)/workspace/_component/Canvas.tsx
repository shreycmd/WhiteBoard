"use client";
import React, { useEffect, useState } from "react";
import { MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "../../dashboard/_component/FileList";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);

function Canvas({
  onsaveTrigger,
  fileId,
  filed,
}: {
  onsaveTrigger: any;
  fileId: any;
  filed: FILE;
}) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();

  const updateWhiteboard = useMutation(api.files.updateWhiteboard);
  useEffect(() => {
    onsaveTrigger && saveWhiteboard();
  }, [onsaveTrigger]);
  const saveWhiteboard = () => {
    updateWhiteboard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteBoardData),
    }).then((resp) => console.log(resp));
  };
  return (
    <div style={{ height: "670px" }}>
      {filed && (
        <Excalidraw
          theme="light"
          initialData={{
            elements: filed?.whiteboard && JSON.parse(filed?.whiteboard),
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
}

export default Canvas;
