#!/bin/bash

# Cores para saída
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # Sem cor

echo -e "${BLUE}====================================================${NC}"
echo -e "${BLUE}   Sistema de Instalação: HLT Materiais Elétricos   ${NC}"
echo -e "${BLUE}====================================================${NC}"

# Função para verificar se um comando existe
check_command() {
    if command -v "$1" &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# 1. Verificar Node.js
echo -e "\n${YELLOW}[1/4] Verificando Node.js...${NC}"
if check_command node; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✔ Node.js já está instalado (${NODE_VERSION}). Reaproveitando...${NC}"
else
    echo -e "${RED}✘ Node.js não encontrado.${NC}"
    echo -e "${BLUE}Sugestão: Instale o Node.js v18 ou superior.${NC}"
    exit 1
fi

# 2. Verificar NPM ou PNPM
echo -e "\n${YELLOW}[2/4] Verificando Gerenciador de Pacotes...${NC}"
if check_command pnpm; then
    PKG_MANAGER="pnpm"
    echo -e "${GREEN}✔ PNPM detectado. Usando para maior velocidade.${NC}"
elif check_command npm; then
    PKG_MANAGER="npm"
    echo -e "${GREEN}✔ NPM detectado. Reaproveitando...${NC}"
else
    echo -e "${RED}✘ Nenhum gerenciador de pacotes (npm/pnpm) encontrado.${NC}"
    exit 1
fi

# 3. Configurar Ambiente (.env)
echo -e "\n${YELLOW}[3/4] Configurando variáveis de ambiente...${NC}"
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}✔ Arquivo .env criado a partir do .env.example.${NC}"
        echo -e "${YELLOW}! Lembre-se de editar o .env com suas chaves de API.${NC}"
    else
        touch .env
        echo -e "${YELLOW}! .env.example não encontrado. Criado um .env vazio.${NC}"
    fi
else
    echo -e "${GREEN}✔ Arquivo .env já existe. Mantendo configurações atuais.${NC}"
fi

# 4. Instalar Dependências do Projeto
echo -e "\n${YELLOW}[4/4] Instalando dependências locais...${NC}"
echo -e "${BLUE}Executando: $PKG_MANAGER install...${NC}"

# Se for pnpm, adicionamos --no-frozen-lockfile para garantir flexibilidade no ambiente
if [ "$PKG_MANAGER" == "pnpm" ]; then
    INSTALL_CMD="$PKG_MANAGER install --no-frozen-lockfile"
else
    INSTALL_CMD="$PKG_MANAGER install"
fi

# Ignoramos erros de build scripts no pnpm pois são comuns em ambientes de sandbox
if $INSTALL_CMD || [ "$PKG_MANAGER" == "pnpm" ]; then
    echo -e "${GREEN}✔ Dependências instaladas com sucesso!${NC}"
else
    echo -e "${RED}✘ Erro ao instalar dependências.${NC}"
    exit 1
fi

echo -e "\n${BLUE}====================================================${NC}"
echo -e "${GREEN}      Instalação concluída com sucesso!             ${NC}"
echo -e "${BLUE}====================================================${NC}"
echo -e "Para iniciar o projeto em modo de desenvolvimento:"
echo -e "${YELLOW}  $PKG_MANAGER run dev${NC}"
echo -e "\nPara gerar a versão de produção:"
echo -e "${YELLOW}  $PKG_MANAGER run build${NC}"
echo -e "${BLUE}====================================================${NC}"
