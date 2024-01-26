import { ArgumentHandlerService } from "./ArgumentHandlerService/ArgumentHandlerService";
import { FileHandlerService } from "./FileHandlerService/FileHandlerService";
import { ProtectorService } from "./ProtectorService/ProtectorService";

const argumentService = new ArgumentHandlerService();
const fileService = new FileHandlerService();
const protectorService = new ProtectorService();

try {
  const filePath = argumentService.getFileArgumentPath();
  console.log("Target file:", filePath);
  console.log("");

  const fileContent = fileService.readFile(filePath);
  protectorService.protect(fileContent);

  const newCode = protectorService.generateSourceCode();
  const saveFilePath = filePath.substring(0, filePath.lastIndexOf("\\" || "/"));

  console.log("");
  fileService.saveFile(saveFilePath, newCode);
} catch (error: any) {
  console.error(error.message);
}
