# Trilhas Empreendedoras Mirins - PWA Next.js

Este pacote implementa uma experiência autoral de aprendizagem empreendedora para website/PWA. O ERM dialoga com repertórios que Pedro ajudou a desenvolver na Junior Achievement, mas não copia o modelo nem utiliza textos originários das apostilas.

## O que está incluído
- Next.js + React com App Router.
- PWA com manifest e service worker via `@next/pwa`.
- 4 trilhas: 7-10 rural, 7-10 urbano, 12-14 rural, 12-14 urbano.
- Interface em português, inglês e espanhol.
- Gamificação cooperativa, sem ranking agressivo.
- Atividades dentro e fora da tela.
- Base para uma IA facilitadora autoral, que organiza evidências sem decidir pela criança ou pelo grupo.
- Acervo histórico de referência em `content/manuals`, separado do conteúdo autoral entregue pelo produto.

## Rodar localmente
```bash
npm install
npm run dev
```

## Produção
```bash
npm run build
npm run start
```

## Próximos passos recomendados
1. Validar uma missão autoral com educadores e uma turma-piloto.
2. Refinar os cartões e a facilitação de cada fase com base nas evidências do piloto.
3. Conectar banco de dados para progresso por turma quando o fluxo validado exigir persistência compartilhada.
4. Evoluir o painel do facilitador com observações de cada encontro.
5. Integrar IA apenas como apoio de curadoria: organizar respostas, revisar texto, sugerir melhorias e gerar imagens autorizadas.
