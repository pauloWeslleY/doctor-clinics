import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import LoginForm from "./components/login-form";
import SignUpForm from "./components/sign-up-form";

const MenuTabsAuthentication = {
  login: "login",
  register: "register",
} as const;

const AuthenticationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue={MenuTabsAuthentication.login} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value={MenuTabsAuthentication.login}>Login</TabsTrigger>
          <TabsTrigger value={MenuTabsAuthentication.register}>
            Criar conta
          </TabsTrigger>
        </TabsList>
        <TabsContent value={MenuTabsAuthentication.login}>
          <LoginForm />
        </TabsContent>
        <TabsContent value={MenuTabsAuthentication.register}>
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
