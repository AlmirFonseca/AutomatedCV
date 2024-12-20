# AutomatedCV

Link do website: [Currículo - Rodrigo S. Targino](https://almirfonseca.github.io/AutomatedCV/)

# Projeto de Desenvolvimento de Software - AutomatedCV

Esse projeto tem como objetivo a criação de uma ferramenta automatizada para gestão e exibição de conquistas acadêmicas. A ferramenta será hospedada em um repositório no GitHub devidamente modularizada e acompanhada por uma documentação completa.

## Estrutura de Arquivos

A estrutura de arquivos do projeto é a seguinte:

```bash
AutomatedCV/
│   ├───.gitignore                      # Arquivos e pastas a serem ignorados pelo Git
│   ├───index.html                      # Página inicial da interface web
│   ├───LICENSE                         # Licença do projeto (Padrão Apache 2.0)
│   ├───README.md                       # Documentação do projeto (este arquivo)
│   ├───search_page.html                # Página de busca de publicações na interface web
│   └───updateCV.sh                     # Script para atualização automática do CV
│   
├───src                                 # Código fonte da ferramenta de automação
│   ├───bibtex_processor.py             # Módulo para processar arquivos BibTeX
│   ├───requirements.txt                # Dependências do projeto
│   ├───RodrigoSTarginoCV.pdf           # Currículo completo em PDF gerado
│   ├───RodrigoSTarginoCV.Rmd           # Arquivo fonte R Markdown para geração do CV completo
│   ├───RodrigoSTarginoCV_short.pdf     # Versão curta do currículo em PDF
│   ├───RodrigoSTarginoCV_short.Rmd     # Arquivo fonte R Markdown para geração do CV curto
│   └───__init__.py                     # Arquivo de inicialização do pacote
│
├───static                              # Conteúdo estático, incluindo arquivos BibTeX, JSON e CSV
│   ├───author_data                     # Dados pessoais do autor
│   │   ├───awards.csv                  # Prêmios e distinções
│   │   ├───editorial.csv               # Atividades editoriais
│   │   ├───education.csv               # Formação acadêmica
│   │   ├───grants.csv                  # Bolsas e financiamentos recebidos
│   │   ├───personal_data.json          # Informações pessoais do autor
│   │   ├───professional_experience.csv # Experiências profissionais e acadêmicas
│   │   ├───RodrigoSTarginoCV.pdf       # Currículo completo em PDF
│   │   ├───RodrigoSTarginoCV_short.pdf # Versão curta do currículo em PDF
│   │   ├───students.csv                # Lista de alunos orientados
│   │   ├───teaching_experience.csv     # Experiências de ensino
│   │   └───visits.csv                  # Visitas acadêmicas
│   │
│   ├───autogenerated_files             # Arquivos gerados automaticamente para exibição no site
│   │   ├───individual_bib_files        # Arquivos BibTeX individuais
│   │   │   ├───in_preparation          # Artigos em preparação
│   │   │   ├───preprints               # Preprints (artigos não publicados)
│   │   │   ├───publications            # Publicações
│   │   │   ├───talks                   # Seminários e palestras
│   │   │   └───thesis                  # Teses
│   │   └───json_files                  # Arquivos JSON para exibição no website
│   │       ├───in_preparation.json     # JSON dos artigos em preparação
│   │       ├───preprints.json          # JSON dos preprints
│   │       ├───publications.json       # JSON das publicações
│   │       ├───talks.json              # JSON dos seminários
│   │       └───thesis.json             # JSON das teses
│   │
│   ├───bib_files                       # Arquivos BibTeX completos
│   │   ├───in_preparation.bib          # Artigos em preparação
│   │   ├───preprints.bib               # Preprints
│   │   ├───publications.bib            # Publicações
│   │   ├───talks.bib                   # Seminários e palestras
│   │   └───thesis.bib                  # Teses
│   │
│   ├───images                          # Imagens usadas no CV e no site
│   │   ├───favicon.png                 # Ícone do site
│   │   └───profile_picture.jpg         # Foto de perfil do autor
│   │
│   ├───publication                     # Diretório de publicações (BibTeX)
│   │   └───bibtex                      # Arquivos BibTeX de publicações
│   └───talk                            # Diretório de seminários (BibTeX)
│       └───bibtex                      # Arquivos BibTeX de seminários
│           
└───website                             # Código fonte do website (HTML, CSS, JS)
    ├───css                             # Estilos do website
    │   └───styles.css                  # Arquivo CSS principal
    └───js                              # Scripts do website
        ├───main.js                     # Script principal
        ├───search_page.js              # Script para busca de publicações
        └───utils.js                    # Funções utilitárias

```

## Todo List

ToDo List:

- [x] Criar o repositório no GitHub.

- [x] Modelar a estrutura de pastas e arquivos.

- [x] Desenvolver o input dos arquivos BibTeX, com a segmentação das referências e output em formato universal.

- [x] Desenvolver a página web para exibição das conquistas acadêmicas, com arcabouço, estilização e conteúdo dinâmico (conforme os arquivos BibTeX).

- [x] Hospedar a página web no GitHub Pages.

- [x] Atualizar a ferramenta de exportação de currículo em PDF.

- [x] Desenvolver a página principal do currículo.

- [ ] Desenvolver a página de busca de publicações.

- [ ] Desenvolver a pipeline de atualização da página web e do currículo, simplificando o processo de atualização dos conteúdos.

- [ ] Documentar o processo de desenvolvimento e a estrutura do projeto (bibliotecas, arquivos, pastas, etc).

- [ ] Criar o manual de instruções para a atualização dos conteúdos.

## Reminders

- [x] Desenvolver ícone para a página web (.ico)

- [ ] Alterar link do cv após o deploy (transferência de repositório)

## Contato

Em caso de dúvidas, entre em contato com Gustavo Rocha e Almir Fonseca.
