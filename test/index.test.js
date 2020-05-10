const { expect } = require("chai");
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const executeSync = require("execute-command-sync");
const StudentToolkit = require(__dirname + "/../index.js");

describe("StudentToolkit API", function() {

  const projectOne = __dirname + "/examples/one";

  before(function() {
    rimraf.sync(projectOne + "/*/*.aux");
    rimraf.sync(projectOne + "/*/*.cnt.json");
    rimraf.sync(projectOne + "/*/*.log");
    rimraf.sync(projectOne + "/*/*.out");
    rimraf.sync(projectOne + "/*/*.pdf");
    rimraf.sync(projectOne + "/*/*.png");
  });

  after(function() {
    rimraf.sync(projectOne + "/*/*.aux");
    rimraf.sync(projectOne + "/*/*.cnt.json");
    rimraf.sync(projectOne + "/*/*.log");
    rimraf.sync(projectOne + "/*/*.out");
    rimraf.sync(projectOne + "/*/*.pdf");
    rimraf.sync(projectOne + "/*/*.png");
  });

  it("create a project", function() {
    // expect(fs.existsSync(projectOne)).to.equal(false);
    StudentToolkit.create({ directory: projectOne });
    expect(fs.existsSync(projectOne)).to.equal(true);
  });

  it("compile a project", function(done) {
    this.timeout(1000*10);
    expect(fs.existsSync(projectOne + "/skemator/hello.png")).to.equal(false);
    expect(fs.existsSync(projectOne + "/plantuml/hello.png")).to.equal(false);
    expect(fs.existsSync(projectOne + "/latex/hello.aux")).to.equal(false);
    expect(fs.existsSync(projectOne + "/latex/hello.log")).to.equal(false);
    expect(fs.existsSync(projectOne + "/latex/hello.out")).to.equal(false);
    expect(fs.existsSync(projectOne + "/latex/hello.pdf")).to.equal(false);
    expect(fs.existsSync(projectOne + "/contratos/hello.cnt.json")).to.equal(false);
    StudentToolkit.compile({ directory: projectOne });
    setTimeout(function() {
      expect(fs.existsSync(projectOne + "/skemator/hello.png")).to.equal(true);
      expect(fs.existsSync(projectOne + "/skemator/hello.png")).to.equal(true);
      expect(fs.existsSync(projectOne + "/plantuml/hello.png")).to.equal(true);
      expect(fs.existsSync(projectOne + "/latex/hello.aux")).to.equal(true);
      expect(fs.existsSync(projectOne + "/latex/hello.log")).to.equal(true);
      expect(fs.existsSync(projectOne + "/latex/hello.out")).to.equal(true);
      expect(fs.existsSync(projectOne + "/latex/hello.pdf")).to.equal(true);
      expect(fs.existsSync(projectOne + "/contratos/hello.cnt.json")).to.equal(true);
      done();
    }, 2000);
  });

  it("start working on a project", function(done) {
    this.timeout(1000*10);
    const watcher = StudentToolkit.start({ directory: projectOne });
    setTimeout(function() {
      const introPath = path.resolve(projectOne, "book/000.introduction.md");
      const bookPath = path.resolve(projectOne, "book.md");
      fs.writeFileSync(introPath, "# Hello", "utf8");
      setTimeout(function() {
        const bookContents = fs.readFileSync(bookPath).toString();
        expect(bookContents).to.equal("# Hello");
        watcher.close().then(done);
      }, 2000);
    }, 2000);
  });

});
