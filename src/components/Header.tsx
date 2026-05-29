interface HeaderProps {
  adminHref?: string;
}

export function Header({ adminHref = "#/admin/properties" }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#top">
          <span className="brand__mark">◆</span>
          <span className="brand__text">
            <strong>栖居</strong>
            <em>ESTATE</em>
          </span>
        </a>

        <nav className="site-nav" aria-label="主导航">
          <a href="#collection">臻选房源</a>
          <a href="#about">品牌理念</a>
          <a href="#contact">预约看房</a>
        </nav>

        <a className="btn btn-outline btn-sm" href={adminHref}>
          管理后台
        </a>
      </div>
    </header>
  );
}
