const path = require("path");
const fs = require("fs-extra");
const Bookmator = require("bookmator");
const Skemator = require("skemator");
const Contratos = require("contratos");
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
    const bookmatorPattern = path.resolve(directory, "book/**/*.md");
    return chokidar.watch([skematorPattern, plantumlPattern, contratosPattern, bookmatorPattern]).on("change", () => {
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
    if(types.indexOf("contratos") !== -1) {
      this.compileContratos(path.resolve(directory, "contratos/*.cnt"));
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

  static get FILETYPES() {
    return ["skemator", "contratos", "plantuml", "bookmator"];
  }

  static get COMMANDS() {
    return ["create", "start"];
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
    fs.ensureDirSync(directory + "/skemator");
    fs.writeFileSync(directory + "/skemator/sample.skm", "#L2R\n[My first]\n [diagram]", "utf8");
    fs.writeFileSync(directory + "/book.md", "", "utf8");
    console.log("⚛ Project is ready now!");
  }

}
