import { CliCommand } from "@guitar-shop/core";

export default class HelpCommand implements CliCommand {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
      Программа для подготовки данных для REST API сервера.

      Пример:
        main.js --<command> [--arguments]

      Команды:
        --version:                                    # выводит номер версии
        --help:                                       # печатает текст Помощь
        --import <path>:                              # импортирует данные из TSV
    `)
  }
}