# Auditoria UX mobile — Trilha Nossa Terra

Data: 11 de agosto de 2026  
Viewport verificado: 390 × 844 px

## Objetivo da criança

Escolher uma curiosidade, entender a missão atual, fazer uma ação fora da tela, guardar uma pista e perceber avanço real na trilha.

## Problemas encontrados e decisões aplicadas

1. **Acentuação inconsistente.** Rótulos como “Praca”, “Faca” e “Musica” comprometiam a leitura. Os textos infantis, interesses, campos e o PDF foram corrigidos para português com acentuação.
2. **Interesses decorativos.** A escolha alimentava uma frase concatenada, mas não mudava a experiência. Agora ela seleciona um percurso temático e altera pergunta, lugar de investigação, movimento, evidência e próximo teste em cada uma das 14 missões.
3. **Frases sem sentido.** O gerador genérico combinava trechos incompatíveis. Ele foi substituído, na experiência infantil, por mensagens completas e específicas do percurso temático.
4. **Conclusão sem evidência.** Era possível marcar uma missão como concluída com um toque. Agora o botão abre o caderno e a missão só avança quando existe uma observação ou evidência registrada.
5. **Excesso de linguagem adulta.** “Motor narrativo”, “cena cognitiva”, “bússola de aprendizagem”, “kit maker” e “IA facilitadora” disputavam atenção com a ação da criança. Esses blocos saíram da missão infantil; pergunta e próximo teste ficaram em uma seção opcional.
6. **Navegação vazando no mobile.** Os cinco destinos tinham rótulos longos e excediam a largura útil. Agora usam nomes curtos, grade de cinco colunas e alvos de toque de pelo menos 44 px.
7. **Lista de interesses longa e pesada.** Os botões ocupavam uma linha inteira. Agora aparecem em duas colunas, com quebra segura de palavras e altura mínima de 48 px.
8. **Estrutura externa larga.** O shell acumulava margens e bordas no celular. No breakpoint mobile, o conteúdo usa toda a largura, remove raios laterais e impede overflow horizontal.

## Fluxo verificado

1. Entrada e orientação — saudável.
2. Escolha de até dois interesses — saudável; a consequência aparece de forma explícita.
3. Missão personalizada — saudável; contém uma ação principal.
4. Registro da pista — saudável; campos possuem rótulos e instruções.
5. Progresso — saudável; passou de 0/14 para 1/14 somente após o registro.

## Limites da auditoria

As capturas e a inspeção do DOM confirmam reflow, texto visível, hierarquia, rótulos e funcionamento do caminho principal. Ainda é necessário testar com leitor de tela real, navegação por teclado em aparelhos físicos, zoom de 200%, contraste medido e uma turma de crianças de 7 a 10 anos.

## Próximas validações recomendadas

1. Teste moderado com 5 a 8 crianças de municípios com menos de 40 mil habitantes.
2. Verificar se elas conseguem explicar, sem ajuda, como seus interesses mudaram a missão.
3. Medir tempo até a primeira pista registrada e onde pedem ajuda.
4. Validar os seis percursos temáticos ao longo de missões 1, 5, 8, 10 e 14.
5. Testar aparelhos Android de entrada, iPhone com Safari e uso offline instalado como PWA.
