import { CliCommand } from "@guitar-shop/core";

type ParsedCommand = {
  [key: string]: string[]
}

export default class CliApplication {
  private commands: {[propName: string]: CliCommand} = {};
  private defaultCommand = '--help';

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let command = '';

    return cliArguments.reduce((acc, item) => {
      if (item.startsWith('--')) {
        acc[item] = [];
        command = item;
      } else if (command && item) {
        acc[command].push(item);
      }

      return acc;
    }, parsedCommand);
  }

  public registerCommands(commandList: CliCommand[]): void {
    this.commands = commandList.reduce((acc, Command) => {
      const cliCommand = Command;
      acc[cliCommand.name] = cliCommand;
      return acc;
    }, this.commands);
  }

  public getCommand(commandName: string): CliCommand {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argValue: string[]): void {
    const parsedCommand = this.parseCommand(argValue);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}