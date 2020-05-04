#!/usr/bin/env node

const yargs = require("yargs")
	.version(require(__dirname + "/package.json").version)
	.usage("\nUsage:\n  $0 <command> <directory> [options]")
	.command(
		"create <directory>",
		"Creates a new project at specified directory",
		yargs => yargs.default("command", "create")
      .positional("directory", { type: "string", demmandOption: true })
	)
	.command(
		"start [directory]",
		"Starts student-toolkit from a specified directory",
		yargs => yargs
			.default("command", "start")
			.default("directory", process.cwd())
	)
	.command(
		"compile [directory]",
		"Compiles files of a student-toolkit directory",
		yargs => yargs
			.default("command", "compile")
			.default("directory", process.cwd())
	)
	.help();

const args = yargs.argv;

if (!args.command) {
	yargs.showHelp();
	return console.log("\nError:\n  You need to specify a command");
} else {
	require(__dirname + "/index.js").execute(args);
}

