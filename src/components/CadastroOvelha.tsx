"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2, CheckCircle2, Tag, AlertCircle, Sparkles } from "lucide-react";
import { Ovelha, Sexo, RACAS_POPULARES } from "@/types/ovelha";

export default function CadastroOvelha() {
  const [ovelhas, setOvelhas] = useState<Ovelha[]>([]);
  const [filtroSexo, setFiltroSexo] = useState<"todos" | "F" | "M">("todos");
  const [sucessoMsg, setSucessoMsg] = useState<string | null>(null);

  // Formulário limpo (sem campo de foto)
  const [nome, setNome] = useState("");
  const [brinco, setBrinco] = useState("");
  const [raca, setRaca] = useState<string>(RACAS_POPULARES[0]);
  const [sexo, setSexo] = useState<Sexo>("F");
  const [idade, setIdade] = useState("");
  const [pesoKg, setPesoKg] = useState<string>("");

  // Carrega do localStorage (inicia vazio)
  useEffect(() => {
    const timer = setTimeout(() => {
      const salvo = localStorage.getItem("sgr_ovelhas_reais");
      if (salvo) {
        try {
          setOvelhas(JSON.parse(salvo));
        } catch {
          setOvelhas([]);
        }
      } else {
        setOvelhas([]);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const salvarLista = (novaLista: Ovelha[]) => {
    setOvelhas(novaLista);
    localStorage.setItem("sgr_ovelhas_reais", JSON.stringify(novaLista));
  };

  const handleCadastrar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !brinco.trim()) {
      alert("Por favor, preencha o nome e o brinco da ovelha.");
      return;
    }

    const novaOvelha: Ovelha = {
      id: Date.now().toString(),
      nome: nome.trim(),
      brinco: brinco.trim().toUpperCase(),
      raca,
      sexo,
      idade: idade.trim() || "Não informada",
      pesoKg: Number(pesoKg) || 0,
    };

    const atualizada = [novaOvelha, ...ovelhas];
    salvarLista(atualizada);

    setSucessoMsg(`Ovelha "${novaOvelha.nome}" (${novaOvelha.brinco}) cadastrada com sucesso!`);
    setTimeout(() => setSucessoMsg(null), 3500);

    // Limpa campos
    setNome("");
    setBrinco("");
    setIdade("");
    setPesoKg("");
  };

  const handleRemover = (id: string, nomeAnimal: string) => {
    if (confirm(`Remover "${nomeAnimal}" da lista?`)) {
      const atualizada = ovelhas.filter((o) => o.id !== id);
      salvarLista(atualizada);
    }
  };

  // Filtragem simples por sexo
  const ovelhasFiltradas = ovelhas.filter((o) => {
    return filtroSexo === "todos" || o.sexo === filtroSexo;
  });

  const totalFemeas = ovelhas.filter((o) => o.sexo === "F").length;
  const totalMachos = ovelhas.filter((o) => o.sexo === "M").length;

  return (
    <div className="space-y-6">
      {/* Mensagem de confirmação */}
      {sucessoMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold animate-fade-in-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{sucessoMsg}</span>
        </div>
      )}

      {/* Grid: Formulário + Preview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Formulário */}
        <div className="md:col-span-7 bg-la border border-areia rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-areia pb-3">
            <PlusCircle className="w-5 h-5 text-pasto" />
            <h2 className="font-serif font-bold text-base text-camurca">
              Cadastrar Nova Ovelha
            </h2>
          </div>

          <form onSubmit={handleCadastrar} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-cabrito mb-1">
                  Nome da Ovelha *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Digite o nome..."
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-areia bg-la text-cabrito text-sm focus:outline-none focus:ring-2 focus:ring-pasto/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cabrito mb-1">
                  Brinco / Identificador *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 01, BR-100..."
                  value={brinco}
                  onChange={(e) => setBrinco(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-areia bg-la text-cabrito text-sm focus:outline-none focus:ring-2 focus:ring-pasto/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-cabrito mb-1">Raça</label>
                <select
                  value={raca}
                  onChange={(e) => setRaca(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-areia bg-la text-cabrito text-sm focus:outline-none focus:ring-2 focus:ring-pasto/40"
                >
                  {RACAS_POPULARES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-cabrito mb-1">Sexo</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSexo("F")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      sexo === "F"
                        ? "bg-rose-50 border-rose-400 text-rose-700"
                        : "bg-la border-areia text-cabrito/60 hover:border-broto"
                    }`}
                  >
                    ♀ Fêmea
                  </button>
                  <button
                    type="button"
                    onClick={() => setSexo("M")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      sexo === "M"
                        ? "bg-sky-50 border-sky-400 text-sky-700"
                        : "bg-la border-areia text-cabrito/60 hover:border-broto"
                    }`}
                  >
                    ♂ Macho
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-cabrito mb-1">
                  Idade (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: 1 ano, 8 meses..."
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-areia bg-la text-cabrito text-sm focus:outline-none focus:ring-2 focus:ring-pasto/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cabrito mb-1">
                  Peso em kg (opcional)
                </label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  placeholder="Ex: 45"
                  value={pesoKg}
                  onChange={(e) => setPesoKg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-areia bg-la text-cabrito text-sm focus:outline-none focus:ring-2 focus:ring-pasto/40"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-pasto hover:bg-broto text-la hover:text-cabrito py-2.5 px-4 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              <PlusCircle className="w-4 h-4" />
              Salvar Ovelha
            </button>
          </form>
        </div>

        {/* Preview do Card */}
        <div className="md:col-span-5 bg-la border border-areia rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="font-serif font-bold text-sm text-camurca flex items-center gap-1.5 border-b border-areia pb-2">
            <Sparkles className="w-4 h-4 text-pasto" /> Como vai ficar:
          </h3>

          <div className="border border-areia bg-areia/20 rounded-xl p-4 flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-pasto/10 border border-pasto/20 flex items-center justify-center flex-shrink-0 text-2xl select-none">
              🐑
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-pasto">
                  {brinco || "BR-000"}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.2 rounded-full font-semibold ${
                    sexo === "F" ? "bg-rose-100 text-rose-700" : "bg-sky-100 text-sky-700"
                  }`}
                >
                  {sexo === "F" ? "Fêmea" : "Macho"}
                </span>
              </div>
              <h4 className="font-serif font-bold text-base text-cabrito truncate">
                {nome || "Nome da Ovelha"}
              </h4>
              <p className="text-xs text-cabrito/60">
                {raca}
                {idade ? ` · ${idade}` : ""}
                {pesoKg ? ` · ${pesoKg} kg` : ""}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-cabrito/50 text-center">
            Preencha os campos ao lado para ver o resultado em tempo real.
          </p>
        </div>
      </div>

      {/* Listagem de Ovelhas Cadastradas */}
      <div className="bg-la border border-areia rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-areia pb-3">
          <div>
            <h3 className="font-serif font-bold text-base text-camurca flex items-center gap-2">
              <Tag className="w-4 h-4 text-pasto" /> Rebanho Cadastrado ({ovelhas.length})
            </h3>
            {ovelhas.length > 0 && (
              <p className="text-xs text-cabrito/60">
                {totalFemeas} fêmeas · {totalMachos} machos
              </p>
            )}
          </div>

          {ovelhas.length > 0 && (
            <div className="inline-flex rounded-xl border border-areia p-0.5 bg-la text-xs">
              <button
                onClick={() => setFiltroSexo("todos")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filtroSexo === "todos" ? "bg-pasto text-la" : "text-cabrito/60 hover:text-cabrito"
                }`}
              >
                Todas ({ovelhas.length})
              </button>
              <button
                onClick={() => setFiltroSexo("F")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filtroSexo === "F" ? "bg-rose-500 text-white" : "text-cabrito/60 hover:text-cabrito"
                }`}
              >
                Fêmeas ({totalFemeas})
              </button>
              <button
                onClick={() => setFiltroSexo("M")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filtroSexo === "M" ? "bg-sky-600 text-white" : "text-cabrito/60 hover:text-cabrito"
                }`}
              >
                Machos ({totalMachos})
              </button>
            </div>
          )}
        </div>

        {ovelhas.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-areia rounded-xl">
            <AlertCircle className="w-8 h-8 text-cabrito/30 mx-auto mb-2" />
            <p className="font-serif font-bold text-sm text-camurca">
              Nenhuma ovelha cadastrada
            </p>
            <p className="text-xs text-cabrito/50 mt-1">
              Preencha o formulário acima para registrar sua primeira ovelha.
            </p>
          </div>
        ) : ovelhasFiltradas.length === 0 ? (
          <p className="text-xs text-cabrito/50 text-center py-4">
            Nenhuma ovelha encontrada para este filtro.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ovelhasFiltradas.map((ovelha) => (
              <div
                key={ovelha.id}
                className="border border-areia bg-la rounded-xl p-3 flex items-center justify-between gap-3 hover:border-broto transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-lg border ${
                      ovelha.sexo === "F"
                        ? "bg-rose-50 border-rose-200 text-rose-700"
                        : "bg-sky-50 border-sky-200 text-sky-700"
                    }`}
                  >
                    🐑
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-pasto">{ovelha.brinco}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                          ovelha.sexo === "F"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-sky-50 text-sky-700"
                        }`}
                      >
                        {ovelha.sexo === "F" ? "Fêmea" : "Macho"}
                      </span>
                    </div>
                    <p className="font-serif font-bold text-sm text-cabrito truncate">
                      {ovelha.nome}
                    </p>
                    <p className="text-[11px] text-cabrito/60 truncate">
                      {ovelha.raca}
                      {ovelha.idade ? ` · ${ovelha.idade}` : ""}
                      {ovelha.pesoKg > 0 ? ` · ${ovelha.pesoKg}kg` : ""}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemover(ovelha.id, ovelha.nome)}
                  className="text-cabrito/30 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors flex-shrink-0"
                  title="Excluir ovelha"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
