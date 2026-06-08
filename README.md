# Trilhas Empreendedoras Mirins - PWA Next.js

Este pacote recria os dois manuais como uma base interativa para website/PWA.

## O que está incluído
- Next.js + React com App Router.
- PWA com manifest e service worker via `@next/pwa`.
- 4 trilhas: 7-10 rural, 7-10 urbano, 12-14 rural, 12-14 urbano.
- Interface em português, inglês e espanhol.
- Gamificação cooperativa, sem ranking agressivo.
- Atividades dentro e fora da tela.
- Base para assistente interno inspirado no manual do Adviser.
- Conteúdo extraído dos PDFs em `content/manuals`.

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
1. Revisar juridicamente o uso integral dos manuais antes de publicar conteúdo literal.
2. Transformar cada fase extraída em cartões curtos por idade/contexto.
3. Conectar banco de dados para progresso por turma.
4. Adicionar painel do facilitador com observações de cada encontro.
5. Integrar IA apenas como apoio de curadoria: organizar respostas, revisar texto, sugerir melhorias e gerar imagens autorizadas.
