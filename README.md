# student-toolkit

Toolkit for students.

## Installation

`$ npm install -g student-toolkit`

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

## License

This project is released under WTFPL (or *What The Fuck Public License*), which means basically **do what the fuck you want with it**.

## Issues

Please, address your issues [here](https://github.com/allnulled/student-toolkit/issues).
