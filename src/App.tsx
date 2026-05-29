import { useCallback, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { HomePage } from "./pages/HomePage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import { fetchProperties } from "./lib/properties";
import { createSupabaseClient, loadConfig, type SupabaseConfig } from "./lib/supabase";
import { isAdminRoute, parsePropertyIdFromRoute, useHashRoute } from "./lib/route";
import type { Property } from "./types/property";
import "./App.css";
import "./admin.css";

export default function App() {
  const route = useHashRoute();
  const propertyId = parsePropertyIdFromRoute(route);
  const [client, setClient] = useState<SupabaseClient | null>(() => {
    const cfg = loadConfig();
    return cfg ? createSupabaseClient(cfg) : null;
  });
  const [config, setConfig] = useState<SupabaseConfig | null>(() => loadConfig());
  const [properties, setProperties] = useState<Property[]>([]);
  const [dataSource, setDataSource] = useState<"supabase" | "demo">("demo");
  const [loading, setLoading] = useState(true);

  const loadListings = useCallback(async () => {
    setLoading(true);
    const result = await fetchProperties(client);
    setProperties(result.data);
    setDataSource(result.source);
    setLoading(false);
  }, [client]);

  useEffect(() => {
    void loadListings();
  }, [loadListings]);

  const handleClientChange = (newClient: SupabaseClient | null, newConfig: SupabaseConfig | null) => {
    setClient(newClient);
    setConfig(newConfig);
  };

  return (
    <div className="app">
      <div className="grain" aria-hidden="true" />

      {isAdminRoute(route) ? (
        <ConfigProvider locale={zhCN}>
          <AdminLayout
            route={route}
            client={client}
            onClientChange={handleClientChange}
            properties={properties}
            dataSource={dataSource}
            onRefresh={loadListings}
          />
        </ConfigProvider>
      ) : propertyId ? (
        <ConfigProvider locale={zhCN}>
          <PropertyDetailPage
            propertyId={propertyId}
            properties={properties}
            loading={loading}
            dataSource={dataSource}
          />
        </ConfigProvider>
      ) : (
        <HomePage
          client={client}
          properties={properties}
          dataSource={dataSource}
          loading={loading}
        />
      )}

      {config && dataSource === "supabase" && (
        <span className="sr-only">已连接 {config.url}</span>
      )}
    </div>
  );
}
