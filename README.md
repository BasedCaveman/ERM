# Trilhas Empreendedoras Mirins - PWA Next.js

Este pacote implementa uma experiência autoral de aprendizagem empreendedora para website/PWA. O ERM dialoga com repertórios que Pedro ajudou a desenvolver na Junior Achievement, mas não copia o modelo nem utiliza textos originários das apostilas.

## O que está incluído
- Next.js + React com App Router.
- PWA com manifest e service worker via `@next/pwa`.
- Piloto atual concentrado em uma jornada completa: Oficina da Vila, trilha rural de 7 a 10 anos.
- As demais trilhas permanecem como horizonte de expansão, sem disputar atenção com a validação do piloto.
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
1. Validar as 14 missões da Oficina da Vila com educadores e uma turma-piloto de município rural com menos de 40 mil habitantes.
2. Refinar o Caderno da Criança e o Guia do Facilitador com base nas evidências do piloto.
3. Conectar banco de dados para progresso por turma quando o fluxo validado exigir persistência compartilhada.
4. Evoluir o painel do facilitador com observações de cada encontro.
5. Integrar IA apenas como apoio de curadoria: organizar respostas, revisar texto, sugerir melhorias e gerar imagens autorizadas.
