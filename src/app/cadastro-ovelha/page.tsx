"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import CadastroOvelha from "@/components/CadastroOvelha";

export default function CadastroOvelhaPage() {
  return (
    <div className="flex-1 flex flex-col bg-la min-h-screen">
      <header className="border-b border-areia bg-la sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="w-9 h-9 border border-areia rounded-full hover:bg-areia/40 flex items-center justify-center transition-colors text-cabrito"
              title="Voltar ao Painel"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-serif font-bold text-lg text-camurca">
                Cadastro de Ovelhas
              </h1>
              <p className="text-xs text-cabrito/60">Controle prático do rebanho</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="text-xs font-semibold px-4 py-2 rounded-full border border-areia hover:bg-areia/30 text-cabrito transition-colors hidden sm:inline-block"
            >
              Painel Geral
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        <CadastroOvelha />
      </main>
    </div>
  );
}
