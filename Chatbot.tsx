"use client";

import { useState, useRef, useEffect } from "react";
import { Button, Column, Flex, Row, Text, IconButton } from "@once-ui-system/core";
import { useRouter } from "next/navigation";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length || isGenerating) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isGenerating]);

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const textToSend = input;
    setInput("");
    setIsGenerating(true);

    const newMessages = [...messages, { role: "user", text: textToSend }];
    setMessages(newMessages);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend }),
      });

      if (!res.ok) {
        throw new Error("API Fehler");
      }

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", text: data.text }]);
    } catch (err: unknown) {
      setMessages([
        ...newMessages,
        { role: "assistant", text: "KI-Fehler: Es gab ein Problem (z.B. ungültiger API Key)." },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="primary"
        size="l"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 100,
          borderRadius: "50%",
          width: "56px",
          height: "56px",
          padding: 0,
        }}
        onClick={() => setIsOpen(true)}
      >
        <span
          style={{
            fontSize: "24px",
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          💬
        </span>
      </Button>
    );
  }

  return (
    <Column
      background="surface"
      border="neutral-medium"
      radius="l"
      shadow="m"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "350px",
        height: "500px",
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      <Row
        padding="16"
        background="brand-strong"
        horizontal="between"
        vertical="center"
        style={{ backgroundColor: "var(--brand-solid-strong)" }}
      >
        <Text variant="heading-strong-s" onBackground="neutral-strong">
          Karl's AI Assistent
        </Text>
        <IconButton size="s" variant="ghost" icon="close" onClick={() => setIsOpen(false)} />
      </Row>

        <Flex flex={1} padding="16" direction="column-reverse" gap="16" style={{ overflowY: "auto" }}>
          {isGenerating && (
            <Column gap="4" align="start">
              <Text variant="label-strong-s" onBackground="neutral-weak">
                KI
              </Text>
              <Row padding="12" radius="m" background="neutral-alpha-weak">
                <Text variant="body-default-s" onBackground="neutral-weak">
                  <span className="loading-dots">Loading</span>
                </Text>
              </Row>
            </Column>
          )}
          {[...messages].reverse().map((m, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Append-only array
            <Column key={i} gap="4" align={m.role === "user" ? "end" : "start"}>
              <Text variant="label-strong-s" onBackground="neutral-weak">
                {m.role === "user" ? "Du" : "KI"}
              </Text>
              <Row
                padding="12"
                radius="m"
                background={m.role === "user" ? "brand-alpha-weak" : "neutral-alpha-weak"}
                style={{ maxWidth: "90%" }}
              >
                <Text variant="body-default-m">{m.text}</Text>
              </Row>
            </Column>
          ))}
          {messages.length === 0 && (
            <Text variant="body-default-m" onBackground="neutral-weak">
              Hi! Ich bin der KI-Assistent von Karl. Wie kann ich helfen? Suchst du nach bestimmten
              Informationen?
            </Text>
          )}
          <div ref={messagesEndRef} />
        </Flex>

      <Row padding="16" borderTop="neutral-medium" align="center" vertical="center">
        <form
          onSubmit={handleCustomSubmit}
          style={{ display: "flex", width: "100%", gap: "8px", position: "relative" }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "inherit";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 32)}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                // biome-ignore lint/suspicious/noExplicitAny: Form adapter
                handleCustomSubmit(e as any);
              }
            }}
            placeholder="Frage etwas..."
            style={{
              flex: 1,
              padding: "6px 36px 6px 12px",
              borderRadius: "18px",
              border: "1px solid var(--neutral-border-weak)",
              background: "var(--neutral-alpha-weak)",
              color: "inherit",
              resize: "none",
              fontFamily: "inherit",
              fontSize: "14px",
              height: "32px",
              minHeight: "32px",
              maxHeight: "32px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              lineHeight: "20px",
              outline: "none",
            }}
          />
          <IconButton
            type="submit"
            icon="chevronRight"
            variant="primary"
            size="s"
            style={{
              position: "absolute",
              right: "3px",
              top: "3px",
              borderRadius: "12px",
              width: "26px",
              height: "26px",
              opacity: isGenerating ? 0.5 : 1,
            }}
          />
        </form>
      </Row>
    </Column>
  );
};
