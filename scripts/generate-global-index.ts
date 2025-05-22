// Script para combinar los index.json de noticias y tramites en un solo archivo para búsqueda cliente
import fs from "fs";
import path from "path";

const tipos = ["noticias", "tramites"];
const CONTENT_DIR = path.join(process.cwd(), "content");
const outputPath = path.join(process.cwd(), "public", "articles-index.json");

let allArticles = [];

tipos.forEach((tipo) => {
  const indexPath = path.join(CONTENT_DIR, tipo, "index.json");
  if (fs.existsSync(indexPath)) {
    const data = JSON.parse(fs.readFileSync(indexPath, "utf8"));
    // Agregar el tipo para poder filtrar luego
    allArticles = allArticles.concat(data.map((item: any) => ({ ...item, tipo })));
  }
});

fs.writeFileSync(outputPath, JSON.stringify(allArticles, null, 2), "utf8");
console.log(`Índice global generado en ${outputPath}`);
