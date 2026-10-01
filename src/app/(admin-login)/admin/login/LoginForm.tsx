"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { loginAction } from "@/app/(admin)/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-forest-900 px-4">
      <div className="grain pointer-events-none absolute inset-0" />
      <form action={action} className="card relative w-full max-w-sm p-8">
        <Logo height={44} />
        <h1 className="mt-6 text-2xl text-forest-900">Espace d&apos;administration</h1>
        <p className="mt-1 text-[14px] text-ink-500">Réservé à RND Élagage.</p>
        <label htmlFor="password" className="mt-6 block text-[14px] font-semibold text-forest-900">
          Mot de passe
        </label>
        <div className="relative mt-2">
          <Lock size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-300" />
          <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus className="h-12 w-full rounded-xl border border-ink-900/15 bg-white pl-11 pr-4 text-[16px] focus:border-forest-700" />
        </div>
        {state && !state.ok && (
          <p className="mt-3 text-[13px] text-copper-600" role="alert">
            {state.message}
          </p>
        )}
        <button type="submit" disabled={pending} className="btn-forest mt-6 w-full">
          {pending ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
