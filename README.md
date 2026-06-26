# Capri & Ovis - Portal de Ovinocaprinocultura e SGR

Trabalho de conclusão acadêmica para a disciplina de Engenharia de Software / Design de Interface. 

---

## 👥 Informações da Equipe

*   **Nome da Equipe**: congruentes
*   **Alunos**:
    *   Davi César
    *   João Kelvin
    *   Kauê Lázaro

---

## 🎨 Paleta de Cores do Projeto

Abaixo estão detalhadas as cores oficiais adotadas no design do portal Capri & Ovis, visando aproximar as cores orgânicas do campo da interface do usuário (UI) de forma rústica e sofisticada:

| Cor | Hex Code | Função no Site | Conceito e Aplicação |
| :--- | :--- | :--- | :--- |
| **Branco Lã** | `#F9F6F0` | Cor de Fundo Principal | Off-white suave que reduz o cansaço dos olhos dos técnicos em campo e remete à pelagem natural das ovelhas. |
| **Marrom Camurça** | `#8B7355` | Textos Principais / Títulos | Tom terroso escuro que substitui o preto puro, dando uma estética artesanal refinada. |
| **Verde Pasto** | `#4A6B53` | Acento Principal / Botões (CTAs) | Verde-oliva fechado associado a pastagens orgânicas, saúde e ações recomendadas. |
| **Areia Suave** | `#E6DFD3` | Cards / Fundos Secundários | Perfeito para caixas de texto e contêineres de dados estruturados. |
| **Preto Cabrito** | `#2C2A29` | Ícones / Detalhes de Alto Contraste | Grafite escuro para menus flutuantes e alta legibilidade. |
| **Milho Maduro** | `#D4A373` | Badges de Destaque / Alertas | Tom quente entre dourado e terracota, usado para prêmios e avisos moderados. |
| **Verde Broto** | `#A3B19B` | Efeitos de Hover / Bordas Suaves | Verde acinzentado bem suave usado para interatividade e feedback de clique. |

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15+ (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4 (com variáveis CSS e suporte dinâmico a Modo Escuro)
- **Ícones**: Lucide React

---

## 🖥️ Módulos do Sistema de Gerenciamento de Rebanhos (SGR)

1.  **Calculadora de Rendimento Industrial & Curva de Lactação**:
    *   Conversão volumétrica de leite de cabra, ovelha e vaca em queijos (Fresco e Curado) e requeijão de soro com base nos teores de sólidos não-gordurosos.
    *   Simulador dinâmico de produtividade ovina (Lacaune vs. East Friesian) plotado em um gráfico SVG interativo.
2.  **Painel de Acasalamento (Consanguinidade)**:
    *   Cálculo do coeficiente de parentesco $F$ e bloqueio automático de coberturas endogâmicas ($F \ge 12.5\%$).
    *   Exibição de genealogia e predição zootécnica de PTA da progênie (cria F1).
3.  **Ficha Clínica FAMACHA© & OPG**:
    *   Diagnóstico ocular móvel associado a contagens laboratoriais de OPG (McMaster) com classificação genotípica em Resistente (RR), Tolerante (RS) ou Suscetível (SS).
    *   Indicação de vermífugo e dosagem exata calculada com base no peso vivo do animal.
4.  **Diretório Capragene®**:
    *   Filtro regional interativo por estado (SP, MG, RJ, ES) através de um mapa georreferenciado SVG interativo dos 19 produtores parceiros oficiais do programa zootécnico nacional.

---

## 📸 Imagens de Leiautes (Mockups)

Conforme as exigências do projeto, as capturas de tela e mockups planejados encontram-se na pasta:
- [assets/](assets/)

---

## 🚀 Como Executar o Projeto Localmente (na sua máquina)

1.  Instale as dependências:
    ```bash
    npm install
    ```
2.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
3.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver e testar o portal Capri & Ovis.
