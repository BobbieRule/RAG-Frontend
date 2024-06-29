import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Loader } from "@/components/ui/loader";
import { Message } from "./components/chat/message-container";

import { useToast } from "@/components/ui/use-toast";

import * as server from "./server";

import {
  USER_V1_GENERATE_DOCUMENT,
  USER_V1_RETRIEVE_DOCUMENTS,
} from "./data/constants/api-routes";

import { MessageI } from "@/types/message";
import { DocumentI } from "@/types/document";

const inputInitialState = { query: "", document: "" };

function App() {
  const [input, setInput] = useState({ ...inputInitialState });
  const [documents, setDocuments] = useState<DocumentI[]>([]);
  const [messages, setMessages] = useState<MessageI[]>([]);
  const [typing, setTyping] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleSubmit = async () => {
    setGenerating(true);

    setMessages((prev) => [
      ...prev,
      { text: input.query, user: true, error: false },
    ]);

    const { status, message, data } = await server.post(
      USER_V1_GENERATE_DOCUMENT,
      input
    );

    setGenerating(false);
    typeWriterEffect(status ? data.response : message);
    setInput({ ...input, query: "" });
  };

  const typeWriterEffect = (response: string) => {
    let index = 0;
    setTyping(true);

    setMessages((prev) => [...prev, { text: "", user: false, error: false }]);

    const interval = setInterval(() => {
      setMessages((prev) => {
        const updatedMessages = [...prev];

        updatedMessages[updatedMessages.length - 1].text +=
          response.charAt(index);

        return updatedMessages;
      });

      index++;

      if (index === response.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 50);
  };

  const getDocuments = async () => {
    setLoading(true);

    const { status, message, data } = await server.get(
      USER_V1_RETRIEVE_DOCUMENTS
    );

    if (status) {
      setDocuments(data);
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: message,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-screen flex flex-col justify-between p-8">
      <div className="border-2 p-2">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-1">
          Select a topic
        </h4>

        <ToggleGroup
          variant="outline"
          type="single"
          onValueChange={(newValue) =>
            setInput((prev) => ({ ...prev, document: newValue }))
          }
        >
          {documents.length
            ? documents.map((document) => (
                <ToggleGroupItem
                  key={document.id}
                  value={document["file-name"]}
                  aria-label="Toggle"
                >
                  {document.title}
                </ToggleGroupItem>
              ))
            : null}
        </ToggleGroup>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4 border-2">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Messages
        </h4>

        {messages.map((msg, index) => (
          <Message msg={msg} key={index} />
        ))}

        {generating && (
          <div className="flex justify-start">
            <div className="bg-gray-300 text-black p-3 rounded-lg max-w-sm">
              Generating...
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center py-4 space-x-2">
        <Textarea
          placeholder="Type your message..."
          className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input.query}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, query: e.target.value }))
          }
          disabled={typing || generating}
        />

        <Button
          onClick={handleSubmit}
          disabled={!input.query || !input.document || typing || generating}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default App;
