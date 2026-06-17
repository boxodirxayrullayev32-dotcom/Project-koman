function PanelPage() {
  return (
    <section className="page-canvas page-canvas--panel">
      <div className="mock-panel mock-panel--right">
        <p className="page-tag">Boxodir</p>
        <h2 className="page-title">Ishchi paneli</h2>
        <p className="page-text">
          Qilish kerak: sidebar, statistic cardlar, profil bloklari va dashboard
          ichidagi qolgan qismlar.
        </p>
        <ul className="task-list">
          <li>Chap sidebarni qurish</li>
          <li>Statistika kartalarni joylash</li>
          <li>Profil va activity bloklarini qilish</li>
        </ul>
      </div>
    </section>
  )
}

export default PanelPage
