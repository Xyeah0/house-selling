import { useMemo } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { PropertyGrid } from "../components/PropertyGrid";
import { useContactScroll } from "../lib/route";
import type { Property } from "../types/property";

interface HomePageProps {
  client: SupabaseClient | null;
  properties: Property[];
  dataSource: "supabase" | "demo";
  loading: boolean;
}

export function HomePage({ client, properties, dataSource, loading }: HomePageProps) {
  useContactScroll();

  const featured = useMemo(
    () => properties.find((p) => p.featured && p.status === "available") ?? properties[0] ?? null,
    [properties],
  );

  return (
    <>
      <Header adminHref="#/admin/properties" />

      <main id="top">
        {loading ? (
          <div className="loading-state collection-loading">
            <div className="loading-state__pulse" />
            <p>正在载入臻选房源…</p>
          </div>
        ) : (
          <PropertyGrid properties={properties} />
        )}

        <Hero
          featured={featured}
          onExplore={() =>
            document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })
          }
        />
        <AboutSection />

        <ContactSection client={client} properties={properties} />
      </main>

      <Footer />

      {dataSource === "demo" && (
        <div className="demo-banner">
          当前展示演示数据 · 连接 Supabase 并创建 <code>properties</code> 表后可管理真实房源
        </div>
      )}
    </>
  );
}
