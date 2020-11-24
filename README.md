# App Desafio EloGroup

Olá! Meu nome é **Carlos Chaves** e este aplicativo tem o objetivo de 
propor uma solução para um   
problema proposto em forma de desafio em um processo seletivo para desenvolvedor da EloGroup.

Para logar na aplicação, utilize o login abaixo ou registre um novo usuário.

```
login: elogroup
senha: 123456
```

Para a resolução deste desafio optei por utilizar o framework Angular 10
com o auxílio de duas  
dependências: Angular Material e Bootstrap.

O app não tem nenhum conexão com banco de dados, e todo dado 
armazenado durante seu uso  
é salvo no LocalStorage de seu browser.

A autentição também se dá através de um JWT falso criado no momento do login  
cuja validade não é verificada durante a utilização da aplicação, apenas sua
existência.

## Discussão sobre a solução

A aplicação utiliza da separação arquitetural em o módulo Core (carregado 
por inteiro no   
bootstrap da aplicação) e o módulo Shared (compartilhado
e utilizado conforme necessário   
por outros módulos). Ela tem um layout
principal constituído por header e sidebar (colapsível)  
e o conteúdo da rota atual é exibido no restante da página.

Alguns componentes da aplicação foram criados com a ideia de serem potencialmente
utiliizados  
em outros pontos da aplicação. O exemplo mais claro disso é o componente da tabela  
'drag and drop'. Fazer esse componente ser 
responsivo e um pouco generalista me pareceu  
um desafio interessante.

Outros componentes foram criados para simular a situação 
de um componente específico de alguma  
página. O exemplo mais
claro disso é a tabela de oportunidade na criação de um novo lead.

Formulários de registro e login foram criados com Reactive Forms,
enquanto o formulário de criação  
de novo lead foi criado com two-way data binding e 
foram criados métodos específicos para validação  
e interação do form.

A tela de painel de Leads tenta cumprir os requisitos 
apresentados pelo desafio com algumas adições.  
O componente de 'drag and drop', por ter sido criado com uma ideia
generalista, pode ser adaptado  
para cumprir regras mais complexas que as apresenatadas. Ao 
se clicar em um lead você é   
redirecionado para a tela de apresentação de detalhes do lead em questão.
Além disso há também um  
botão que reseta o Local Storage de Leads de volta aos valores 
padrões para agilizar um pouco  
os testes.  

Qualquer dúvida ou se quiser saber mais detalhes sobre a aplicação é só entrar
em contato. :wink:
