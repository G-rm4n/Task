import writeFile from "node:fs/promises";

export async function writeLogs(Method: string, URL: string, StatusCode: number, resultMessage: string) {
  try {
    await writeFile.appendFile("./logs/mycoolserver.log", `Method: ${Method}, URL: ${URL}, Status Code: ${StatusCode}, Result: ${resultMessage}\n`);
  } catch (error) {
    console.error("Error registrando los logs", error);
  }
}