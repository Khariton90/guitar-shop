#!/usr/bin/env node
import CliApplication from "./cli-application";
import HelpCommand from "./cli-command/help.command";
import VersionCommand from "./cli-command/version.command";

const myManager = new CliApplication();
myManager.registerCommands([
  new HelpCommand,
  new VersionCommand
]);

console.log(process.argv + 'fdsfsdfdsfds');
myManager.processCommand(process.argv);