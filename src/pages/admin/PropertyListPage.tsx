import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Space, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useMemo, useState } from "react";
import {
  deleteProperty,
  formatPrice,
  propertyTypeLabel,
  statusLabel,
} from "../../lib/properties";
import { getPropertyCover } from "../../lib/propertyImages";
import { adminHref } from "../../lib/route";
import type { Property } from "../../types/property";

interface PropertyListPageProps {
  client: SupabaseClient | null;
  properties: Property[];
  dataSource: "supabase" | "demo";
  onRefresh: () => void;
}

const statusColor: Record<string, string> = {
  available: "green",
  pending: "gold",
  sold: "default",
};

export function PropertyListPage({
  client,
  properties,
  dataSource,
  onRefresh,
}: PropertyListPageProps) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleDelete = async (id: string) => {
    if (!client) return;
    setBusyId(id);
    const { error } = await deleteProperty(client, id);
    setBusyId(null);
    if (error) {
      message.error(`删除失败：${error}`);
      return;
    }
    message.success("已删除");
    onRefresh();
  };

  const columns: ColumnsType<Property> = useMemo(
    () => [
      {
        title: "封面",
        dataIndex: "image_url",
        width: 88,
        render: (_url: string | null, record) => {
          const cover = getPropertyCover(record);
          return cover ? (
            <Image src={cover} alt={record.title} width={64} height={48} style={{ objectFit: "cover" }} />
          ) : (
            "—"
          );
        },
      },
      { title: "标题", dataIndex: "title", ellipsis: true },
      { title: "城市", dataIndex: "city", width: 100 },
      {
        title: "价格",
        dataIndex: "price",
        width: 120,
        render: (price: number) => formatPrice(price),
      },
      {
        title: "类型",
        dataIndex: "property_type",
        width: 110,
        render: (type: string | null) => propertyTypeLabel(type),
      },
      {
        title: "状态",
        dataIndex: "status",
        width: 90,
        render: (status: string | null) => (
          <Tag color={statusColor[status ?? "available"]}>{statusLabel(status)}</Tag>
        ),
      },
      {
        title: "臻选",
        dataIndex: "featured",
        width: 70,
        render: (featured: boolean | null) => (featured ? "是" : "否"),
      },
      {
        title: "操作",
        key: "actions",
        width: 140,
        fixed: "right",
        render: (_, record) => (
          <Space size="small">
            <a href={adminHref(`/admin/properties/edit/${record.id}`)}>编辑</a>
            <Popconfirm
              title="确定删除该房源？"
              onConfirm={() => handleDelete(record.id)}
              okText="删除"
              cancelText="取消"
            >
              <Button type="link" danger size="small" loading={busyId === record.id}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [busyId, client],
  );

  return (
    <div>
      <div className="admin-ant-page-head">
        <h2>房源管理</h2>
        <Button type="primary" icon={<PlusOutlined />} href={adminHref("/admin/properties/new")}>
          新增房源
        </Button>
      </div>

      {dataSource === "demo" && (
        <div className="admin-ant-alert">
          当前为演示数据或未连接 Supabase，请先在「系统设置」中连接数据库后再管理真实房源。
        </div>
      )}

      <Table
        rowKey="id"
        columns={columns}
        dataSource={properties}
        scroll={{ x: 960 }}
        pagination={{
          current: page,
          pageSize,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (nextPage, nextSize) => {
            setPage(nextPage);
            setPageSize(nextSize);
          },
        }}
      />
    </div>
  );
}
