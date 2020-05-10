# student-toolkit

Toolkit for students.

[![NPM](https://nodei.co/npm/student-toolkit.png?stars&downloads)](https://www.npmjs.com/package/student-toolkit)

## Installation

`$ npm install -g student-toolkit`

***Important:** if you have problems due to `puppeteer` installation, try:*

`$ npm install -g student-toolkit --unsafe-perm=true`

## Why

- To start taking notes fastly for any kind of project with:
   - Rich documents in `markdown` with `bookmator`
   - Complex diagrams in `mermaid`
   - Complex UMLs in `plantuml`
   - Readable diagrams in `skemator`
   - Readable UMLs in `contratos`
   - Scientific documents with `LaTeX`

With [`bookmator`](https://github.com/allnulled/bookmator) you can create big `markdown` documents with filesystem files and folders.

With [`skemator`](https://github.com/allnulled/skemator) you can create highly readable (simple) diagrams.

With [`mermaid`](https://mermaid-js.github.io/mermaid/#/) you can create a wider set of types of diagrams.

With [`plantuml`](https://plantuml.com/es/) you can create intensive UML documents.

With [`contratos`](https://github.com/allnulled/contratos) you can create highly readable programming contract specifications effortlessly.

With [`latex`](https://www.latex-project.org) you can create first-level scientific and technical documents.

Moreover, when you **start** working with the toolkit, it will update the contents automatically, so you can fastly see the results.

However, this tool is not to edit or visualize any of these documents: use a specialized editor to do this instead, like [Atom](https://atom.io/) or [Sublime](https://www.sublimetext.com/).

## Requirements

If you want this tool to fully work, the only external dependency you need is `pdflatex` available from command line.

To install `pdflatex` in Linux environments, you can:

`$ sudo apt install texlive-latex-base`

To install `pdflatex` in Windows, I do not know, [here](https://tex.stackexchange.com/questions/49569/where-to-download-pdflatex-exe) a user says something.

## Instructions

1. Create a new project.
2. Start the project. Once you start, all the changes made will be automatically compiled.

You can also compile manually a project.

## Usage

### CLI

#### 1. Create a project

```sh
$ student create new-project
```

#### 2. Compile a project

```sh
$ student compile new-project
```

#### 3. Start a project

```sh
$ student start new-project
```

### API

#### 1. Create a project

```js
require("student-toolkit").create({ directory: "new-project" });
```

#### 2. Compile a project

```js
require("student-toolkit").compile({ directory: "new-project" });
```

#### 3. Start a project

```js
require("student-toolkit").start({ directory: "new-project" });
```

## Language training

- Train **plantuml** syntax here:
  - [http://www.plantuml.com/plantuml/uml](http://www.plantuml.com/plantuml/uml)
- Train **mermaid** syntax here:
  - [https://mermaid-js.github.io/mermaid-live-editor/#/edit/](https://mermaid-js.github.io/mermaid-live-editor/#/edit/)
- Train **contratos** syntax here:
  - [https://allnulled.github.io/contratos/](https://allnulled.github.io/contratos/)
- Train **LaTeX** syntax here:
  - [https://latexbase.com](https://latexbase.com)

## License

This project is released under WTFPL (or *What The Fuck Public License*), which means basically **do what the fuck you want with it**, simply.

## Issues

Please, address your issues [here](https://github.com/allnulled/student-toolkit/issues).
