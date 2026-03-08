const fs = require('fs');
const path = require('path');

const dirsToScan = [
    path.join(__dirname, 'src', 'components', 'home'),
    path.join(__dirname, 'src', 'components', 'experiences')
];

function processFile(filePath) {
    if (!filePath.endsWith('.tsx')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Remove the aggressive green/blue background and replace with a premium dark block
    content = content.replace(/bg-gradient-to-br from-\[\#2e4a3d\] to-\[\#0a192f\]/g, 'bg-[#181410] overflow-hidden');

    // 2. Remove mix-blend-overlay and opacity-50, add premium subtle hover zoom
    content = content.replace(/className="(.*?)mix-blend-overlay opacity-50(.*?)"/g, 'className="$1transition-transform duration-[1.5s] ease-[0.33,1,0.68,1] group-hover:scale-110$2"');

    // Also fix modals which might have opacity-90
    content = content.replace(/className="(.*?)opacity-90(.*?)"/g, 'className="$1$2"');

    // 3. Soften the gradient overlay at the bottom so it's less harsh
    content = content.replace(/from-black\/80 via-black\/40 to-transparent h-32/g, 'from-black/70 via-black/10 to-transparent h-[60%]');

    // 4. Fix src="" next.js bug (replace with a generic placeholder to avoid crash)
    // We only want to replace src="" inside <Image
    content = content.replace(/<Image\s+src=""/g, '<Image src="/images/destinations/creel.jpg"');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed:', path.basename(filePath));
    }
}

dirsToScan.forEach(dir => {
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            processFile(path.join(dir, file));
        });
    }
});
