import * as fs from "fs";
import * as path from "path";

export class FileHandlerService {
  readFile(filePath: string): string {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");

      return fileContent;
    } catch (error: any) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }

  saveFile(filePath: string, sourceCode: string): void {
    const folderName = "protectedFiles";
    const fileName = "protected.js";
    const pathToSave = path.join(filePath, folderName, fileName);
    console.log("Saving file:", pathToSave);

    const directoryPath = path.join(filePath, folderName);
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    try {
      fs.writeFileSync(pathToSave, sourceCode);
    } catch (error: any) {
      throw new Error(`Error saving file: ${error.message}`);
    }
  }
}
