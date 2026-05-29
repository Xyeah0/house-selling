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
          <div className="loading-state">
            <div className="loading-state__pulse" />
            <p>正在载入房源详情…</p>
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
            <h1>房源不存在</h1>
            <p>该房源可能已下架或链接有误。</p>
            <a className="btn btn-primary" href="#/">
              返回首页
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header adminHref="#/admin/properties" />

      <main className="property-detail">
        <div className="property-detail__breadcrumb">
          <a href="#/">首页</a>
          <span>/</span>
          <a href="#collection">臻选房源</a>
          <span>/</span>
          <span>{property.title}</span>
        </div>

        <div className="property-detail__hero">
          <ImageCarousel images={images} alt={property.title} />
          <div className="property-detail__hero-caption">
            <span className={`tag tag-status tag-${status}`}>{statusLabel(status)}</span>
            <h1>{property.title}</h1>
            <p>
              {property.city} · {propertyTypeLabel(property.property_type)}
            </p>
          </div>
        </div>

        <div className="property-detail__body">
          <div className="property-detail__price">{formatPrice(property.price)}</div>

          <div className="property-detail__specs">
            {property.bedrooms != null && (
              <div>
                <span>{property.bedrooms}</span>
                <small>卧室</small>
              </div>
            )}
            {property.bathrooms != null && (
              <div>
                <span>{property.bathrooms}</span>
                <small>卫浴</small>
              </div>
            )}
            {property.area_sqm != null && (
              <div>
                <span>{property.area_sqm}</span>
                <small>面积 ㎡</small>
              </div>
            )}
          </div>

          <p className="property-detail__address">{property.address}</p>
          <p className="property-detail__desc">
            {property.description ?? "暂无详细描述，欢迎预约实地看房。"}
          </p>

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
