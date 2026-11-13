"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Layers, Eye, Calculator, ArrowRight, PlusCircle } from "lucide-react";
import CadastroOvelha from "@/components/CadastroOvelha";
import AcasaladorConsanguinidade from "@/components/AcasaladorConsanguinidade";
import DiagnosticoFamacha from "@/components/DiagnosticoFamacha";
import CalculadoraQueijo from "@/components/CalculadoraQueijo";
import ThemeToggle from "@/components/ThemeToggle";

type TabKey = "cadastro" | "acasalamento" | "famacha" | "calculadora";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabKey>("cadastro");

  const tabs = [
    { id: "cadastro", label: "Cadastro de Ovelhas", icon: PlusCircle, component: CadastroOvelha },
    { id: "acasalamento", label: "Acasalamento & Consanguinidade", icon: Layers, component: AcasaladorConsanguinidade },
    { id: "famacha", label: "Ficha & Diagnóstico FAMACHA©", icon: Eye, component: DiagnosticoFamacha },
    { id: "calculadora", label: "Calculadora de Rendimento", icon: Calculator, component: CalculadoraQueijo }
  ];

  const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component || CadastroOvelha;

  return (
    <div className="flex-1 flex flex-col bg-la min-h-screen">
      {/* Header */}
      <header className="border-b border-areia bg-la sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-10 h-10 border border-areia rounded-full hover:bg-areia/40 flex items-center justify-center transition-colors text-cabrito"
              title="Voltar para a Home"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <span className="font-serif font-bold text-xl text-camurca tracking-tight">
              SGR <span className="text-pasto">Capri&Ovis</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="text-[10px] bg-pasto/10 text-pasto font-bold px-3 py-1 rounded-full uppercase tracking-wider hidden sm:inline-block">
              Modo Acadêmico / Protótipo
            </span>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Banner Welcome */}
        <div className="bg-areia/40 border border-areia rounded-[2rem] p-6 lg:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <span className="text-[10px] text-pasto font-bold uppercase tracking-widest block">
              Sistema de Gerenciamento de Rebanhos
            </span>
            <h1 className="font-serif font-bold text-2xl lg:text-3xl text-camurca">
              Painel do Produtor
            </h1>
            <p className="text-xs text-cabrito/60 leading-normal">
              Gerencie cadastros, lactação, parentescos e sanidade do rebanho de ovinos e caprinos.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab("cadastro")}
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5 ${
                activeTab === "cadastro"
                  ? "bg-pasto text-la"
                  : "bg-la border border-areia text-cabrito hover:border-pasto"
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Cadastrar Ovelha
            </button>
            <Link
              href="/"
              className="text-xs font-bold text-cabrito/60 hover:text-cabrito transition-colors px-4 py-2.5 border border-areia hover:bg-areia/30 rounded-full flex items-center gap-1"
            >
              Voltar para a Home
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="border-b border-areia flex overflow-x-auto gap-2 pb-px scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`flex items-center gap-2.5 px-6 py-4 border-b-2 font-semibold text-sm transition-all whitespace-nowrap ${
                  isActive
                    ? "border-pasto text-pasto font-bold bg-areia/10"
                    : "border-transparent text-cabrito/50 hover:text-cabrito hover:border-areia"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-pasto" : "text-cabrito/40"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Panel */}
        <div className="min-h-[400px]">
          <ActiveComponent />
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-areia py-6 bg-la text-center text-xs text-cabrito/40">
        <p>SGR - Sistema de Gerenciamento de Rebanhos • Capri & Ovis Ovinocaprinocultura. SP, MG, RJ, ES.</p>
      </footer>
    </div>
  );
}
