"use client";

import React from "react";
import { NavBar } from "../../components/features/NavBar";
import { DesignSystemShowcase } from "../../components/design-system/DesignSystemShowcase";
import { useRouter } from "next/navigation";

export default function DesignSystemPage() {
  const router = useRouter();

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--color-bg-page)" }}>
      <NavBar
        currentView="design-system"
        onViewChange={(view) => {
          if (view === "marketplace") {
            router.push("/");
          }
        }}
      />
      <DesignSystemShowcase />
    </main>
  );
}
