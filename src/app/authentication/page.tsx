"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignUpForm from "./components/sign-up-form";

const MenuTabsAuthentication = {
  login: "login",
  register: "register",
} as const;

const AuthenticationPage = () => {
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
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Faça login com sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
            <CardFooter>
              <Button>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value={MenuTabsAuthentication.register}>
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
