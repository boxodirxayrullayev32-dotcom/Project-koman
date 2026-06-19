const navItems = [
  { label: 'Bosh sahifa', path: '/kunlikish' },
  { label: 'Ish qidirish', path: '/ish-qidirish' },
  { label: "Ish e'lon qilish", path: '/ishchi-paneli' },
  { label: 'Xabarlar', path: '/vakansiyalar' },
  { label: 'Kompaniyalar', path: '/kompaniyalar' },
  { label: "To'lovlar", path: '/yangiliklar' },
  { label: 'Ish joylashtirish', path: '/aloqa' },
]

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
    </svg>
  )
}

function Header({ currentPath, onNavigate }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="brand-wrap">
          <a
            className="brand-mark"
            href="#/kunlikish"
            onClick={(event) => {
              event.preventDefault()
              onNavigate('/kunlikish')
            }}
          >
            Kunlikish
          </a>
        </div>

        <nav className="top-nav" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = currentPath === item.path

            return (
              <a
                key={item.path}
                href={`#${item.path}`}
                className={`top-nav__link${isActive ? ' active' : ''}`}
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate(item.path)
                }}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="header-actions">
          <button type="button" className="lang-switch" aria-label="Language">
            <GlobeIcon />
            <span>O'zbekcha</span>
          </button>
          <button type="button" className="primary-action">
            Profilga kirish
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
