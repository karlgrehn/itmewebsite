"use client";

import { createContext, useState, useEffect } from "react";
import { Flex, Row, Column, Text, Button } from "@once-ui-system/core";
import { demoConfig } from "@/resources";

interface RouteGuardProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<{ scope: string | null }>({ scope: "demo" });

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const [welcomeAccepted, setWelcomeAccepted] = useState<boolean>(true); // Default to true for SSR
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 1. Check if welcome modal was already accepted
    const accepted = localStorage.getItem("demo_welcome_accepted");
    setWelcomeAccepted(accepted === "true");

    // 2. Check for expiration
    if (!demoConfig.adminOverride) {
      const expirationDate = new Date(demoConfig.expirationDate);
      const now = new Date();
      if (now > expirationDate) {
        setIsExpired(true);
      }
    }
  }, []);

  const handleAcceptWelcome = () => {
    localStorage.setItem("demo_welcome_accepted", "true");
    setWelcomeAccepted(true);
  };

  if (!mounted) return null;

  // 1. Show Expiration Screen if expired
  if (isExpired) {
    return (
      <div className="zugang-overlay">
        <div className="zugang-card">
          <h1 className="zugang-heading" style={{ color: "rgba(248,113,113,0.9)", fontSize: "1.4rem" }}>
            Website Abgelaufen
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", textAlign: "center", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "24px" }}>
            Der Timer für diese Demo-Version ist abgelaufen.<br />
            Die Website muss vom Administrator neu gestartet werden.
          </p>
          <div style={{ padding: "12px", background: "rgba(248,113,113,0.1)", borderRadius: "8px", border: "1px solid rgba(248,113,113,0.2)" }}>
            <Text variant="body-default-xs" style={{ color: "rgba(248,113,113,0.8)" }}>
              Admin Note: Set adminOverride to true in once-ui.config.ts to bypass.
            </Text>
          </div>
        </div>
      </div>
    );
  }

  // 2. Show Welcome Modal if not accepted
  if (!welcomeAccepted) {
    return (
      <div className="zugang-overlay">
        <div className="zugang-card" style={{ maxWidth: "500px" }}>
          <h1 className="zugang-heading">Willkommen</h1>
          <Column gap="16" style={{ marginBottom: "32px" }}>
            <Text variant="body-default-m" onBackground="neutral-medium" style={{ textAlign: "center" }}>
              Dies ist eine <strong style={{ color: "white" }}>Demo-Version</strong> meiner Portfolio-Website.
            </Text>
            <Column gap="8">
              <Row gap="8" align="center">
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--brand-solid)" }} />
                <Text variant="body-default-s" onBackground="neutral-weak">Persönliche Daten sind zum Schutz geschwärzt.</Text>
              </Row>
              <Row gap="8" align="center">
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--brand-solid)" }} />
                <Text variant="body-default-s" onBackground="neutral-weak">Die KI-Funktion ist in dieser Version deaktiviert.</Text>
              </Row>
              <Row gap="8" align="center">
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--brand-solid)" }} />
                <Text variant="body-default-s" onBackground="neutral-weak">Diese Version dient lediglich Präsentationszwecken.</Text>
              </Row>
            </Column>
          </Column>
          <Button
            fillWidth
            variant="primary"
            onClick={handleAcceptWelcome}
          >
            Okay, Verstanden
          </Button>
        </div>
      </div>
    );
  }

  // 3. Regular Demo Access
  return (
    <AuthContext.Provider value={{ scope: "demo" }}>
      {children}
    </AuthContext.Provider>
  );
};

export { RouteGuard };
