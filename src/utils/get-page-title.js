import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Admin4j'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
