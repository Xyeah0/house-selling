import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Spin,
  message,
} from "antd";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import {
  fetchPropertyById,
  insertProperty,
  updateProperty,
} from "../../lib/properties";
import { adminHref } from "../../lib/route";
import { MAX_IMAGES, PropertyImagesUpload } from "./PropertyImagesUpload";
import {
  defaultPropertyFormValues,
  formValuesToPayload,
  propertyToFormValues,
  type PropertyFormValues,
} from "./propertyForm";

interface PropertyFormPageProps {
  client: SupabaseClient | null;
  propertyId?: string;
  dataSource: "supabase" | "demo";
  onSaved: () => void;
}

export function PropertyFormPage({
  client,
  propertyId,
  dataSource,
  onSaved,
}: PropertyFormPageProps) {
  const isEdit = !!propertyId;
  const [form] = Form.useForm<PropertyFormValues>();
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit || !client || !propertyId) return;

    setLoading(true);
    void fetchPropertyById(client, propertyId).then(({ data, error }) => {
      setLoading(false);
      if (error || !data) {
        message.error(error ?? "房源不存在");
        window.location.hash = "#/admin/properties";
        return;
      }
      form.setFieldsValue(propertyToFormValues(data));
    });
  }, [client, form, isEdit, propertyId]);

  const handleSubmit = async (values: PropertyFormValues) => {
    if (!client) {
      message.warning("请先在系统设置中连接 Supabase");
      return;
    }
    if (dataSource === "demo") {
      message.warning("当前为演示模式，请连接 Supabase 后再保存");
      return;
    }

    setSaving(true);
    const payload = formValuesToPayload(values);
    const { error } = isEdit && propertyId
      ? await updateProperty(client, propertyId, payload)
      : await insertProperty(client, payload);
    setSaving(false);

    if (error) {
      message.error(`${isEdit ? "更新" : "创建"}失败：${error}`);
      return;
    }

    message.success(isEdit ? "房源已更新" : "房源已创建");
    onSaved();
    window.location.hash = "#/admin/properties";
  };

  if (loading) {
    return (
      <div className="admin-ant-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="admin-ant-page-head">
        <h2>{isEdit ? "编辑房源" : "新增房源"}</h2>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={defaultPropertyFormValues}
        onFinish={handleSubmit}
        className="admin-ant-form"
      >
        <Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题" }]}>
          <Input />
        </Form.Item>

        <Space size="large" align="start" wrap className="admin-ant-form-row">
          <Form.Item label="城市" name="city" rules={[{ required: true, message: "请输入城市" }]}>
            <Input style={{ width: 160 }} />
          </Form.Item>
          <Form.Item label="地址" name="address" rules={[{ required: true, message: "请输入地址" }]}>
            <Input style={{ width: 320 }} />
          </Form.Item>
          <Form.Item
            label="价格（万）"
            name="price"
            rules={[{ required: true, message: "请输入价格" }]}
          >
            <InputNumber min={0} style={{ width: 140 }} />
          </Form.Item>
        </Space>

        <Space size="large" align="start" wrap className="admin-ant-form-row">
          <Form.Item label="卧室" name="bedrooms">
            <InputNumber min={0} style={{ width: 100 }} />
          </Form.Item>
          <Form.Item label="卫浴" name="bathrooms">
            <InputNumber min={0} style={{ width: 100 }} />
          </Form.Item>
          <Form.Item label="面积 ㎡" name="area_sqm">
            <InputNumber min={0} style={{ width: 120 }} />
          </Form.Item>
          <Form.Item label="类型" name="property_type">
            <Select
              style={{ width: 160 }}
              options={[
                { value: "apartment", label: "精品公寓" },
                { value: "villa", label: "独栋别墅" },
                { value: "townhouse", label: "联排宅邸" },
                { value: "penthouse", label: "顶层大平层" },
              ]}
            />
          </Form.Item>
          <Form.Item label="状态" name="status">
            <Select
              style={{ width: 120 }}
              options={[
                { value: "available", label: "在售" },
                { value: "pending", label: "洽谈中" },
                { value: "sold", label: "已售" },
              ]}
            />
          </Form.Item>
        </Space>

        <Form.Item
          name="image_urls"
          label="房源图片"
          extra={`支持上传最多 ${MAX_IMAGES} 张，第一张为列表封面，详情页轮播展示全部图片`}
        >
          <PropertyImagesUpload client={client} />
        </Form.Item>

        <Form.Item label="描述" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="featured" valuePropName="checked">
          <Checkbox>设为臻选推荐</Checkbox>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={saving}>
              {isEdit ? "保存修改" : "创建房源"}
            </Button>
            <Button href={adminHref("/admin/properties")}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
