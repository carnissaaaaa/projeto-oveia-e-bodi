# Script de Configuração e Commit no GitHub - Capri & Ovis
# Este script ajuda a inicializar o repositório, fazer commit e subir os arquivos.

# 1. Verifica se o Git está instalado
$gitInstalled = $false
try {
    $null = git --version
    $gitInstalled = $true
} catch {
    $gitInstalled = $false
}

if (-not $gitInstalled) {
    Write-Host "=====================================================================" -ForegroundColor Yellow
    Write-Host "ATENÇÃO: O Git não foi localizado no seu sistema." -ForegroundColor Yellow
    Write-Host "Por favor, siga estes passos para prosseguir:" -ForegroundColor Yellow
    Write-Host "1. Baixe e instale o Git para Windows aqui: https://git-scm.com/download/win" -ForegroundColor Cyan
    Write-Host "2. Prossiga com a instalação padrão (clicando em Next)." -ForegroundColor White
    Write-Host "3. Feche e abra o seu editor de código/terminal novamente." -ForegroundColor White
    Write-Host "4. Execute este script novamente: .\git_setup.ps1" -ForegroundColor Green
    Write-Host "=====================================================================" -ForegroundColor Yellow
    Exit
}

# 2. Inicializa o repositório se não existir
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando repositório Git local..." -ForegroundColor Green
    git init
} else {
    Write-Host "Repositório Git já inicializado localmente." -ForegroundColor Cyan
}

# 3. Adiciona os arquivos
Write-Host "Adicionando arquivos ao estágio (staging)..." -ForegroundColor Green
git add .

# 4. Faz o commit
$commitMessage = "feat: simplificacao de modulos do SGR e criacao da apresentacao para 3 pessoas"
Write-Host "Realizando o commit: '$commitMessage'..." -ForegroundColor Green
git commit -m $commitMessage

# 5. Configuração do Remoto e Push
Write-Host ""
Write-Host "Deseja configurar o repositório remoto do GitHub e fazer o push agora? (S/N)" -ForegroundColor Yellow
$response = Read-Host

if ($response -eq "S" -or $response -eq "s") {
    $remoteUrl = Read-Host "Digite a URL do seu repositório no GitHub (ex: https://github.com/seu-usuario/seu-repositorio.git)"
    
    if ($remoteUrl) {
        # Remove origin antigo se existir
        git remote remove origin 2>$null
        
        # Adiciona e faz o push
        Write-Host "Configurando remoto 'origin' com a URL fornecida..." -ForegroundColor Green
        git remote add origin $remoteUrl
        git branch -M main
        
        Write-Host "Enviando alterações para o GitHub (pode ser necessária autenticação no navegador)..." -ForegroundColor Green
        git push -u origin main
    } else {
        Write-Host "URL inválida. O commit foi feito localmente, mas não foi enviado para o GitHub." -ForegroundColor Red
    }
} else {
    Write-Host "Operação concluída. O commit foi realizado localmente." -ForegroundColor Green
    Write-Host "Para enviar depois, configure o remoto e use: git push -u origin main" -ForegroundColor Cyan
}
