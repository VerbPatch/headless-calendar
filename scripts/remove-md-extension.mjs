// @ts-check
import fs from "fs";
import path from "path";
/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  let publicPath = "";

  app.renderer.on("beginRender", () => {
    publicPath = app.options.getValue("publicPath")?.replace(/\/$/, "") || "";
  });

  app.renderer.on("endPage", (page) => {
    if (page.contents) {
      page.contents = page.contents.replace(/(\[.*?\]\([^)]*?)\.md(#[^)]*)?(\))/g, "$1$2$3");
    }
  });

  app.renderer.on("endRender", () => {
    const outputDir = app.options.getValue("out");
    const navJsonPath = path.join(outputDir, "navigation.json");
    if (fs.existsSync(navJsonPath)) {
      try {
        const navData = JSON.parse(fs.readFileSync(navJsonPath, "utf-8"));
        const processNavItem = (item) => {
          if (item.path) {
            item.path = item.path.replace(/\.md$/, "");
            if (publicPath) {
              const normalizedPath = item.path.startsWith("/") ? item.path : "/" + item.path;
              item.path = publicPath + normalizedPath;
            }
          }

          if (item.children && Array.isArray(item.children)) {
            item.children.forEach(processNavItem);
          }
        };

        if (Array.isArray(navData)) {
          navData.forEach(processNavItem);
        } else {
          processNavItem(navData);
        }

        fs.writeFileSync(navJsonPath, JSON.stringify(navData, null, 2), "utf-8");
      } catch (error) {
        console.error("Error processing navigation.json:", error);
      }
    }
  });
}
