# Brota! - Plataforma de trilhas de aprendizagem

Este pacote implementa uma experiência autoral de aprendizagem empreendedora para website/PWA. O ERM dialoga com repertórios que Pedro ajudou a desenvolver na Junior Achievement, mas não copia o modelo nem utiliza textos originários das apostilas.

## O que está incluído
- Next.js + React com App Router.
- PWA com manifest e service worker via `@next/pwa`.
- Piloto atual concentrado na **Trilha Nossa Terra**, para crianças de 7 a 10 anos.
- As demais trilhas permanecem como horizonte de expansão, sem disputar atenção com a validação do piloto.
- Interface em português, inglês e espanhol.
- Gamificação cooperativa, sem ranking agressivo.
- Atividades dentro e fora da tela.
- Base para uma IA facilitadora autoral, que organiza evidências sem decidir pela criança ou pelo grupo.
- Acervo histórico de referência em `content/manuals`, separado do conteúdo autoral entregue pelo produto.
- Onboarding infantil em três passos, com uma única próxima ação visível.
- Área adulta independente em `/facilitador`, pronta para um subdomínio próprio.
- Caderno offline da criança em `public/materials/trilha-nossa-terra-caderno-da-crianca.pdf`.
- Interesses alteram pergunta, atividade, evidência e próximo teste nas 14 missões; a auditoria mobile está em `docs/AUDITORIA_UX_MOBILE_TRILHA_NOSSA_TERRA.md`.
- Perfis infantis pseudônimos, com nome escolhido e avatar, ficam somente no aparelho e mantêm interesses e progresso separados.
- Câmera e microfone não são abertos na área infantil. A captura individual ou em massa acontece na área adulta e os arquivos são descartados após a confirmação.

## Área do facilitador em subdomínio

Configure `FACILITATOR_HOST=facilitador.seudominio.com` no ambiente de produção e aponte esse domínio para o mesmo projeto. O proxy reescreve a raiz desse host para `/facilitador`; a plataforma principal continua focada apenas na criança.

Até o DNS ser configurado, a área pode ser validada diretamente em `/facilitador`.

No piloto, a entrada adulta usa uma confirmação local e transparente, não uma autenticação real. A implantação deverá conectar Google Auth apenas para responsáveis e facilitadores, sem criar login infantil nem enviar perfis, interesses, progresso, imagens ou áudios das crianças ao servidor.

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
1. Validar as 14 missões da Trilha Nossa Terra com educadores e uma turma-piloto de município rural com menos de 40 mil habitantes.
2. Refinar o Caderno da Criança e o Guia do Facilitador com base nas evidências do piloto.
3. Conectar banco de dados para progresso por turma quando o fluxo validado exigir persistência compartilhada.
4. Evoluir o painel do facilitador com observações de cada encontro.
5. Integrar IA apenas como apoio de curadoria: organizar respostas, revisar texto, sugerir melhorias e gerar imagens autorizadas.
