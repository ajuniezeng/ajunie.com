export type Site = {
  TITLE: string
  DESCRIPTION: string
  EMAIL: string
  POSTS_PER_PAGE: number
  SITE_URL: string
}

export type Link = {
  href: string
  label: string
}

export const SITE: Site = {
  TITLE: "Ajunie's Shithole",
  DESCRIPTION: "Ajunie's spirit (sh*t) lives here.",
  EMAIL: 'contact@ajunie.com',
  POSTS_PER_PAGE: 5,
  SITE_URL: 'https://ajunie.com',
}