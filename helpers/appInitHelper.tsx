import { getSessionDetails } from "@/services/serverSide/auth/authentication";
import { redirect } from "next/navigation";
import { isEmpty } from "./common";
import { APP_INIT_RESPONSE_TYPE } from "@/global/constants";
import { userStore } from "@/stores/userStore";

export const appInit: any = async () => {
  const session = await getSessionDetails();
  if (isEmpty(session)) {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/signup"
    )
      return;
    return { type: APP_INIT_RESPONSE_TYPE.REDIRECT, path: "/login" };
  }
  const userDetails = session?.user;
  if (userDetails) {
    userStore.setUserDetails(userDetails);
  }
  redirect("/login");
};
