# Perfis infantis e registros de evidências

## Decisão de produto

A criança não cria conta nem usa o próprio nome civil. Um responsável ou facilitador cria, no aparelho, um perfil com nome escolhido e avatar. Interesses, progresso e registros textuais ficam separados por perfil e armazenados no IndexedDB do navegador.

O Google Auth será uma porta de entrada exclusiva para adultos. Ele não está configurado neste piloto local; o aviso atual da área do facilitador é somente uma fronteira de UX e não deve ser apresentado como verificação de identidade.

## Foto e áudio

- A área infantil não abre câmera nem microfone.
- Uma pista que peça foto ou áudio encaminha a criança para chamar um adulto.
- O adulto pode capturar um registro individual ou selecionar vários desenhos.
- Cada arquivo é associado a um perfil local antes da confirmação.
- A confirmação guarda somente o perfil local, o tipo do registro e o horário.
- O arquivo e sua prévia temporária são descartados; não há endpoint de upload.
- O registro é documental, sem nota, ranking ou peso avaliativo.

## Dados que permanecem no aparelho

- nome escolhido e avatar;
- interesses selecionados;
- progresso nas missões;
- registros textuais do caderno;
- confirmações mínimas de que uma foto ou áudio foi acompanhado por adulto.

Esses dados não sincronizam entre aparelhos. Limpar os dados do navegador ou usar a ação “Limpar registros” remove a experiência local. O mural também é local ao aparelho e não deve ser descrito como coletivo entre turmas.

## Próxima etapa de implantação

1. Configurar Google Auth apenas no subdomínio adulto.
2. Vincular responsáveis e facilitadores sem transferir os perfis infantis locais.
3. Definir sessão adulta curta e nova confirmação antes de câmera ou microfone.
4. Validar em dispositivos reais que nenhum arquivo aparece em requisições de rede ou armazenamento persistente.
5. Produzir aviso de privacidade em linguagem simples para adultos e crianças.
