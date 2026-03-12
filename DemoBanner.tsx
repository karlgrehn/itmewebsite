"use client";

export function DemoBanner() {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: "linear-gradient(90deg, rgba(30, 30, 50, 0.97) 0%, rgba(40, 30, 70, 0.97) 100%)",
                borderBottom: "1px solid rgba(180, 140, 255, 0.2)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                padding: "10px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
            }}
        >
            <span style={{
                background: "linear-gradient(90deg, #c084fc, #a855f7)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
            }}>
                Demo
            </span>
            <span style={{
                width: "1px",
                height: "14px",
                background: "rgba(180, 140, 255, 0.3)",
                display: "inline-block",
                flexShrink: 0,
            }} />
            <span style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.8rem",
                lineHeight: 1.5,
                textAlign: "center",
            }}>
                Diese Website ist eine <strong style={{ color: "rgba(255,255,255,0.85)" }}>Demo-Version</strong>.
                Persönliche Informationen sind geschwärzt. Die KI-Funktion ist deaktiviert.
            </span>
        </div>
    );
}
