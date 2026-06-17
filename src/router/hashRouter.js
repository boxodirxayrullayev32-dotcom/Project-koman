const HOME_PATH = '/'

function normalizePath(pathname) {
  if (!pathname || pathname === '#') {
    return HOME_PATH
  }

  return pathname.startsWith('/') ? pathname : `/${pathname}`
}

export function getCurrentPath() {
  const hash = window.location.hash.replace(/^#/, '')
  return normalizePath(hash || HOME_PATH)
}

export function navigateTo(path) {
  const nextPath = normalizePath(path)
  window.location.hash = `#${nextPath}`
}

export function subscribeToRouteChanges(listener) {
  window.addEventListener('hashchange', listener)

  return () => {
    window.removeEventListener('hashchange', listener)
  }
}
