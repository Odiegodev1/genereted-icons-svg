import fs from "fs/promises";
import path from "path";
import fg from "fast-glob";
import { transform } from "@svgr/core";

const INPUT = path.resolve("svgs");
const OUTPUT = path.resolve("output");

function toPascalCase(filename: string) {
  return filename
    .replace(/\.svg$/i, "")
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
}

// Captura estritamente a primeira cor (fill ou stroke) encontrada no arquivo original
function extractOriginalColor(svgContent: string): string {
  const hexMatch = svgContent.match(/(fill|stroke)="(#[0-9a-fA-F]{3,8})"/i);
  if (hexMatch && hexMatch[2]) {
    return hexMatch[2];
  }
  // Fallback definitivo caso o SVG não tenha cor explícita nas tags principais
  return "#000000";
}

async function main() {
  await fs.mkdir(OUTPUT, { recursive: true });

  const files = await fg("*.svg", {
    cwd: INPUT,
  });

  console.log(`Encontrados ${files.length} SVGs`);

  const exports: string[] = [];

  for (const file of files) {
    const svg = await fs.readFile(path.join(INPUT, file), "utf8");

    const componentName = toPascalCase(file);
    
    // Pega sempre a cor original exata do arquivo
    const originalColor = extractOriginalColor(svg);

    // O SVGR gera a estrutura JSX limpa
    const rawCode = await transform(
      svg,
      {
        plugins: ["@svgr/plugin-jsx"],
        typescript: true,
        jsxRuntime: "automatic",
        exportType: "named",
        namedExport: componentName,
        expandProps: "end",
        prettier: true,
        icon: true,
        replaceAttrValues: {
          "#000": "currentColor",
          "#000000": "currentColor",
          "#fff": "currentColor",
          "#FFFFFF": "currentColor",
          [originalColor]: "currentColor", 
        },
      },
      {
        componentName,
      }
    );

    // Captura apenas o conteúdo interno das tags <svg>
    const svgChildrenMatch = rawCode.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    const svgChildren = svgChildrenMatch ? svgChildrenMatch[1].trim() : "";

    // Monta o componente com a BRAND_COLOR detectada sem restrições
    const typedCode = `import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  backgroundColor?: string;
  variant?: "sem" | "square";
  borderRadius?: number;
}

const BRAND_COLOR = "${originalColor}";

export function ${componentName}({
  size = 60,
  color,
  backgroundColor,
  variant = "sem",
  borderRadius = 10,
  className,
  ...props
}: IconProps) {
  const bg =
    variant === "square"
      ? backgroundColor || BRAND_COLOR
      : "transparent";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {variant === "square" && (
        <rect
          width="60"
          height="60"
          rx={borderRadius}
          fill={bg}
        />
      )}

      <g fill={color || (variant === "square" ? "#fff" : BRAND_COLOR)}>
        ${svgChildren}
      </g>
    </svg>
  );
}
`;

    await fs.writeFile(
      path.join(OUTPUT, `${componentName}.tsx`),
      typedCode,
      "utf8"
    );

    exports.push(`export * from "./${componentName}";`);

    console.log(`✔ ${componentName} (Cor: ${originalColor})`);
  }

  await fs.writeFile(
    path.join(OUTPUT, "index.ts"),
    exports.join("\n"),
    "utf8"
  );

  console.log("\nTudo gerado com sucesso.");
}

main().catch(console.error)