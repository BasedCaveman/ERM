# Contexto da vault e proximos passos

Este documento traduz as notas do Obsidian do projeto Empreendedor Rural Mirim em decisoes operacionais para produto, design, conteudo, facilitacao e IA.

Complemento de aprendizagem: `docs/LEARNING_DESIGN_PRINCIPLES.md` traduz referencias de memoria, motivacao, metacognicao e literacia em IA em regras de produto.

## Fontes consultadas

- `/Volumes/bigdata/ERM/Empreendedor Rural Mirim/VAULT-INDEX.md`
- `/Volumes/bigdata/ERM/Empreendedor Rural Mirim/Active Priorities.md`
- `/Volumes/bigdata/ERM/Empreendedor Rural Mirim/02 - Marca e Estrategia/Marca - ERM.md`
- `/Volumes/bigdata/ERM/Empreendedor Rural Mirim/02 - Marca e Estrategia/Publico e ICP.md`
- `/Volumes/bigdata/ERM/Empreendedor Rural Mirim/03 - Produtos/Catalogo de Produtos.md`
- `/Volumes/bigdata/ERM/Empreendedor Rural Mirim/04 - Campanhas/Estrategia de Funil - ERM.md`
- `/Volumes/bigdata/ERM/Empreendedor Rural Mirim/06 - Recursos/Mapa de Ativos.md`

## Leitura central

O ERM deve ser construido como um ecossistema narrativo de aprendizagem, nao como um curso linear nem como um app de tarefas. A experiencia precisa levar criancas e jovens a observar sinais do territorio, conversar com pessoas reais, formular hipoteses, prototipar solucoes pequenas, testar, refletir e compartilhar descobertas.

O produto vende para adultos, mas a experiencia precisa pertencer as criancas. A promessa nao e "empreendedorismo infantil" de forma generica. A promessa e formar criancas curiosas, autonomas e capazes de transformar observacao em acao.

## Decisoes de produto

1. A entrada do ecossistema deve separar as quatro trilhas de forma ludica e clara:
   - Oficina da Vila: 7 a 10 anos, contexto rural.
   - Missao Bairro: 7 a 10 anos, contexto urbano.
   - Laboratorio das Colinas: 12 a 14 anos, contexto rural.
   - Cidade Infinita: 12 a 14 anos, contexto urbano.
2. A narrativa da trilha deve nascer dos interesses que a crianca declara no onboarding. Esses interesses devem mudar exemplos, objetos, perguntas, desafios e imagens de apoio.
3. Toda fase precisa equilibrar tela e mundo real. A tela provoca, organiza e devolve memoria; a aprendizagem acontece tambem em entrevistas, observacoes, desenhos, testes e conversas.
4. O progresso deve ser cooperativo. Evitar ranking individual como eixo central.
5. A IA entra como colaboradora criativa e facilitadora organizada. Ela ajuda a prototipar, testar, refinar e comunicar ideias, mas nao substitui o pensamento da crianca.

## Arquitetura hibrida de facilitacao

O painel de facilitadores deve combinar resposta rapida de IA com leitura humana mais profunda.

### Agente IA

- Responde rapido quando a crianca ou o grupo precisa organizar pensamento.
- Faz uma pergunta principal por vez.
- Pede evidencias antes de sugerir solucoes.
- Separa observacao, hipotese, decisao e proximo teste.
- Adapta linguagem a idade, contexto e interesses.
- Sugere uma pequena acao fora da tela quando a missao pede evidencias reais.
- Recusa autoria total: a decisao final precisa ser do grupo.

### Facilitador humano

- Atua quando ha bloqueio emocional, conflito, falta de sentido, baixa participacao ou dilema etico.
- Ajuda a turma a refletir sobre escolhas, colaboracao e impacto.
- Interpreta sinais que a IA nao deve resolver sozinha.
- Decide quando desacelerar, mudar a pergunta ou trazer comunidade e familia para perto.

### Regras de escalonamento

- Escalar para humano quando houver frustracao repetida, conflito entre criancas, exposicao sensivel de dados pessoais, dificuldade persistente de colaboracao ou decisao com impacto real na comunidade.
- Manter com IA quando o pedido for organizacao de ideias, reescrita, comparacao de hipoteses, preparacao de entrevista, resumo de evidencias ou sugestao de proximo teste.
- Registrar sempre o motivo do escalonamento no caderno do facilitador.

## Prioridade de mercado

Enquanto monetizacao nao estiver decidida, o caminho mais seguro e construir prova real com escola e educador:

- Avatar primario: escola/rede de ensino.
- Avatar secundario: educador individual entusiasta.
- Conversao inicial: piloto com uma turma, nao venda completa.
- Lead magnet provavel: uma missao-amostra ou guia pratico sobre como ensinar empreendedorismo explorando o territorio.
- Conteudo inicial: bastidores de missoes, exemplos rural vs urbano, caderno de campo de turma-teste e tese "por que nao e apenas um curso de empreendedorismo".

## Riscos e guardrails

- Uso dos manuais da Junior Achievement precisa de revisao juridica antes de publicar conteudo literal.
- Fotos, audios, desenhos e relatos de criancas exigem autorizacao e politica clara de privacidade.
- A IA nao deve incentivar dependencia nem responder pelo grupo.
- A experiencia mobile/PWA precisa continuar sendo primeira classe, com controles simples, leitura confortavel e registro rapido em campo.
- Animacoes devem enriquecer mudancas de estado sem gerar ruido, respeitando `prefers-reduced-motion`.

## Proximos passos de produto

### Agora

1. Transformar o onboarding atual em um "portal de trilhas" mais completo, com interesses, tom narrativo e convite para primeira missao.
2. Refinar o motor simples de narrativa ja iniciado no PWA: `trilha + idade + contexto + interesses + fase atual -> provocacao, exemplo, desafio, evidencia esperada`.
3. Expandir o caderno de campo para aceitar evidencias por tipo, reflexoes e decisao do grupo.
4. Evoluir o painel do facilitador com fila de roadblocks, sugestao rapida de IA, status humano e historico por grupo.
5. Definir uma missao-amostra publicavel sem copiar texto literal dos manuais.

### Em seguida

1. Modelar dados persistentes para turma, grupo, crianca, facilitador, trilha, fase, evidencia, mural e roadblock.
2. Preparar modo piloto para uma turma real, com exportacao simples de relatorio para escola/educador.
3. Criar uma biblioteca visual inicial: mapas, artefatos, cartas de ajuda, selos cooperativos e estados vazios.
4. Desenhar prompts sistemicos da IA facilitadora com limites de seguranca e escalonamento humano.
5. Criar FAQ para escola, educador, familia e gestor publico.

### Depois do piloto

1. Converter evidencias do piloto em caso de uso e prova social.
2. Refinar as quatro trilhas com base em registros reais.
3. Decidir modelo de monetizacao.
4. Desenhar funil completo de produto.
5. Planejar expansao para regioes, temporadas, eventos comunitarios e missoes recombinaveis.

## Definicao de pronto para a proxima etapa

A proxima etapa esta pronta quando o PWA permitir que uma crianca escolha uma trilha, selecione interesses, receba uma missao inicial personalizada, registre uma evidencia e gere um roadblock visivel para o facilitador. Esse fluxo deve funcionar bem em mobile e preservar a tese: IA como parceira, territorio como sala de aula e crianca como autora da solucao.
