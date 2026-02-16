export const ROUTES = {
  ROOT: "/",
  TODOS: "/todos",
  PROFILE: "/profile",
  MY_PROJECTS: "/my-projects",
};

export const RouteTitle = {
  [ROUTES.ROOT]: "Home",
  [ROUTES.TODOS]: "Tasks",
  [ROUTES.PROFILE]: "Profile",
  [ROUTES.MY_PROJECTS]: "My Projects",
};

export const unauthorizedHeaderLinks = [
  { href: ROUTES.ROOT, label: RouteTitle[ROUTES.ROOT] },
  { href: ROUTES.MY_PROJECTS, label: RouteTitle[ROUTES.MY_PROJECTS] },
];

export const authorizedHeaderLinks = [
  ...unauthorizedHeaderLinks,
  { href: ROUTES.PROFILE, label: RouteTitle[ROUTES.PROFILE] },
  { href: ROUTES.TODOS, label: RouteTitle[ROUTES.TODOS] },
];

export const burgerMenuLinks = [
  { href: ROUTES.PROFILE, label: RouteTitle[ROUTES.PROFILE] },
  { href: ROUTES.TODOS, label: RouteTitle[ROUTES.TODOS] },
];
