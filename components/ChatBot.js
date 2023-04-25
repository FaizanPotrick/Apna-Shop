import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Image, ScrollArea, Code } from "@mantine/core";
import { TextInput, ActionIcon } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";

function ChatBot() {
  const [opened, { open, close }] = useDisclosure(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const Input_Chat = async () => {
    if (!input) return;
    setMessages((prev) => [
      ...prev,
      {
        position: "right",
        value: input,
      },
    ]);
    const message = input;
    setInput("");
    try {
      const { data } = await axios.post("/api/chatbot", { value: message });
      setMessages((prev) => [
        ...prev,
        {
          position: "left",
          value: data,
        },
      ]);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="ChatBot"
        overlayProps={{ opacity: 0.5, blur: 4 }}
        position="right"
        zIndex={2000}
      >
        <ScrollArea
          sx={{
            height: "85vh",
            marginBottom: 20,
          }}
        >
          {messages.map((msg, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: msg.position === "right" ? "end" : "start",
                  alignItems: "end",
                  flexDirection: "row-reverse",
                  margin: "0px 0px 5px 0px",
                }}
                key={index}
              >
                <Code
                  block
                  style={{
                    backgroundColor: "#eee",
                    maxWidth: "300px",
                    borderTopRightRadius: 8,
                    borderBottomLeftRadius: msg.position === "right" ? 8 : 0,
                    borderBottomRightRadius: msg.position === "right" ? 0 : 8,
                    borderTopLeftRadius: 8,
                  }}
                >
                  {msg.value}
                </Code>
              </div>
            );
          })}
        </ScrollArea>
        <TextInput
          size="md"
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              color={"cyan"}
              variant="filled"
              onClick={Input_Chat}
            >
              <IconArrowRight size="1.1rem" stroke={1.5} />
            </ActionIcon>
          }
          placeholder="Ask me anything"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          sx={{
            position: "fixed",
            bottom: 20,
            left: 20,
            right: 20,
          }}
        />
      </Drawer>
      <Image
        src="chatbot.png"
        alt="logo"
        mah={60}
        maw={60}
        pos={"fixed"}
        bottom={10}
        right={10}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
          boxShadow: "0 0 0 2px #fff, 0 0 0 4px #000",
          backgroundColor: "#fff",
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={open}
      />
    </>
  );
}

export default ChatBot;
