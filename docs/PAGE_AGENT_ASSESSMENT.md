# Avaliacao tecnica: PageAgent no ERM

## Resumo

PageAgent e uma biblioteca real e recente da Alibaba para controlar interfaces web por linguagem natural. Ela pode ser util no ERM, mas nao deve ser integrada via CDN demo nem liberada diretamente para criancas neste momento.

Recomendacao: testar apenas como copiloto interno do facilitador, em ambiente de homologacao, com BYOK ou endpoint proprio, feature flag e paginas sem dados sensiveis.

## O que parece promissor

- Funciona dentro da pagina, sem extensao obrigatoria, Python ou browser headless.
- Usa analise textual do DOM, o que combina com nosso PWA baseado em botoes, formularios, caderno, mural e painel do facilitador.
- Pode ajudar facilitadores adultos em tarefas repetitivas: navegar para Caderno, preencher rascunhos, localizar roadblocks, copiar relatorio de piloto e revisar checklist.
- O modelo BYOK permite escolher provedor LLM, em vez de depender do endpoint de demo.
- A proposta de acessibilidade por linguagem natural pode ser relevante para educadores e facilitadores com necessidades de apoio.

## Alertas importantes

- O CDN demo e a API gratuita sao apenas para avaliacao tecnica, nao producao.
- A API de teste proibe dados pessoais, paginas com dados sensiveis e uso em produtos reais.
- O fluxo envia instrucao e estrutura simplificada da pagina ao provedor LLM configurado.
- A limpeza de HTML nao garante remocao de informacoes sensiveis visiveis na tela.
- A documentacao indica entendimento textual, sem visao de imagem e sem interacoes complexas como drag-and-drop.
- A API de teste processa dados em infraestrutura Alibaba Cloud na China.
- A propria politica menciona que software/API nao sao destinados a menores de 13 anos ou abaixo da idade minima de consentimento digital local.

## Encaixe no ERM

### Bom encaixe

- Modo facilitador: "abra o resumo de piloto", "copie o relatorio", "marque checklist de consentimento", "mostre roadblocks abertos".
- Acessibilidade para adultos: comandos de voz/texto para navegar pelo painel.
- QA interno: testar fluxos de UI por linguagem natural durante desenvolvimento.

### Mau encaixe agora

- Usar com criancas diretamente.
- Usar o CDN demo em producao.
- Permitir tarefas que alterem registros sem confirmacao humana.
- Usar em telas com nomes de criancas, fotos, audios, relatos sensiveis ou credenciais.

## Plano de prova controlada

1. Criar flag `NEXT_PUBLIC_ENABLE_PAGE_AGENT=false` por padrao.
2. Instalar via npm, nao CDN demo.
3. Carregar PageAgent apenas na area do facilitador e apenas em ambiente de homologacao.
4. Usar BYOK ou endpoint interno com politica de dados adequada.
5. Marcar campos sensiveis com atributos de exclusao/blacklist quando a biblioteca suportar.
6. Permitir apenas comandos de leitura/navegacao no primeiro teste.
7. Exigir confirmacao humana antes de escrever, apagar ou enviar dados.
8. Testar com dados ficticios de turma.

## Veredito

E uma boa candidata para um experimento futuro no painel do facilitador, nao para a experiencia central das criancas. Para o ERM, a direcao correta e "assistente operacional do educador", nao "agente livre controlando a jornada da crianca".

## Fontes

- Repositorio oficial: https://github.com/alibaba/page-agent
- README oficial: https://raw.githubusercontent.com/alibaba/page-agent/main/README.md
- Termos e privacidade: https://raw.githubusercontent.com/alibaba/page-agent/main/docs/terms-and-privacy.md
- NPM: https://www.npmjs.com/package/page-agent
