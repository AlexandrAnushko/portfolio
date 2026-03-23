export const ROUTES = {
  ROOT: "/",
  TODOS: "/todos",
  // TO-DO: not yet implemented
  // PROFILE: "/profile",
  PROJECTS: "/projects",
  SKILLS: "/skills",
  CONTACT: "/contact",
};

export const RouteTitle = {
  [ROUTES.ROOT]: "Home",
  [ROUTES.TODOS]: "Tasks",
  // [ROUTES.PROFILE]: "Profile",
  [ROUTES.PROJECTS]: "Projects",
  [ROUTES.SKILLS]: "Skills",
  [ROUTES.CONTACT]: "Contact",
};

export const unauthorizedHeaderLinks = [
  { href: ROUTES.ROOT, label: RouteTitle[ROUTES.ROOT] },
  { href: ROUTES.PROJECTS, label: RouteTitle[ROUTES.PROJECTS] },
  { href: ROUTES.SKILLS, label: RouteTitle[ROUTES.SKILLS] },
  { href: ROUTES.CONTACT, label: RouteTitle[ROUTES.CONTACT] },
];

export const authorizedHeaderLinks = [
  ...unauthorizedHeaderLinks,
  // { href: ROUTES.PROFILE, label: RouteTitle[ROUTES.PROFILE] },
  { href: ROUTES.TODOS, label: RouteTitle[ROUTES.TODOS] },
];

export const burgerMenuLinks = [
  // { href: ROUTES.PROFILE, label: RouteTitle[ROUTES.PROFILE] },
  { href: ROUTES.TODOS, label: RouteTitle[ROUTES.TODOS] },
];
