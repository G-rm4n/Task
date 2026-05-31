import { mkdir } from "node:fs/promises";

export async function createLogsDir(route: string) {
  try {
    await mkdir(route, { recursive: true });
  } catch (error) {
    console.error("Error creando el directorio de logs:", error);
  }
}