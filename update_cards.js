const fs = require('fs');
const path = require('path');

const dirs = [
    'C:/Users/CHEMA/Desktop/OPERADORA SIMATIRI/src/components/home',
    'C:/Users/CHEMA/Desktop/OPERADORA SIMATIRI/src/components/experiences'
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.includes('Card.tsx') && f.startsWith('Tour'));
    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf-8');

        let modified = false;

        // Add import if missing
        if (!content.includes("import Image from 'next/image'") && !content.includes('import Image from "next/image"')) {
            // Find the last import
            const importMatches = [...content.matchAll(/^import .*;?$/gm)];
            if (importMatches.length > 0) {
                const lastImport = importMatches[importMatches.length - 1];
                const insertIndex = lastImport.index + lastImport[0].length;
                content = content.slice(0, insertIndex) + "\nimport Image from 'next/image';" + content.slice(insertIndex);
                modified = true;
            }
        }

        // Replace <img ... />. We can match <img up to />
        if (content.includes('<img')) {
            content = content.replace(/<img([\s\S]*?)\/>/g, (match, p1) => {
                // extract src, alt, className
                const srcMatch = p1.match(/src="([^"]+)"/);
                const altMatch = p1.match(/alt="([^"]+)"/);
                const classMatch = p1.match(/className="([^"]+)"/);

                let src = srcMatch ? srcMatch[1] : '';
                let alt = altMatch ? altMatch[1] : '';
                let className = classMatch ? classMatch[1] : '';

                return `<Image src="${src}" alt="${alt}" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="${className}" />`;
            });
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content);
            console.log(`Updated ${file}`);
        }
    });
});
