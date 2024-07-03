export const navbarLink = [
  { content: "Home", to: "/" },
  { content: "About", to: "/about" },
  { content: "Pricing", to: "/#pricing" }
]

export const authLinksNavBar = [
  { content: "Log In", to: "/login" },
  { content: "Sign Up", to: "/signup" },
  { content: "Admin", to: "/login?admin=true" }
]

export const variants = {
  hidden: { width: 0 },
  visible: {
    width: "100vw",
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  },
  exit: { width: 0 }

}

export const itemsVariants = {
  hidden: { x: 10, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  }
}
