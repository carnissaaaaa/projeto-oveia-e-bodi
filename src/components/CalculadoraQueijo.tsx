"use client";

import React, { useState } from "react";
import { Calculator, Beaker, Milk } from "lucide-react";

type BreedKey = "cabra" | "ovelha" | "vaca";

interface YieldMetrics {
  fresco: number;
  curado: number;
  requeijao: number;
}

interface MilkComposition {
  gordura: number;
  proteina: number;
  lactose: number;
  solidos: number;
  ph: string;
  densidade: string;
}

const YIELD_FACTORS: Record<BreedKey, YieldMetrics> = {
  vaca: { fresco: 5.0, curado: 10.0, requeijao: 6.0 },
  cabra: { fresco: 4.5, curado: 8.0, requeijao: 6.0 },
  ovelha: { fresco: 3.5, curado: 5.5, requeijao: 6.0 },
};

const COMPOSITIONS: Record<BreedKey, MilkComposition> = {
  cabra: { gordura: 3.65, proteina: 3.25, lactose: 4.25, solidos: 8.90, ph: "6.50 – 6.80", densidade: "1.030 – 1.034" },
  ovelha: { gordura: 7.90, proteina: 6.03, lactose: 4.15, solidos: 12.00, ph: "6.63 – 6.65", densidade: "1.036" },
  vaca: { gordura: 3.60, proteina: 3.20, lactose: 4.70, solidos: 9.00, ph: "6.60 – 6.70", densidade: "1.028 – 1.032" },
};

export default function CalculadoraQueijo() {
  const [volume, setVolume] = useState<number>(100);
  const [selectedBreed, setSelectedBreed] = useState<BreedKey>("ovelha");

  const factors = YIELD_FACTORS[selectedBreed];
  const comp = COMPOSITIONS[selectedBreed];
  const frescoKg = (volume / factors.fresco).toFixed(2);
  const curadoKg = (volume / factors.curado).toFixed(2);
  const requeijaoCopos = Math.floor(volume / factors.requeijao);

  return (
    <div className="bg-la rounded-3xl border border-areia shadow-sm p-6 lg:p-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-pasto/10 rounded-2xl flex items-center justify-center text-pasto">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-xl text-camurca">Calculadora de Rendimento Industrial</h3>
          <p className="text-xs text-cabrito/60">
            Estime a produção de queijos com base no volume e tipo de leite.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Seleção de origem */}
          <div>
            <label className="block text-xs font-bold text-cabrito/60 uppercase mb-3">
              Origem do Leite
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["ovelha", "cabra", "vaca"] as BreedKey[]).map((breed) => (
                <button
                  key={breed}
                  onClick={() => setSelectedBreed(breed)}
                  className={`py-4 px-3 rounded-2xl border text-center transition-all duration-300 ${
                    selectedBreed === breed
                      ? "border-pasto bg-pasto text-la shadow-sm font-bold scale-[1.02]"
                      : "border-areia bg-la text-cabrito/70 hover:border-broto hover:bg-areia/30"
                  }`}
                >
                  <Milk className="w-6 h-6 mx-auto mb-2 opacity-80" />
                  <span className="block text-sm capitalize">{breed}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Volume slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-cabrito/60 uppercase">Volume de Leite</label>
              <span className="text-pasto font-bold font-serif text-lg">{volume} L</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-areia rounded-lg appearance-none cursor-pointer accent-pasto"
            />
            <div className="flex justify-between text-[10px] text-cabrito/40 mt-1">
              <span>10 L</span>
              <span>500 L</span>
              <span>1000 L</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs text-cabrito/60">Digitar volume:</span>
              <input
                type="number"
                min="0"
                value={volume}
                onChange={(e) => setVolume(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-28 px-3 py-1.5 border border-areia bg-la rounded-xl text-center focus:outline-none focus:border-pasto text-sm text-cabrito"
              />
            </div>
          </div>

          {/* Fatores de conversão */}
          <div className="bg-areia/40 border border-areia/60 rounded-2xl p-4">
            <h4 className="text-[10px] font-bold text-camurca uppercase tracking-wider mb-2">
              Fatores de Conversão
            </h4>
            <div className="grid grid-cols-3 gap-2 text-xs text-cabrito/70">
              <div>
                <span className="block text-cabrito/40 text-[10px]">Q. Fresco:</span>
                <strong className="text-cabrito">{factors.fresco} L/kg</strong>
              </div>
              <div>
                <span className="block text-cabrito/40 text-[10px]">Q. Curado:</span>
                <strong className="text-cabrito">{factors.curado} L/kg</strong>
              </div>
              <div>
                <span className="block text-cabrito/40 text-[10px]">Requeijão:</span>
                <strong className="text-cabrito">{factors.requeijao} L/unid</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="space-y-6">
          {/* Rendimento estimado */}
          <div className="bg-areia/50 border border-areia rounded-3xl p-6">
            <h4 className="text-sm font-semibold text-camurca mb-4 flex items-center gap-2">
              <Beaker className="w-4 h-4 text-pasto" />
              Rendimento Estimado
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-areia">
                <span className="text-sm text-cabrito/80">Queijo Fresco</span>
                <span className="font-serif font-bold text-xl text-pasto">{frescoKg} kg</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-areia">
                <span className="text-sm text-cabrito/80">Queijo Curado</span>
                <span className="font-serif font-bold text-xl text-camurca">{curadoKg} kg</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <div>
                  <span className="text-sm text-cabrito/80 block">Requeijão de Soro</span>
                  <span className="text-xs text-cabrito/40">(Copo de 300g)</span>
                </div>
                <span className="font-serif font-bold text-xl text-milho">{requeijaoCopos} un.</span>
              </div>
            </div>
          </div>

          {/* Ficha nutricional */}
          <div className="border border-areia rounded-3xl p-6 bg-la">
            <h4 className="text-sm font-semibold text-camurca mb-3 capitalize">
              Composição: Leite de {selectedBreed}
            </h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-2.5 bg-areia/30 rounded-xl">
                <span className="block text-[10px] text-cabrito/40 uppercase font-bold">Gordura</span>
                <span className="text-sm font-bold text-cabrito">{comp.gordura}%</span>
              </div>
              <div className="p-2.5 bg-areia/30 rounded-xl">
                <span className="block text-[10px] text-cabrito/40 uppercase font-bold">Proteína</span>
                <span className="text-sm font-bold text-cabrito">{comp.proteina}%</span>
              </div>
              <div className="p-2.5 bg-areia/30 rounded-xl">
                <span className="block text-[10px] text-cabrito/40 uppercase font-bold">Sólidos</span>
                <span className="text-sm font-bold text-cabrito">{comp.solidos}%</span>
              </div>
              <div className="p-2.5 bg-areia/30 rounded-xl">
                <span className="block text-[10px] text-cabrito/40 uppercase font-bold">pH</span>
                <span className="text-xs font-bold text-cabrito">{comp.ph}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
