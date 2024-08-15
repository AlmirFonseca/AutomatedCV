# AutomatedCV

# Projeto de Desenvolvimento de Software - AutomatedCV

Esse projeto tem como objetivo a criação de uma ferramenta automatizada para gestão e exibição de conquistas acadêmicas. A ferramenta será hospedada em um repositório no GitHub devidamente modularizada e acompanhada por uma documentação completa.

## Estrutura de Arquivos

A estrutura de arquivos do projeto é a seguinte:

```bash
AutomatedCV/
├── static/ # Arquivos BibTeX e outros conteúdos necessários para a geração do currículo
│   │
│   ├── author_data/ # Informações pessoais do autor
│   │   ├── education.csv # Formação acadêmica
│   │   ├── personal_data.json # Informações pessoais do autor
│   │   ├── professional_experience.csv # Experiências profissionais/acadêmicas
│   │   ├── students.csv # Orientações de alunos
│   │   └── teaching_experience.csv # Experiências de ensino
│   │
│   ├── images/ # Imagens utilizadas no currículo
│   │   └── profile.jpg # Foto do autor
│   │
│   ├── full_bibtex_files/ # Arquivos BibTeX completos com todas as publicações e seminários
│   │   ├── publication.bib # Arquivo BibTeX das publicações
│   │   └── talk.bib # Arquivo BibTeX dos seminários e palestras
│   │
│   ├── publication/ # Arquivos BibTeX das publicações
│   │   └── AUTHORLASTNAME_YEAR_TITLE/ # Pasta de uma publicação
│   │   │   ├── AUTHORLASTNAME_YEAR_TITLE.bib # Arquivo BibTeX da publicação
│   │   │   ├── AUTHORLASTNAME_YEAR_TITLE.json # Arquivo json da publicação
│   │   └── ...
│   │
│   └── talk/ # Arquivos BibTeX dos seminários e palestras
│       ├── INDEX_YEAR_TITLE/ # Pasta de um seminário/palestra
│       │   ├── INDEX_YEAR_TITLE.bib # Arquivo BibTeX do seminário/palestra
│       │   ├── INDEX_YEAR_TITLE.json # Arquivo json do seminário/palestra
│       └── ...
│
├── scripts/ # Scripts de automação (Python)
│   ├── run.py # Script principal de automação
│   └── setup.sh # Script de instalação das dependências
│
├── src/ # Código fonte da ferramenta de automação (Python)
│   ├── __init__.py # Arquivo de inicialização do pacote
│   ├── requirements.txt # Definição das dependências do projeto
│   ├── bibtex.py # Módulo de leitura, manuseio e escrita de arquivos BibTeX
│   └── ...
│
├── website/ # Código fonte do website (HTML, CSS, JS)
│   ├── css/ # Estilos do website
│   ├── js/ # Scripts do website
│   ├── img/ # Imagens do website
│   └── index.html # Página inicial do website
│
├── .gitignore # Arquivos e pastas a serem ignorados pelo Git
│
├── _config.yml # Configurações do Jekyll (Gerador de sites estáticos do GitHub Pages)
│
├── LICENSE # Licença do projeto (Padrão Apache 2.0)
│
└── README.md # Documentação do projeto
```

## Todo List

ToDo List:

- [x] Criar o repositório no GitHub.

- [x] Modelar a estrutura de pastas e arquivos.

- [ ] Desenvolver o input dos arquivos BibTeX, com a segmentação das referências e output em formato universal.

- [ ] Desenvolver a página web para exibição das conquistas acadêmicas, com arcabouço, estilização e conteúdo dinâmico (conforme os arquivos BibTeX).

- [ ] Hospedar a página web no GitHub Pages.

- [ ] Atualizar a ferramenta de exportação de currículo em PDF.

- [ ] Desenvolver a pipeline de atualização da página web e do currículo, simplificando o processo de atualização dos conteúdos.

- [ ] Documentar o processo de desenvolvimento e a estrutura do projeto (bibliotecas, arquivos, pastas, etc).

- [ ] Criar o manual de instruções para a atualização dos conteúdos.

## Contato

Em caso de dúvidas, entre em contato com Gustavo Rocha e Almir Fonseca.
