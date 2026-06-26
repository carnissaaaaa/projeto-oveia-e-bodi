"use client";

import React, { useState } from "react";
import { Eye, CheckCircle2, FlaskConical, Save } from "lucide-react";

interface FamachaLevel {
  grade: number;
  color: string;
  borderColor: string;
  status: "Saudável" | "Alerta" | "Crítico";
  description: string;
  treatmentRequired: boolean;
}

const FAMACHA_GRADES: FamachaLevel[] = [
  { grade: 1, color: "#E11D48", borderColor: "#BE123C", status: "Saudável", description: "Mucosa vermelha intensa. Sem anemia.", treatmentRequired: false },
  { grade: 2, color: "#FB7185", borderColor: "#F43F5E", status: "Saudável", description: "Mucosa vermelha clara. Animal saudável.", treatmentRequired: false },
  { grade: 3, color: "#FCA5A5", borderColor: "#F87171", status: "Alerta", description: "Mucosa rosa pálida. Limite da anemia, avaliar tratamento.", treatmentRequired: true },
  { grade: 4, color: "#FEE2E2", borderColor: "#FCA5A5", status: "Crítico", description: "Mucosa rosa esbranquiçada. Anemia severa, tratamento obrigatório.", treatmentRequired: true },
  { grade: 5, color: "#FFFFFF", borderColor: "#FF0000", status: "Crítico", description: "Mucosa branca. Risco de óbito, emergência.", treatmentRequired: true },
];

interface TreatmentDrug {
  name: string;
  dosePerKg: number;
  unit: string;
}

const DRUGS: Record<"caprino" | "ovino", TreatmentDrug[]> = {
  caprino: [
    { name: "Moxidectina 0.2%", dosePerKg: 0.2, unit: "mL" },
    { name: "Levamisol 7.5%", dosePerKg: 0.15, unit: "mL" },
    { name: "Monepantel (Zolvix)", dosePerKg: 0.1, unit: "mL" },
  ],
  ovino: [
    { name: "Ivermectina 1%", dosePerKg: 0.1, unit: "mL" },
    { name: "Albendazol 10%", dosePerKg: 0.075, unit: "mL" },
    { name: "Monepantel (Zolvix)", dosePerKg: 0.05, unit: "mL" },
  ],
};

