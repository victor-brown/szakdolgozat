import * as fs from "fs";
import * as path from "path";

export class ArgumentHandlerService {
  private readonly args: string[];

  constructor() {
    this.args = process.argv.slice(2);
  }

  getArguments(): string[] {
    return this.args;
  }

  hasArgument(arg: string): boolean {
    return this.args.includes(arg);
  }

  getFileArgumentPath(): string {
    const fileArgIndex = this.args.findIndex((arg) =>
      arg.startsWith("--file=")
    );

    if (fileArgIndex === -1) {
      throw new Error("There is no --file=path/to/file argument.");
    }

    const filePath = this.args[fileArgIndex].split("=")[1];
    const absolutePath = path.resolve(filePath);

    if (fs.existsSync(absolutePath)) {
      return absolutePath;
    } else {
      throw new Error(`File not found: ${filePath}`);
    }
  }
}
