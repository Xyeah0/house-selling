import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { insertAppointment } from "../lib/appointments";
import { useContactPropertyId } from "../lib/route";
import type { Property } from "../types/property";

interface ContactSectionProps {
  client: SupabaseClient | null;
  properties: Property[];
}

export function ContactSection({ client, properties }: ContactSectionProps) {
  const propertyId = useContactPropertyId();
  const linkedProperty = propertyId
    ? properties.find((p) => p.id === propertyId) ?? null
    : null;

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      city: String(form.get("city") ?? "").trim() || null,
      message: String(form.get("message") ?? "").trim() || null,
      property_id: propertyId,
    };

    if (!client) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await insertAppointment(client, payload);
    setSubmitting(false);

    if (insertError) {
      const hint = insertError.includes("row-level security")
        ? " → 请在 Supabase 创建 appointments 表（见 supabase.txt）。"
        : "";
      setError(`提交失败：${insertError}${hint}`);
      return;
    }

    setSubmitted(true);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__grid">
        <div className="contact__copy reveal">
          <p className="section-eyebrow">Private Advisory</p>
          <h2>预约私人顾问</h2>
          <p>
            留下您的联系方式与意向，专属顾问将在 24 小时内与您联系，安排私密看房或资产咨询。
          </p>
          <ul className="contact__list">
            <li>
              <span>热线</span>
              <strong>400-888-6688</strong>
            </li>
            <li>
              <span>邮箱</span>
              <strong>concierge@qiju.estate</strong>
            </li>
            <li>
              <span>展厅</span>
              <strong>上海 · 静安 · 南京西路 1266 号</strong>
            </li>
          </ul>
        </div>

        <form className="contact__form reveal reveal-delay-2" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="contact__success">
              <p>感谢您的信任。</p>
              <p>
                {client
                  ? "预约已提交，顾问将尽快与您取得联系。"
                  : "顾问将尽快与您取得联系（未连接数据库，信息未保存）。"}
              </p>
            </div>
          ) : (
            <>
              {linkedProperty && (
                <div className="contact__property-tag">
                  意向房源：<strong>{linkedProperty.title}</strong>
                </div>
              )}

              <label>
                姓名
                <input name="name" required placeholder="如何称呼您" />
              </label>
              <label>
                手机
                <input name="phone" type="tel" required placeholder="便于顾问联系" />
              </label>
              <label>
                意向城市
                <input
                  name="city"
                  placeholder="如：上海、杭州"
                  defaultValue={linkedProperty?.city ?? ""}
                />
              </label>
              <label>
                留言
                <textarea
                  name="message"
                  rows={4}
                  placeholder="预算区间、户型偏好、看房时间…"
                />
              </label>
              {error && <p className="admin-error">{error}</p>}
              <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
                {submitting ? "提交中…" : "提交预约"}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
