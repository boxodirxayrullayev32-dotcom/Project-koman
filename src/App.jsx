import Header from './components/Header.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import HomePage from './pages/Mansur/HomePage.jsx'
import VacanciesPage from './pages/Mansur/VacanciesPage.jsx'
import SearchPage from './pages/Aziz/SearchPage.jsx'
import KompaniyalarPage from './pages/Aziz/KompaniyalarPage.jsx'
import PanelPage from './pages/Boxodir/PanelPage.jsx'
import YangiliklarPage from './pages/Boxodir/YangiliklarPage.jsx'
import AloqaPage from './pages/Azamat/AloqaPage.jsx'
import Footer from './pages/Azamat/Footer.jsx'


const routes = {
  '/': HomePage,
  '/kunlikish': HomePage,
  '/ish-qidirish': SearchPage,
  '/ishchi-paneli': PanelPage,
  '/vakansiyalar': VacanciesPage,
  '/kompaniyalar': KompaniyalarPage,
  '/yangiliklar': YangiliklarPage,
  '/aloqa': AloqaPage,
}

function App({ path, onNavigate }) {
  const Page = routes[path] ?? NotFoundPage

  return (
    <div className="app-shell">
      <Header currentPath={path} onNavigate={onNavigate} />
      <main className="page-frame">
        <Page onNavigate={onNavigate} />
      </main>
      <Footer/>
    </div>
  )
}

export default App
