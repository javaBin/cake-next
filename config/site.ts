export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Cake Next",
  description:
    "JavaZone Cake Next",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Cake",
      href: "/cake",
    },
    {
      title: "Cake Query",
      href: "/cake/query",
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
