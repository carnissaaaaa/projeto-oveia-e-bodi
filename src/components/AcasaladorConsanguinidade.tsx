"use client";

import React, { useState } from "react";
import { ShieldCheck, ShieldAlert, Heart, Info, Dna } from "lucide-react";

interface Animal {
  id: string;
  tag: string;
  name: string;
  gender: "M" | "F";
  species: "caprino" | "ovino";
  breed: "Saanen" | "Alpina" | "Lacaune" | "East Friesian";
  ptaLeite: number;
  photo: string;
}

const MALES: Animal[] = [
  { id: "M01", tag: "REG-0112", name: "Hércules da Mantiqueira", gender: "M", species: "caprino", breed: "Saanen", ptaLeite: 185, photo: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "M02", tag: "REG-0854", name: "Thor do Vale Verde", gender: "M", species: "caprino", breed: "Alpina", ptaLeite: 142, photo: "https://images.unsplash.com/photo-1603203038676-e137452df3c8?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "M03", tag: "REG-0991", name: "Ares do Caprigene", gender: "M", species: "caprino", breed: "Saanen", ptaLeite: 210, photo: "https://images.unsplash.com/photo-1533048347196-262953216292?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "M04", tag: "REG-1209", name: "Lacaune Imperial", gender: "M", species: "ovino", breed: "Lacaune", ptaLeite: 260, photo: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "M05", tag: "REG-1430", name: "Milchschaf Crown", gender: "M", species: "ovino", breed: "East Friesian", ptaLeite: 245, photo: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=150&h=150&q=80" },
];

const FEMALES: Animal[] = [
  { id: "F01", tag: "REG-2301", name: "Atena do Vale", gender: "F", species: "caprino", breed: "Saanen", ptaLeite: 120, photo: "https://images.unsplash.com/photo-1542841791-1925b02a2bf8?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "F02", tag: "REG-2845", name: "Hera da Mantiqueira", gender: "F", species: "caprino", breed: "Saanen", ptaLeite: 190, photo: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "F03", tag: "REG-3122", name: "Cacau do Capril", gender: "F", species: "caprino", breed: "Alpina", ptaLeite: 135, photo: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "F04", tag: "REG-3401", name: "Lacaune Princesa", gender: "F", species: "ovino", breed: "Lacaune", ptaLeite: 220, photo: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "F05", tag: "REG-3980", name: "Estrela do Sul", gender: "F", species: "ovino", breed: "East Friesian", ptaLeite: 215, photo: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=150&h=150&q=80" },
];

// Predefined kinship coefficient matrix (F)
const getKinshipF = (maleId: string, femaleId: string): number => {
  const m = MALES.find((x) => x.id === maleId);
  const f = FEMALES.find((x) => x.id === femaleId);
  if (!m || !f || m.species !== f.species) return 0;
  if (maleId === "M01" && femaleId === "F02") return 0.25;
  if (maleId === "M03" && femaleId === "F02") return 0.125;
  if (maleId === "M03" && femaleId === "F01") return 0.0625;
  if (maleId === "M04" && femaleId === "F04") return 0.03125;
  return 0;
};

export default function AcasaladorConsanguinidade() {
  const [selectedMaleId, setSelectedMaleId] = useState<string>("");
  const [selectedFemaleId, setSelectedFemaleId] = useState<string>("");
  const [speciesFilter, setSpeciesFilter] = useState<"todos" | "caprino" | "ovino">("todos");
  const [showSuccess, setShowSuccess] = useState(false);

  const activeMale = MALES.find((m) => m.id === selectedMaleId);
  const activeFemale = FEMALES.find((f) => f.id === selectedFemaleId);

  const filteredMales = MALES.filter((m) => speciesFilter === "todos" || m.species === speciesFilter);
  const filteredFemales = FEMALES.filter((f) => speciesFilter === "todos" || f.species === speciesFilter);

  const F = activeMale && activeFemale ? getKinshipF(activeMale.id, activeFemale.id) : 0;
  const expectedPta = activeMale && activeFemale ? (activeMale.ptaLeite + activeFemale.ptaLeite) / 2 : 0;

  // Status
  let statusColor = "bg-stone-100 text-stone-600 border-stone-200";
  let statusTitle = "Selecione um macho e uma fêmea para simular";
  let statusBadge = "neutral";

  if (activeMale && activeFemale) {
    if (activeMale.species !== activeFemale.species) {
      statusColor = "bg-red-50 text-red-700 border-red-200";
      statusTitle = "Espécies incompatíveis";
      statusBadge = "incompatible";
    } else if (F >= 0.125) {
      statusColor = "bg-red-50 text-red-700 border-red-200";
      statusTitle = `Consanguinidade crítica (${(F * 100).toFixed(1)}%) — Bloqueado`;
      statusBadge = "critical";
    } else if (F >= 0.0625) {
      statusColor = "bg-amber-50 text-amber-700 border-amber-200";
      statusTitle = `Parentesco próximo (${(F * 100).toFixed(2)}%) — Atenção`;
      statusBadge = "warning";
    } else {
      statusColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
      statusTitle = `Acasalamento seguro (${(F * 100).toFixed(2)}%)`;
      statusBadge = "safe";
    }
  }

  const handleConfirm = () => {
    if (!activeMale || !activeFemale || statusBadge === "critical" || statusBadge === "incompatible") return;
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleReset = () => {
    setSelectedMaleId("");
    setSelectedFemaleId("");
  };

  return (
    <div className="bg-la rounded-3xl border border-areia shadow-sm p-6 lg:p-8 relative overflow-hidden animate-fade-in-up">
      {/* Success overlay */}
      {showSuccess && (
        <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none z-50 flex items-center justify-center animate-pulse">
          <div className="bg-emerald-600 text-la font-bold px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
            <Heart className="w-5 h-5 fill-la animate-bounce" />
            Cobertura Registrada!
          </div>
        </div>
      )}

      {/* Header centralizado */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-camurca/10 rounded-2xl flex items-center justify-center text-camurca mx-auto mb-3">
          <Dna className="w-7 h-7" />
        </div>
        <h3 className="font-serif font-bold text-2xl text-camurca">
          Acasalamento e Consanguinidade
        </h3>
        <p className="text-sm text-cabrito/60 mt-1">
          Selecione um reprodutor e uma matriz para avaliar o parentesco.
        </p>

        {/* Filtro de espécie centralizado */}
        <div className="flex justify-center mt-4">
          <div className="flex rounded-xl bg-areia/40 p-1 border border-areia">
            {(["todos", "caprino", "ovino"] as const).map((spec) => (
              <button
                key={spec}
                onClick={() => { setSpeciesFilter(spec); handleReset(); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  speciesFilter === spec
                    ? "bg-la text-pasto shadow-sm"
                    : "text-cabrito/50 hover:text-cabrito"
                }`}
              >
                {spec === "todos" ? "Todos" : spec === "caprino" ? "Caprinos" : "Ovinos"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listas lado a lado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Machos */}
        <div>
          <h4 className="font-serif font-bold text-base text-camurca mb-3 text-center">
            Reprodutores
          </h4>
          <div className="space-y-2">
            {filteredMales.map((male) => (
              <button
                key={male.id}
                onClick={() => setSelectedMaleId(male.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${
                  selectedMaleId === male.id
                    ? "border-pasto bg-pasto/5 ring-1 ring-pasto"
                    : "border-areia bg-la hover:border-broto"
                }`}
              >
                <img src={male.photo} alt={male.name} className="w-10 h-10 rounded-xl object-cover border border-areia" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-cabrito truncate">{male.name}</p>
                  <span className="text-xs text-cabrito/50">{male.breed} · PTA <strong className="text-pasto">+{male.ptaLeite}L</strong></span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Fêmeas */}
        <div>
          <h4 className="font-serif font-bold text-base text-camurca mb-3 text-center">
            Matrizes
          </h4>
          <div className="space-y-2">
            {filteredFemales.map((female) => (
              <button
                key={female.id}
                onClick={() => setSelectedFemaleId(female.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${
                  selectedFemaleId === female.id
                    ? "border-pasto bg-pasto/5 ring-1 ring-pasto"
                    : "border-areia bg-la hover:border-broto"
                }`}
              >
                <img src={female.photo} alt={female.name} className="w-10 h-10 rounded-xl object-cover border border-areia" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-cabrito truncate">{female.name}</p>
                  <span className="text-xs text-cabrito/50">{female.breed} · PTA <strong className="text-pasto">+{female.ptaLeite}L</strong></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultado centralizado */}
      <div className="max-w-lg mx-auto mt-8 space-y-4">
        {/* Par selecionado */}
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="flex-1 bg-areia/20 border border-areia rounded-2xl p-3">
            {activeMale ? (
              <>
                <img src={activeMale.photo} className="w-12 h-12 rounded-full mx-auto object-cover border border-areia mb-1.5" />
                <p className="text-xs font-bold text-cabrito truncate">{activeMale.name}</p>
                <span className="text-[10px] text-cabrito/50">{activeMale.breed}</span>
              </>
            ) : (
              <p className="text-xs text-cabrito/40 py-6">Selecione o macho</p>
            )}
          </div>

          <Heart className="w-5 h-5 text-camurca/30 shrink-0" />

          <div className="flex-1 bg-areia/20 border border-areia rounded-2xl p-3">
            {activeFemale ? (
              <>
                <img src={activeFemale.photo} className="w-12 h-12 rounded-full mx-auto object-cover border border-areia mb-1.5" />
                <p className="text-xs font-bold text-cabrito truncate">{activeFemale.name}</p>
                <span className="text-[10px] text-cabrito/50">{activeFemale.breed}</span>
              </>
            ) : (
              <p className="text-xs text-cabrito/40 py-6">Selecione a fêmea</p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className={`p-4 rounded-2xl border ${statusColor} transition-all duration-300 flex items-center gap-3`}>
          {statusBadge === "safe" && <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />}
          {statusBadge === "warning" && <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />}
          {(statusBadge === "critical" || statusBadge === "incompatible") && <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />}
          {statusBadge === "neutral" && <Info className="w-5 h-5 text-stone-500 shrink-0" />}
          <span className="font-bold text-xs">{statusTitle}</span>
        </div>

        {/* PTA esperado */}
        {activeMale && activeFemale && activeMale.species === activeFemale.species && (
          <div className="text-center bg-areia/20 border border-areia rounded-2xl p-4">
            <span className="text-[10px] uppercase font-bold text-cabrito/50 tracking-wider">PTA Esperado da Cria</span>
            <p className="font-serif font-bold text-xl text-pasto mt-1">+{expectedPta.toFixed(1)} L/lactação</p>
          </div>
        )}

        {/* Botões */}
        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            disabled={!activeMale || !activeFemale || statusBadge === "critical" || statusBadge === "incompatible"}
            className={`flex-1 py-3 rounded-full font-bold flex items-center justify-center gap-2 shadow-sm transition-all text-sm ${
              activeMale && activeFemale && statusBadge !== "critical" && statusBadge !== "incompatible"
                ? "bg-pasto hover:bg-broto text-la hover:text-cabrito"
                : "bg-stone-300 text-stone-500 cursor-not-allowed shadow-none"
            }`}
          >
            <Heart className="w-4 h-4 fill-current" />
            Confirmar Cobertura
          </button>
          <button
            onClick={handleReset}
            className="px-5 py-3 rounded-full border border-areia text-xs font-semibold text-cabrito/50 hover:text-cabrito hover:bg-areia/20 transition-colors"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}
