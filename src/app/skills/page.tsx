"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MarketplaceView } from "@/components/features/MarketplaceView";

function SkillsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam =
    searchParams.get("category") ||
    searchParams.get("output") ||
    searchParams.get("role") ||
    searchParams.get("use-case") ||
    "";
  const searchParam = searchParams.get("search") || searchParams.get("q") || "";

  return (
    <MarketplaceView
      initialCategory={categoryParam}
      initialSearch={searchParam}
      onNavigateHome={() => router.push("/")}
    />
  );
}

export default function SkillsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#FFEEDD" }} />}>
      <SkillsPageContent />
    </Suspense>
  );
}
