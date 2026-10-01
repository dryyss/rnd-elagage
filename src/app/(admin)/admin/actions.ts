"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSession, destroySession, isAuthenticated, verifyPassword } from "@/lib/admin-auth";
import { CONTENT_KEYS, writeContent, type ContentKey } from "@/lib/content";
import { contentSchemas } from "@/lib/content-schemas";

export type ActionState = { ok: boolean; message?: string; errors?: string[] } | null;

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    return { ok: false, message: "Mot de passe incorrect." };
  }
  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function saveContentAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await isAuthenticated())) return { ok: false, message: "Session expirée. Reconnectez-vous." };

  const key = String(formData.get("key")) as ContentKey;
  if (!CONTENT_KEYS.includes(key)) return { ok: false, message: "Clé de contenu inconnue." };

  let json: unknown;
  try {
    json = JSON.parse(String(formData.get("json") ?? ""));
  } catch {
    return { ok: false, message: "Données illisibles." };
  }

  const parsed = contentSchemas[key].safeParse(json);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Certains champs sont invalides.",
      errors: parsed.error.issues.map((i) => `${i.path.join(".") || "racine"} : ${i.message}`),
    };
  }

  // Le type est garanti par le schéma correspondant à la clé.
  await writeContent(key, parsed.data as never);
  revalidatePath("/", "layout");
  return { ok: true, message: "Enregistré. Le site est à jour." };
}
