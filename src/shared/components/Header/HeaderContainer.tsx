import { getUserId } from "@/app/actions/getUserId";
import { Header } from "./Header";

export const HeaderContainer = async () => {
  const userId = await getUserId();

  return <Header isAuth={!!userId} />;
};
