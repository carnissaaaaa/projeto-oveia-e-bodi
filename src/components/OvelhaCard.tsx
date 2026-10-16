import React from "react";

export type OvelhaCardProps = {
  nome: string;
  raca: string;
  imagem: string;
  idade?: string;
  ptaLeite?: number;
  selecionado?: boolean;
  onSelecionar?: () => void;
};

export default function OvelhaCard({
  nome,
  raca,
  imagem,
  idade,
  ptaLeite,
  selecionado = false,
  onSelecionar,
}: OvelhaCardProps) {
  return (
    <button
      type="button"
      onClick={onSelecionar}
      className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${
        selecionado
          ? "border-pasto bg-pasto/5 ring-1 ring-pasto"
          : "border-areia bg-la hover:border-broto"
      }`}
    >
      <img
        src={imagem}
        alt={nome}
        className="w-10 h-10 rounded-xl object-cover border border-areia shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-cabrito truncate">{nome}</p>
        <span className="text-xs text-cabrito/50">
          {raca}
          {idade && <> · {idade}</>}
          {ptaLeite !== undefined && (
            <> · PTA <strong className="text-pasto">+{ptaLeite}L</strong></>
          )}
        </span>
      </div>
    </button>
  );
}
