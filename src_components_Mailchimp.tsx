"use client";

import { useState, useRef, useEffect } from "react";
import { Button, Heading, Text, Background, Column, Flex, IconButton } from "@once-ui-system/core";
import { newsletter, mailchimp } from "@/resources";

export const Mailchimp: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);



  if (newsletter.display === false) return null;

  const handleSendEmail = () => {
    alert("In der Demo-Version ist diese Funktion deaktiviert.");
  };

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      {...flex}
    >
      <Background
        top="0"
        position="absolute"
        mask={{
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
          cursor: mailchimp.effects.mask.cursor,
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          opacity: 10,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
        }}
        dots={{
          display: true,
          opacity: 20,
          size: "2",
          color: "brand-on-background-weak",
        }}
        lines={{
          display: true,
          opacity: 10,
          size: "16",
          thickness: 1,
          angle: 45,
          color: "neutral-alpha-medium",
        }}
      />
      <Column maxWidth="xs" horizontal="center" gap="16" style={{ zIndex: 1 }}>
        <Heading marginBottom="s" variant="display-strong-xs">
          Schreib mir eine E-Mail
        </Heading>
        <Text wrap="balance" marginBottom="l" variant="body-default-l" onBackground="neutral-weak" align="center">
          Gib einfach deinen Text unten ein und schicke ihn ab.
        </Text>

        <Flex fillWidth position="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendEmail();
              }
            }}
            placeholder="Deine Nachricht..."
            style={{
              width: "100%",
              height: "38px",
              minHeight: "38px",
              maxHeight: "38px",
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
            onClick={handleSendEmail}
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
      </Column>
    </Column>
  );
};
