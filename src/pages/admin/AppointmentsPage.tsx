import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";
import { fetchAppointments } from "../../lib/appointments";
import type { Appointment } from "../../types/appointment";
import type { Property } from "../../types/property";

interface AppointmentsPageProps {
  client: SupabaseClient | null;
  dataSource: "supabase" | "demo";
  properties: Property[];
}

export function AppointmentsPage({ client, dataSource, properties }: AppointmentsPageProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (!client || dataSource !== "supabase") {
      setAppointments([]);
      return;
    }

    setLoading(true);
    void fetchAppointments(client).then(({ data }) => {
      setAppointments(data);
      setLoading(false);
    });
  }, [client, dataSource]);

  const propertyTitleById = useMemo(() => {
    const map = new Map(properties.map((p) => [p.id, p.title]));
    return (id: string | null) => (id ? (map.get(id) ?? id.slice(0, 8)) : "通用咨询");
  }, [properties]);

  const columns: ColumnsType<Appointment> = [
    { title: "姓名", dataIndex: "name", width: 100 },
    { title: "手机", dataIndex: "phone", width: 130 },
    { title: "城市", dataIndex: "city", width: 100, render: (city) => city || "—" },
    {
      title: "意向房源",
      dataIndex: "property_id",
      width: 180,
      ellipsis: true,
      render: (id: string | null) => propertyTitleById(id),
    },
    {
      title: "留言",
      dataIndex: "message",
      ellipsis: true,
      render: (msg: string | null) => msg || "—",
    },
    {
      title: "提交时间",
      dataIndex: "created_at",
      width: 180,
      render: (time: string | null | undefined) =>
        time ? new Date(time).toLocaleString("zh-CN") : "—",
    },
  ];

  return (
    <div>
      <div className="admin-ant-page-head">
        <h2>预约记录</h2>
      </div>

      {dataSource === "demo" && (
        <div className="admin-ant-alert">
          请先在「系统设置」中连接 Supabase 并创建 appointments 表后查看预约数据。
        </div>
      )}

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={appointments}
        scroll={{ x: 900 }}
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
