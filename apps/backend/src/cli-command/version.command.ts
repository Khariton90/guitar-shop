import { CliCommand } from "@guitar-shop/core";
import { readFileSync } from 'fs';

export default class VersionCommand implements CliCommand {
  public readonly name = '--version';

  private readVersion(): string {
     const contentPageJSON = readFileSync('./package.json', 'utf-8');
     const content = JSON.parse(contentPageJSON);
     return content.version;
  }

  execute() {
    const version = this.readVersion();
    console.log(version);
  }
}