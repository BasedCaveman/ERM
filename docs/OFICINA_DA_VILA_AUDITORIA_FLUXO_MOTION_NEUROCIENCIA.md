# Oficina da Vila — auditoria de fluxo, motion e evidências de aprendizagem

## Decisão

A jornada mantém um arco motivacional forte se alternar **exploração → tensão possível → evidência de realização → novo desafio**. O desafio não deve subir durante muitas fases seguidas sem uma colheita visível. A conquista também não pode ser apenas animação ou insígnia: precisa mostrar algo que a criança agora consegue observar, explicar, construir ou revisar.

Esta auditoria usa três lentes diferentes, sem confundi-las:

- **Perestroika:** método empírico de desenho de experiência; útil para tese, entrega mínima, momento-âncora, processamento, mapa conectivo e fator dia seguinte.
- **Emil/Emill:** critério de design engineering para decidir quando o movimento ajuda a compreender estado, ação e conquista.
- **Neurociência no acervo:** evidências e limites sobre atenção, memória, emoção, estresse, evocação e consolidação. Não prova automaticamente que uma interface ou atividade específica funciona.

## Curva de desafio e realização

| Fases | Função no arco | Desafio | Realização que sustenta o fluxo | Risco | Ajuste de facilitação |
|---|---|---:|---|---|---|
| 1–2 | Pertencimento e significado | baixo–médio | reconhecer lugares e pessoas que fazem a vila funcionar | fácil demais para crianças com repertório maior | permitir pistas menos óbvias e justificativa própria |
| 3–4 | Incerteza segura e equipe | médio | decidir com pistas e cumprir um papel visível | voz mais rápida dominar | rodar papéis e reconhecer mudança de decisão |
| 5 | Primeiro pico de exposição | alto | conseguir escutar e registrar uma surpresa real | ansiedade, privacidade, pergunta invasiva | ensaio, dupla, escolha de interlocutor e alternativa sem áudio/foto |
| 6–7 | Colheita e nova autonomia | médio | organizar o balaio de pistas e escolher entre três ideias | fase 6 ficar abstrata | usar objetos/cestos no chão; fase 7 devolve jogo e escolha |
| 8 | Segundo pico: construir | alto | produzir uma primeira versão que consegue conversar | perfeccionismo ou adulto construir | limite de tempo, materiais simples e critério mínimo explícito |
| 9 | Colheita sistêmica | médio–alto | enxergar o caminho e encontrar um parceiro | linguagem abstrata de canvas | cartões concretos, percurso físico e uma dependência por vez |
| 10 | Terceiro pico: crítica real | alto | transformar uma observação em mudança decidida | crítica virar julgamento pessoal | teste silencioso curto, roteiro de feedback e direito de pausar |
| 11 | Realização cooperativa | médio | antes/depois e ajuda com nome | competição estética | reconhecer pedidos e ofertas específicos, não acabamento |
| 12 | Organização da memória | médio | contar pergunta, pista, tentativa e mudança | decorar fala sem compreender | reconstruir a história usando artefatos anteriores |
| 13 | Pico público com autoria | alto | responder com evidência e admitir limites | exposição e comparação | papéis diversos, convidados orientados e apresentação em pequenos ciclos |
| 14 | Transferência e fechamento | médio | próximo cuidado específico em até duas semanas | promessa vaga ou encerramento anticlimático | recuperar uma pista da fase 1 e mostrar o que mudou |

## Ficha Perestroika para cada fase

Cada encontro deve explicitar antes de começar:

1. **Tese:** o que a experiência torna observável.
2. **Entrega mínima:** a menor evidência que demonstra movimento real.
3. **Momento-âncora:** a ação que a criança lembrará e poderá explicar.
4. **Processamento:** palpite anterior, pista nova e mudança de compreensão.
5. **Mapa conectivo:** qual artefato anterior é recuperado e qual próxima fase ele alimenta.
6. **Fator dia seguinte:** onde a criança pode reutilizar a postura fora da jornada.

## Onde a animação cabe

| Antes | Depois | Por quê |
|---|---|---|
| Todos os cartões entram em cascata a cada troca de tela | Somente mapa/guia que orienta a leitura recebe entrada curta de 300 ms | Evita movimento decorativo e competição pela atenção |
| Conclusão altera apenas número e barra | Pista de evidência recebe um pequeno assentamento de 360 ms | Liga movimento a uma conquista cognitiva real |
| Botões sem resposta tátil visual | `scale(0.98)` por 160 ms no toque | Confirma imediatamente a ação sem atrasar navegação frequente |
| Motion tratado apenas no JavaScript | Regra CSS global para `prefers-reduced-motion` | Mantém a experiência acessível e previsível |

Não animar texto durante leitura, navegação por teclado, todos os cartões de fase ou elementos sem mudança de estado. Possíveis extensões após teste: traço do caminho entre capítulos quando uma fase é concluída; carta “troca de rota” virando ao registrar mudança de hipótese; reunião cooperativa das pistas no mutirão. Todas precisam ser testadas com crianças, inclusive sem motion.

## Evidências de aprendizagem encontradas no acervo

### Aplicações sustentáveis

- **Atenção é limitada:** uma ação dominante e movimento seletivo reduzem disputa por recursos atencionais.
- **Memória de trabalho é transitória:** instruções curtas, uma pergunta por vez, cartões concretos e artefatos externos reduzem a necessidade de manter muitas partes mentalmente.
- **Evocação reconstrói:** abrir cada fase recuperando uma pista anterior favorece elaboração; o registro serve para comparar versões, não para tratar lembrança como reprodução perfeita.
- **Consolidação depende de tempo e estado:** espaçar fases, encerrar com síntese e retomar no encontro seguinte é mais defensável do que comprimir o arco inteiro.
- **Emoção moderada pode favorecer lembrança; estresse excessivo prejudica:** surpresa e desafio entram com escolha, ensaio, segurança e direito de pausar, especialmente nas fases 5, 10 e 13.
- **Motivação e sentido modulam aprendizagem:** problemas reconhecíveis do território, escolha real e devolução à comunidade fortalecem relevância sem depender de prêmio externo.
- **Plasticidade não significa aprendizagem instantânea:** a validação deve procurar mudança ao longo de tentativas e transferência posterior, não reação entusiasmada em uma sessão.

### Limites e neuromitos a evitar

- Não alegar que emojis, cores, “lado direito do cérebro” ou um tipo de animação ativam aprendizagem por si só.
- Não classificar crianças por estilo visual, auditivo ou cinestésico.
- Não usar linguagem de dopamina como justificativa para recompensa, surpresa ou gamificação.
- Não confundir engajamento momentâneo, diversão ou lembrança de uma cena com compreensão e transferência.

## Protocolo de validação

Em cada fase, registrar quatro sinais rápidos:

1. **Desafio percebido:** fácil demais / na medida / difícil demais.
2. **Realização reconhecida:** a criança consegue apontar o que agora sabe fazer ou explicar?
3. **Recuperação:** no encontro seguinte, usa uma pista anterior sem releitura completa?
4. **Transferência:** aplica a postura em outro problema, lugar ou situação?

Registrar também tempo até começar, pedidos de ajuda, abandono, participação desigual e se a animação orientou, distraiu ou passou despercebida. A curva ideal é hipótese de campo; somente observação repetida poderá calibrá-la.
