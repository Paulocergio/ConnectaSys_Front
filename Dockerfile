# Etapa 1: build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Só precisa rodar build, pois 'output: export' já faz o trabalho
RUN npm run build

# Etapa 2: imagem final
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

# Copia a pasta gerada automaticamente com 'output: export'
COPY --from=builder /app/out ./

EXPOSE 80

CMD ["serve", "-s", ".", "-l", "80"]
