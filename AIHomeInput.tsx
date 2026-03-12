"use client";

import { useState, useRef } from "react";
import { Flex, IconButton, Text, Column, Row } from "@once-ui-system/core";

const DEMO_MESSAGE = "Diese Funktion ist in der Demo-Version nicht verfügbar. Bitte kontaktiere Karl direkt für eine persönliche Vorstellung.";

export const AIHomeInput = () => {
  const [prompt, setPrompt] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!prompt.trim()) return;
    setUserQuestion(prompt);
    setPrompt("");
    setSubmitted(true);
  };

  return (
    <Column fillWidth gap="16" style={{ marginTop: "24px", marginBottom: "32px", width: "100%" }}>
      <Flex fillWidth direction="column" gap="8">
        <Text variant="label-default-s" onBackground="neutral-weak">Frag meine KI etwas...</Text>
      </Flex>

      {!submitted && (
        <Flex fillWidth position="relative">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Frag Cura KI..."
            style={{
              width: "100%",
              minHeight: "38px",
              maxHeight: "38px",
              height: "38px",
              padding: "8px 44px 8px 16px",
              borderRadius: "19px",
              border: "1px solid var(--neutral-border-weak)",
              background: "var(--neutral-alpha-weak)",
              color: "white",
              fontSize: "14px",
              fontFamily: "inherit",
              resize: "none",
              outline: "none",
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition: "border-color 0.2s ease",
              lineHeight: "20px"
            }}
          />
          <IconButton
            icon="chevronRight"
            variant="primary"
            size="s"
            onClick={handleSend}
            disabled={!prompt.trim()}
            style={{
              position: "absolute",
              right: "3px",
              top: "3px",
              borderRadius: "16px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          />
        </Flex>
      )}

      {submitted && (
        <Column
          fillWidth
          gap="24"
          className="hide-scrollbar"
          style={{
            animation: "fadeIn 0.5s ease",
            maxHeight: "600px",
            overflowY: "auto",
            paddingRight: "8px",
            WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
          }}
        >
          <Column fillWidth gap="12">
            {/* User Question */}
            <Column fillWidth gap="8" align="end">
              <Text variant="label-strong-s" onBackground="neutral-weak">Deine Frage</Text>
              <Row padding="12" radius="m" background="brand-alpha-weak" style={{ marginLeft: "auto", width: "fit-content", maxWidth: "90%", whiteSpace: "pre-wrap" }}>
                <Text variant="body-default-m" style={{ color: "white" }}>{userQuestion}</Text>
              </Row>
            </Column>

            {/* Demo Answer */}
            <Column fillWidth gap="8" align="start">
              <Text variant="label-strong-s" onBackground="neutral-weak">Cura KI</Text>
              <Row padding="12" radius="m" background="transparent" style={{ width: "100%", whiteSpace: "pre-wrap" }}>
                <Text variant="body-default-m" style={{ color: "white", wordBreak: "break-word" }}>
                  {DEMO_MESSAGE}
                </Text>
              </Row>
            </Column>
          </Column>
        </Column>
      )}
    </Column>
  );
};
