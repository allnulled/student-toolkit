const { expect } = require("chai");
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const executeSync = require("execute-command-sync");
const StudentToolkit = require(__dirname + "/../index.js");

describe("StudentToolkit API", function() {

  const projectOne = __dirname + "/examples/one";

  before(function() {
    rimraf.sync(projectOne);
  });

  after(function() {
    rimraf.sync(projectOne);
  });

  it("create a project", function() {
    expect(fs.existsSync(projectOne)).to.equal(false);
    StudentToolkit.create({ directory: projectOne });
    expect(fs.existsSync(projectOne)).to.equal(true);
  });

  it("compile a project", function(done) {
    expect(fs.readFileSync(projectOne + "/book.md").toString()).to.equal("");
    expect(fs.existsSync(projectOne + "/skemator/sample.png")).to.equal(false);
    StudentToolkit.compile({ directory: projectOne });
    setTimeout(function() {
      expect(fs.existsSync(projectOne + "/skemator/sample.png")).to.equal(true);
      expect(fs.readFileSync(projectOne + "/book.md").toString()).to.equal("# My book");
      done();
    }, 500);
  });

  it("start working on a project", function(done) {
    const watcher = StudentToolkit.start({ directory: projectOne });
    setTimeout(function() {
      const introPath = path.resolve(projectOne, "book/000.introduction.md");
      const bookPath = path.resolve(projectOne, "book.md");
      fs.writeFileSync(introPath, "# Hello", "utf8");
      setTimeout(function() {
        const bookContents = fs.readFileSync(bookPath).toString();
        expect(bookContents).to.equal("# Hello");
        watcher.close().then(done);
      }, 500);
    }, 500);
  });

});
