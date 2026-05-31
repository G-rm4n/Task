import { readFile as fsReadFile } from "fs/promises";
import { routes } from "./routes.js";

export async function readFile(paginaSolicitada: keyof typeof routes) {
  try {
    const pagina = routes[paginaSolicitada] as string;
    const data = await fsReadFile(pagina, "utf-8");

    return data;

  } catch (error) {
    console.error({ "error de lectura": error });
    return null;
  }
}