export default function DiagnosticoFamacha() {
  const [selectedGrade, setSelectedGrade] = useState<number>(3);
  const [animalName, setAnimalName] = useState<string>("Mel");
  const [species, setSpecies] = useState<"caprino" | "ovino">("caprino");
  const [weight, setWeight] = useState<number>(45);
  const [selectedDrugIndex, setSelectedDrugIndex] = useState<number>(0);

  const activeLevel = FAMACHA_GRADES.find((g) => g.grade === selectedGrade)!;
  const activeDrugs = DRUGS[species];
  const activeDrug = activeDrugs[selectedDrugIndex] || activeDrugs[0];
  const calculatedDosage = (weight * activeDrug.dosePerKg).toFixed(1);

  return (
    <div className="bg-la rounded-3xl border border-areia shadow-sm p-6 lg:p-8 animate-fade-in-up">
      {/* Header centralizado */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-milho/10 rounded-2xl flex items-center justify-center text-milho mx-auto mb-3">
          <Eye className="w-7 h-7" />
        </div>
        <h3 className="font-serif font-bold text-2xl text-camurca">Diagnóstico FAMACHA©</h3>
        <p className="text-sm text-cabrito/60 mt-1">
          Avalie a coloração da mucosa ocular para estimar o grau de anemia.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Dados do animal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-cabrito/60 uppercase mb-1">Nome do Animal</label>
            <input
              type="text"
              value={animalName}
              onChange={(e) => setAnimalName(e.target.value)}
              placeholder="Ex: Mel"
              className="w-full px-3 py-2 border border-areia bg-la rounded-xl focus:outline-none focus:border-pasto text-sm text-cabrito"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-cabrito/60 uppercase mb-1">Espécie</label>
            <select
              value={species}
              onChange={(e) => { setSpecies(e.target.value as "caprino" | "ovino"); setSelectedDrugIndex(0); }}
              className="w-full px-3 py-2 border border-areia bg-la rounded-xl focus:outline-none focus:border-pasto text-sm text-cabrito"
            >
              <option value="caprino">Caprino</option>
              <option value="ovino">Ovino</option>
            </select>
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold text-cabrito/60 uppercase mb-1">
              <span>Peso</span>
              <span className="text-pasto font-serif">{weight} kg</span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-2 bg-areia rounded-lg appearance-none cursor-pointer accent-pasto mt-2"
            />
          </div>
        </div>

        {/* Seletor de grau FAMACHA */}
        <div>
          <label className="block text-sm font-semibold text-cabrito mb-3 text-center">
            Grau FAMACHA© (Coloração da Mucosa)
          </label>
          <div className="grid grid-cols-5 gap-3 max-w-md mx-auto">
            {FAMACHA_GRADES.map((level) => (
              <button
                key={level.grade}
                onClick={() => setSelectedGrade(level.grade)}
                style={{
                  backgroundColor: level.color,
                  borderColor: selectedGrade === level.grade ? "#2C2A29" : level.borderColor,
                  borderWidth: selectedGrade === level.grade ? "4px" : "1px",
                }}
                className="h-16 rounded-2xl relative shadow-sm hover:scale-[1.05] transition-all flex flex-col items-center justify-center font-bold"
              >
                <span className={`text-sm ${level.grade >= 4 ? "text-red-600" : "text-la"}`}>
                  G{level.grade}
                </span>
                {selectedGrade === level.grade && (
                  <span className="absolute bottom-1 w-2 h-2 rounded-full bg-cabrito"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Resultado */}
        <div className="bg-areia/20 border border-areia rounded-3xl p-6 text-center space-y-4">
          {/* Status badge */}
          <div className="flex justify-center">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
              activeLevel.status === "Saudável"
                ? "bg-emerald-100 text-emerald-800"
                : activeLevel.status === "Alerta"
                ? "bg-amber-100 text-amber-800"
                : "bg-red-100 text-red-800"
            }`}>
              Grau {activeLevel.grade} · {activeLevel.status}
            </span>
          </div>

          <p className="text-sm text-cabrito/80 leading-relaxed max-w-md mx-auto">
            {activeLevel.description}
          </p>

          {/* Tratamento ou ok */}
          {activeLevel.treatmentRequired ? (
            <div className="bg-la border border-areia rounded-2xl p-4 max-w-sm mx-auto space-y-3">
              <h5 className="text-xs font-bold uppercase text-camurca tracking-wider flex items-center justify-center gap-2">
                <FlaskConical className="w-4 h-4 text-pasto" />
                Tratamento Sugerido
              </h5>
              <select
                value={selectedDrugIndex}
                onChange={(e) => setSelectedDrugIndex(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-areia bg-la rounded-xl focus:outline-none focus:border-pasto text-xs text-cabrito"
              >
                {activeDrugs.map((drug, index) => (
                  <option key={index} value={index}>{drug.name}</option>
                ))}
              </select>
              <div className="text-center">
                <span className="text-[10px] text-cabrito/50 uppercase font-bold block">Dosagem</span>
                <strong className="text-xl text-pasto font-serif">{calculatedDosage} {activeDrug.unit}</strong>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-center gap-3 max-w-sm mx-auto">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs text-emerald-700">
                Animal saudável. Vermifugação desnecessária.
              </span>
            </div>
          )}

          {/* Botão salvar */}
          <button
            className="mx-auto py-3 px-8 bg-pasto hover:bg-broto text-la hover:text-cabrito rounded-full font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Salvar Diagnóstico
          </button>
        </div>
      </div>
    </div>
  );
}
