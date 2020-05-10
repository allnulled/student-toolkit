const path = require("path");
const fs = require("fs-extra");
const Bookmator = require("bookmator");
const Skemator = require("skemator");
const Contratos = require("contratos");
const execSync = require("execute-command-sync");
const chokidar = require("chokidar");

const getDirectoryWithCommand = (options, command, commandLabel) => {
  const { directory: directoryTmp } = options;
  console.log("");
  console.log(command);
  console.log("");
  if (typeof directoryTmp !== "string") {
    throw new Error(`Parameter <directory> is required to <${commandLabel}>`);
  }
  return path.resolve(directoryTmp);
};

module.exports = class {

  static start(options = {}) {
    const directoryTmp = options.directory;
    const directory = getDirectoryWithCommand(options, "⚛ [ START STUDENT PROJECT ]", "start");
    const skematorPattern = path.resolve(directory, "skemator/*.skm");
    const plantumlPattern = path.resolve(directory, "plantuml/*.plantuml");
    const contratosPattern = path.resolve(directory, "contratos/*.cnt");
    const mermaidPattern = path.resolve(directory, "mermaid/*.mmd");
    const latexPattern = path.resolve(directory, "latex/*.tex");
    const bookmatorPattern = path.resolve(directory, "book/**/*.md");
    return chokidar.watch([skematorPattern, plantumlPattern, contratosPattern, mermaidPattern, latexPattern, bookmatorPattern]).on("change", () => {
      this.compile({ directory });
    });
  }

  static compile(options = {}) {
    const { directory: directoryTmp, types = this.FILETYPES } = options;
    const directory = getDirectoryWithCommand(options, "⚛ [ COMPILE STUDENT PROJECT ]", "compile");
    if(types.indexOf("skemator") !== -1) {
      this.compileSkemator(path.resolve(directory, "skemator/*.skm"));
    }
    if(types.indexOf("plantuml") !== -1) {
      this.compilePlantuml(path.resolve(directory, "plantuml/*.plantuml"));
    }
    if(types.indexOf("mermaid") !== -1) {
      this.compileMermaid(path.resolve(directory, "mermaid"));
    }
    if(types.indexOf("contratos") !== -1) {
      this.compileContratos(path.resolve(directory, "contratos/*.cnt"));
    }
    if(types.indexOf("latex") !== -1) {
      this.compileLatex(path.resolve(directory));
    }
    if(types.indexOf("bookmator") !== -1) {
      this.compileBookmator(path.resolve(directory));
    }
  }

  static compileSkemator(files) {
    console.log("⚛ Compiling skemator files.");
    Skemator.compile({
      files,
      png: true,
      svg: false, //true,
      pdf: false, // true
    });
  }

  static compilePlantuml(files) {
    console.log("⚛ Compiling plantuml files.");
    Skemator.compileUML({ files });
  }

  static compileContratos(files) {
    console.log("⚛ Compiling contratos files.");
    try {
      Contratos.compile({ files });
    } catch (e) {
      if(!e.message.startsWith("No files matched by")) {
        throw e;
      }
    }
  }

  static compileBookmator(directory) {
    const files = fs.readdirSync(directory).filter(f => f.toLowerCase().endsWith(".md")).map(f => path.resolve(directory, f));
    console.log("⚛ Compiling bookmator files.");
    Bookmator.compile({ files });
  }

  static compileMermaid(directory) {
    console.log("⚛ Compiling mermaid files.");
    const files = fs.readdirSync(directory).filter(f => f.toLowerCase().endsWith(".mmd")).map(f => path.resolve(directory, f));
    files.forEach(file => {
      const commands = `./node_modules/.bin/mmdc -i ${JSON.stringify(file)} -o ${JSON.stringify(file.replace(/\.mmd$/gi, ".png"))}`;
      console.log(commands);
      execSync(commands, { cwd: __dirname });
    });
  }

  static compileLatex(directory) {
    console.log("⚛ Compiling latex files.");
    const files = fs.readdirSync(directory).filter(f => f.toLowerCase().endsWith(".latex")).map(f => path.resolve(directory, f));
    files.forEach(file => {
      const commands = `pdflatex ${JSON.stringify(file)}`;
      console.log(commands);
      execSync(commands, { cwd: __dirname });
    });
  }

  static get FILETYPES() {
    return ["skemator", "contratos", "plantuml", "mermaid", "bookmator", "latex"];
  }

  static get COMMANDS() {
    return ["create", "compile", "start"];
  }

  static execute(options = {}) {
    const { command = "" } = options;
    if (this.COMMANDS.indexOf(command) === -1) {
      throw new Error(`Command <${command}> is not available. Please, provide one of these commands: ${this.COMMANDS.join(", ")}`);
    }
    return this[command](options);
  }

  static create(options = {}) {
    const directoryTmp = options.directory;
    const directory = getDirectoryWithCommand(options, "⚛ [ CREATE STUDENT PROJECT ]", "create");
    if (!fs.existsSync(directory)) {
      console.log("⚛ Creating folder at:");
      console.log("   " + directory.replace(process.cwd(), ""));
      fs.ensureDirSync(directory);
    }
    console.log("⚛ Creating new project at:");
    console.log("   " + directory.replace(process.cwd(), ""));
    fs.ensureDirSync(directory + "/book");
    fs.writeFileSync(directory + "/book/000.introduction.md", "# My book", "utf8");
    fs.ensureDirSync(directory + "/contratos");
    fs.ensureDirSync(directory + "/plantuml");
    fs.ensureDirSync(directory + "/resources");
    fs.ensureDirSync(directory + "/mermaid");
    fs.ensureDirSync(directory + "/latex");
    fs.ensureDirSync(directory + "/skemator");
    fs.writeFileSync(directory + "/skemator/sample.skm", "#L2R\n[My first]\n [diagram]", "utf8");
    fs.writeFileSync(directory + "/book.md", "", "utf8");
    console.log("⚛ Project is ready now!");
  }

}
