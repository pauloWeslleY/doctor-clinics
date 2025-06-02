import { redirect } from "next/navigation";

import { Routes } from "@/lib/routes";

const Home = () => redirect(Routes.Dashboard);

export default Home;
