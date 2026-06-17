import { useEffect, useState } from 'react'
import App from './App.jsx'
import { getCurrentPath, navigateTo } from './router/hashRouter.js'

function getInitialPath() {
  const currentPath = getCurrentPath()
  if (currentPath === '/' && window.location.hash === '') {
    return '/kunlikish'
  }

  return currentPath
}

function Root() {
  const [path, setPath] = useState(getInitialPath)

  useEffect(
    () => {
      if (window.location.hash === '') {
        navigateTo('/kunlikish')
      }

      const handleHashChange = () => {
        setPath(getCurrentPath())
      }

      window.addEventListener('hashchange', handleHashChange)

      return () => {
        window.removeEventListener('hashchange', handleHashChange)
      }
    },
    [],
  )

  return (
    <App
      path={path}
      onNavigate={(nextPath) => {
        const normalized = nextPath.startsWith('/') ? nextPath : `/${nextPath}`
        navigateTo(normalized)
        setPath(normalized)
      }}
    />
  )
}

export default Root
