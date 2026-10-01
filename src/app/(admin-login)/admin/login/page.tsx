import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminConfigured, isAuthenticated } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Connexion · Administration", robots: { index: false, follow: false } };

export default async function LoginPage() {
  if (!adminConfigured()) redirect("/admin");
  if (await isAuthenticated()) redirect("/admin");
  return <LoginForm />;
}
