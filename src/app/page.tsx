import { redirect } from "next/navigation";

import { getUserAuthenticated } from "@/helpers/user-auth";
import { Routes } from "@/lib/routes";

const Home = async () => {
  const { user } = await getUserAuthenticated();

  if (user) {
    redirect(Routes.Dashboard);
  }

  redirect(Routes.Appointments);
};

export default Home;
