export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Cake Next",
  description:
    "JavaZone Cake Next",
  mainNav: [
    {
      title: "Home",
      href: "/",
      visibility: true
    },
    {
      title: "Cake",
      href: "/cake",
      visibility: true
    },
    {
      title: "Cake Query",
      href: "/cake/query",
      visibility: true
    },
    {
      title: "Planning",
      href: "/planning",
    },
  ],
  links: {
    twitter: "https://twitter.com/javazone",
    github: "https://github.com/javabin",
    docs: "https://java.no",
  },
}
