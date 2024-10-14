
export const liveData = [
  { heading: "Total Users", stats: 300000 },
  { heading: "MCQ Bank", stats: 5000000 },
  { heading: "Active Users", stats: 3000 },
  { heading: "MCQs Solved Today", stats: 3000 },
];
export const navbarLink = [
  { content: "Pricing", to: "/pricing" },
];

export const authLinksNavBar = [
  { content: "Log In", to: "/login" },
  { content: "Sign Up", to: "/signup" },
  { content: "Admin", to: "/login?admin=true" },
];

export const authenticatedUserNavbarLinks = ["/main", "/search?category=academy", "/real-time", "/account"];
export const authenticatedAdminNavBarLinks = [
  authenticatedUserNavbarLinks[0],
  authenticatedUserNavbarLinks[1],
  authenticatedUserNavbarLinks[3]
];

export const variants = {
  hidden: { width: 0 },
  visible: {
    width: "100vw",
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: { width: 0 },
};

export const itemsVariants = {
  hidden: { x: 10, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const priceCardData = [
  {
    heading: "Token Pack",
    price: 300,
    desc: `Purchase tokens and enjoy complete
          access to tests as long as you have tokens in your account.
          Perfect for flexible usage tailored to your needs.`,
    list: [
      "Flexible usage",
      "Access to all tests",
      "Pay as you go",
      "No expiration on tokens",
      "24/7 customer support",
    ],
    callToAction: "Buy Tokens",
  },
  {
    heading: "Premium Ultra",
    price: 500,
    desc: `Experience the ultimate convenience with our Premium plan.
            Get lifetime access to all our services without any limitations.
            One-time purchase for unlimited, uninterrupted access forever.`,
    list: [
      "Lifetime access",
      "Unlimited tests",
      "No recurring fees",
      "Priority support",
      "Exclusive content",
      "Regular updates",
    ],
    callToAction: "Unlimited Access",
  },
];

export const dateAmPmFormater = new Intl.DateTimeFormat("en-Us", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
})

export const MCQ_LIMIT_FOR_PERSOLIZED_ALGO_ACTIVATION = 60
export const MAX_MCQ_LIMIT = 150
export const COUNT_DOWN_INTIAL_VALUE = 60

