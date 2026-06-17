function SearchPage() {
  return (
    <section className="page-canvas page-canvas--search">
      <div className="mock-panel mock-panel--left">
        <p className="page-tag">Aziz</p>
        <h2 className="page-title">Ish qidirish sahifasi</h2>
        <p className="page-text">
          Qilish kerak: chap filter paneli, o‘ng tarafdagi ish cardlari va pastki
          footer.
        </p>
        <ul className="task-list">
          <li>Filter panelni qurish</li>
          <li>Ish cardlarini joylash</li>
          <li>Pagination yoki footer qismini qo‘shish</li>
        </ul>
      </div>
    </section>
  )
}

export default SearchPage
