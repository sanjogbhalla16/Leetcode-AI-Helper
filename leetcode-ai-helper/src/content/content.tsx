import React, { useEffect, useRef } from "react"; //creates a reference to a DOM element.
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useChromeStorage from "@/hooks/useChromeStorage";
import { Card, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatBoxProps {
  visible: boolean;
  context: {
    problemStatement: string;
  };
  apikey: string;
}

const ChatBox: React.FC<ChatBoxProps> = () => {
  const [value, setValue] = useState("");

  return <div> </div>;
};

const ContentPage: React.FC = () => {
  const [chatboxExpanded, setChatboxExpanded] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null | undefined>(null);
  //Retrieves the Problem Statement we are using meta data tag for that
  const metaDescriptionElement = document.querySelector(
    'meta[name="description"]'
  );
  const problemStatement = metaDescriptionElement?.getAttribute(
    "content"
  ) as string;

  const ref = useRef<HTMLDivElement>(null);

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      ref.current &&
      e.target instanceof Node &&
      !ref.current.contains(e.target)
    ) {
      console.log("Clicked outside the box!");
    }
  };

  //when the page first renders we check that the user has clicked outside the box

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    const loadChromeStorage = async () => {
      if (!chrome) return;
      const { getKeyModel } = await useChromeStorage();
      const { apiKey } = await getKeyModel();
      setApiKey(apiKey);
    };
    loadChromeStorage();
  }, []);

  return (
    <div
      ref={ref}
      className="dark z-50"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
      }}
    >
      {apiKey ? (
        chatboxExpanded && (
          <Card className="mb-5">
            <CardContent className="h-[500px] grid place-items-center">
              <div className="grid place-items-center gap-4">
                <p className="text-center">
                  Please configure the extension before using this feature.
                </p>
                <Button
                  onClick={() =>
                    chrome.runtime.sendMessage({ action: "openPopup" })
                  }
                >
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <ChatBox
          visible={chatboxExpanded}
          context={{ problemStatement }}
          apikey={apiKey}
        />
      )}
      <div className="flex justify-end">
        <Button
          size="icon"
          onClick={() => setChatboxExpanded(!chatboxExpanded)}
        >
          <Bot />
        </Button>
      </div>
    </div>
  );
};

export default ContentPage;
