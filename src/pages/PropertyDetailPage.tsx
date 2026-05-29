import { LeftOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Descriptions,
  Divider,
  Spin,
  Typography,
} from "antd";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ImageCarousel } from "../components/ImageCarousel";
import {
  formatPrice,
  propertyTypeLabel,
  statusLabel,
} from "../lib/properties";
import { getPropertyImages } from "../lib/propertyImages";
import type { Property } from "../types/property";

interface PropertyDetailPageProps {
  propertyId: string;
  properties: Property[];
  loading: boolean;
  dataSource: "supabase" | "demo";
}

export function PropertyDetailPage({
  propertyId,
  properties,
  loading,
  dataSource,
}: PropertyDetailPageProps) {
  const property = properties.find((p) => p.id === propertyId) ?? null;
  const images = property ? getPropertyImages(property) : [];
  const status = property?.status ?? "available";

  if (loading) {
    return (
      <>
        <Header adminHref="#/admin/properties" />
        <main className="property-detail">
          <div className="property-detail__loading">
            <Spin size="large" tip="正在载入房源详情…" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Header adminHref="#/admin/properties" />
        <main className="property-detail">
          <div className="property-detail__empty">
            <Typography.Title level={3}>房源不存在</Typography.Title>
            <Typography.Paragraph type="secondary">
              该房源可能已下架或链接有误。
            </Typography.Paragraph>
            <Button type="primary" href="#/">
              返回首页
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const specItems = [
    property.bedrooms != null && { label: "卧室", value: `${property.bedrooms} 间` },
    property.bathrooms != null && { label: "卫浴", value: `${property.bathrooms} 间` },
    property.area_sqm != null && { label: "面积", value: `${property.area_sqm} ㎡` },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <Header adminHref="#/admin/properties" />

      <main className="property-detail">
        <div className="property-detail__toolbar">
          <Button type="text" icon={<LeftOutlined />} href="#/">
            返回
          </Button>
        </div>

        <Breadcrumb
          className="property-detail__breadcrumb"
          items={[
            { title: <a href="#/">首页</a> },
            { title: <a href="#collection">臻选房源</a> },
            { title: property.title },
          ]}
        />

        <div className="property-detail__hero">
          <ImageCarousel images={images} alt={property.title} />
          <div className="property-detail__hero-caption">
            <span className={`tag tag-status tag-${status}`}>{statusLabel(status)}</span>
            <Typography.Title level={2} className="property-detail__title">
              {property.title}
            </Typography.Title>
            <Typography.Text className="property-detail__subtitle">
              {property.city} · {propertyTypeLabel(property.property_type)}
            </Typography.Text>
          </div>
        </div>

        <div className="property-detail__body">
          <Typography.Title level={3} className="property-detail__price">
            {formatPrice(property.price)}
          </Typography.Title>

          {specItems.length > 0 && (
            <>
              <Descriptions column={3} size="small" className="property-detail__specs">
                {specItems.map((item) => (
                  <Descriptions.Item key={item.label} label={item.label}>
                    {item.value}
                  </Descriptions.Item>
                ))}
              </Descriptions>
              <Divider />
            </>
          )}

          <Typography.Paragraph type="secondary">{property.address}</Typography.Paragraph>
          <Typography.Paragraph className="property-detail__desc">
            {property.description ?? "暂无详细描述，欢迎预约实地看房。"}
          </Typography.Paragraph>

          <button
            className="btn btn-primary btn-block property-detail__cta"
            type="button"
            onClick={() => {
              window.location.hash = `contact?property=${property.id}`;
            }}
          >
            预约看房
          </button>
        </div>
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
