import {
  HomeOutlined,
  RollbackOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography } from "antd";
import type { SupabaseClient } from "@supabase/supabase-js";
import { adminHref } from "../../lib/route";
import type { SupabaseConfig } from "../../lib/supabase";
import type { Property } from "../../types/property";
import { AppointmentsPage } from "./AppointmentsPage";
import { PropertyFormPage } from "./PropertyFormPage";
import { PropertyListPage } from "./PropertyListPage";
import { SettingsPage } from "./SettingsPage";

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  route: string;
  client: SupabaseClient | null;
  onClientChange: (client: SupabaseClient | null, config: SupabaseConfig | null) => void;
  properties: Property[];
  dataSource: "supabase" | "demo";
  onRefresh: () => void;
}

const menuItems = [
  { key: "/admin/properties", icon: <HomeOutlined />, label: "房源管理" },
  { key: "/admin/appointments", icon: <TeamOutlined />, label: "预约记录" },
  { key: "/admin/settings", icon: <SettingOutlined />, label: "系统设置" },
  { key: "front", icon: <RollbackOutlined />, label: "返回前台" },
];

function getSelectedKey(route: string): string {
  if (route.startsWith("/admin/properties")) return "/admin/properties";
  if (route.startsWith("/admin/appointments")) return "/admin/appointments";
  if (route.startsWith("/admin/settings")) return "/admin/settings";
  return "/admin/properties";
}

export function AdminLayout({
  route,
  client,
  onClientChange,
  properties,
  dataSource,
  onRefresh,
}: AdminLayoutProps) {
  const selectedKey = getSelectedKey(route);
  const isPropertyForm =
    route === "/admin/properties/new" ||
    /^\/admin\/properties\/edit\//.test(route);

  const content = (() => {
    if (route === "/admin/properties/new") {
      return (
        <PropertyFormPage
          client={client}
          dataSource={dataSource}
          onSaved={onRefresh}
        />
      );
    }

    const editMatch = route.match(/^\/admin\/properties\/edit\/([^/]+)$/);
    if (editMatch) {
      return (
        <PropertyFormPage
          client={client}
          propertyId={editMatch[1]}
          dataSource={dataSource}
          onSaved={onRefresh}
        />
      );
    }

    if (route === "/admin/appointments") {
      return (
        <AppointmentsPage
          client={client}
          dataSource={dataSource}
          properties={properties}
        />
      );
    }

    if (route === "/admin/settings") {
      return (
        <SettingsPage
          client={client}
          dataSource={dataSource}
          onClientChange={onClientChange}
          onRefresh={onRefresh}
        />
      );
    }

    return (
      <PropertyListPage
        client={client}
        properties={properties}
        dataSource={dataSource}
        onRefresh={onRefresh}
      />
    );
  })();

  return (
    <Layout className="admin-ant-layout">
      <Sider breakpoint="lg" collapsedWidth={0} width={220}>
        <div className="admin-ant-logo">栖居 · 管理后台</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems.map((item) => ({
            ...item,
            label:
              item.key === "front" ? (
                <a href="#/">{item.label}</a>
              ) : (
                <a href={adminHref(item.key)}>{item.label}</a>
              ),
          }))}
        />
      </Sider>
      <Layout>
        <Header className="admin-ant-header">
          {isPropertyForm && (
            <Typography.Text type="secondary">
              <a href={adminHref("/admin/properties")}>← 返回列表</a>
            </Typography.Text>
          )}
        </Header>
        <Content className="admin-ant-content">{content}</Content>
      </Layout>
    </Layout>
  );
}
