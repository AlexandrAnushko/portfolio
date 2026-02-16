export const ROUTES = {
  ROOT: "/",
  TODOS: "/todos",
  PROFILE: "/profile",
};

export const RoutesTitle = {
  [ROUTES.ROOT]: "",
  [ROUTES.TODOS]: "Задачи",
  [ROUTES.PROFILE]: "Профиль",
};

export const burgerMenuLinks = [
  { href: ROUTES.PROFILE, label: RoutesTitle[ROUTES.PROFILE] },
  { href: ROUTES.TODOS, label: RoutesTitle[ROUTES.TODOS] },
];
