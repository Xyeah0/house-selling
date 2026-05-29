export function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="about__layout reveal">
        <div className="about__panel about__panel--text">
          <p className="section-eyebrow">Our Philosophy</p>
          <h2>栖居，不止于交易</h2>
          <p>
            我们相信，理想居所是生活方式的延伸。栖居团队由资深经纪、建筑背景顾问与法务专家组成，
            从选址、验房到交割，提供全流程白手套服务。
          </p>
          <p>
            每一套上架房源均经过三重审核：产权清晰、实地勘验、价格公允。您看到的，就是您将拥有的。
          </p>
        </div>

        <div className="about__panel about__panel--visual">
          <div className="about__frame">
            <img
              src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80"
              alt="现代建筑内景"
              loading="lazy"
            />
          </div>
          <blockquote>
            「好的房子，会在第一眼告诉你——这里可以生活，也可以传承。」
          </blockquote>
        </div>
      </div>
    </section>
  );
}
