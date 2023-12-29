import fs from "fs";
import { filePath } from "../utils/dataFilePath.js";

function initializeBankFile() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]), "utf8");
  }
}

export function readFromBankFile() {
  try {
    initializeBankFile();
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    throw new Error("Error reading from bank file");
  }
}

export function writeToBankFile(data) {
  try {
    initializeBankFile();
    fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");
  } catch (error) {
    throw new Error("Error writing to bank file");
  }
}
