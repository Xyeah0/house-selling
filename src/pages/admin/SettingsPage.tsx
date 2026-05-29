import { Button, Form, Input, Space, Typography, message } from "antd";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";
import { PROPERTIES_TABLE } from "../../lib/properties";
import { APPOINTMENTS_TABLE } from "../../lib/appointments";
import {
  clearConfig,
  createSupabaseClient,
  loadConfig,
  saveConfig,
  type SupabaseConfig,
} from "../../lib/supabase";

interface SettingsPageProps {
  client: SupabaseClient | null;
  dataSource: "supabase" | "demo";
  onClientChange: (client: SupabaseClient | null, config: SupabaseConfig | null) => void;
  onRefresh: () => void;
}

export function SettingsPage({
  client,
  dataSource,
  onClientChange,
  onRefresh,
}: SettingsPageProps) {
  const [connecting, setConnecting] = useState(false);
  const [form] = Form.useForm<{ url: string; anonKey: string }>();

  const handleConnect = async (values: { url: string; anonKey: string }) => {
    setConnecting(true);
    const config = { url: values.url.trim(), anonKey: values.anonKey.trim() };
    const newClient = createSupabaseClient(config);
    const { error } = await newClient.auth.getSession();
    setConnecting(false);

    if (error) {
      message.error(error.message);
      return;
    }

    saveConfig(config);
    onClientChange(newClient, config);
    onRefresh();
    message.success("已连接 Supabase");
  };

  const handleDisconnect = () => {
    clearConfig();
    onClientChange(null, null);
    onRefresh();
    form.resetFields();
    message.info("已断开连接");
  };

  return (
    <div>
      <div className="admin-ant-page-head">
        <h2>系统设置</h2>
      </div>

      {client ? (
        <Space direction="vertical" size="middle">
          <Typography.Paragraph>
            已连接 Supabase · 数据源：{dataSource === "supabase" ? "数据库" : "演示数据（表为空或未建）"}
          </Typography.Paragraph>
          <Typography.Paragraph type="secondary">
            数据表：<Typography.Text code>{PROPERTIES_TABLE}</Typography.Text>、
            <Typography.Text code>{APPOINTMENTS_TABLE}</Typography.Text>
          </Typography.Paragraph>
          <Button onClick={handleDisconnect}>断开连接</Button>
        </Space>
      ) : (
        <Form
          form={form}
          layout="vertical"
          className="admin-ant-form"
          initialValues={loadConfig() ?? undefined}
          onFinish={handleConnect}
        >
          <Form.Item
            label="Project URL"
            name="url"
            rules={[{ required: true, message: "请填写 URL" }]}
          >
            <Input placeholder="https://xxxxx.supabase.co" />
          </Form.Item>
          <Form.Item
            label="anon key"
            name="anonKey"
            rules={[{ required: true, message: "请填写 anon key" }]}
          >
            <Input.Password placeholder="eyJ..." />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={connecting}>
            连接
          </Button>
        </Form>
      )}
    </div>
  );
}
