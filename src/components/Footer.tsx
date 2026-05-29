export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="brand__mark">◆</span>
          <strong>栖居 ESTATE</strong>
          <p>甄选稀缺居所 · 定义品质生活</p>
        </div>
        <p className="site-footer__copy">
          © {new Date().getFullYear()} 栖居房地产顾问有限公司
        </p>
      </div>
    </footer>
  );
}
