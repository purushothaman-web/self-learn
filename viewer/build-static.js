import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

const ALLOWED_DIRS = ['dsa', 'js', 'extra-skills'];

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

function buildStaticDb() {
  try {
    console.log('[Static Build] Generating static_db.json...');
    const tree = {};
    const fileContents = {};
    
    ALLOWED_DIRS.forEach(dir => {
      const dirPath = path.join(ROOT_DIR, dir);
      if (!fs.existsSync(dirPath)) return;
      
      tree[dir] = [];
      
      const subdirs = fs.readdirSync(dirPath, { withFileTypes: true });
      subdirs.forEach(subdir => {
        if (subdir.isDirectory()) {
          const subDirPath = path.join(dirPath, subdir.name);
          const files = fs.readdirSync(subDirPath)
            .filter(file => file.endsWith('.md') || file.endsWith('.js'))
            .map(file => {
              let status = 'not-started';
              const filePath = path.join(subDirPath, file);
              const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
              
              try {
                const content = fs.readFileSync(filePath, 'utf-8');
                fileContents[relativePath] = content;
                
                if (content.includes('[x] In progress')) {
                  status = 'in-progress';
                } else if (content.includes('[x] Done')) {
                  status = 'done';
                }
              } catch (e) {
                // Ignore errors reading content
              }
              
              return { name: file, relativePath, status };
            });
            
          tree[dir].push({
            name: subdir.name,
            relativePath: path.relative(ROOT_DIR, subDirPath).replace(/\\/g, '/'),
            files
          });
        }
      });
    });
    
    const db = { tree, fileContents };
    fs.writeFileSync(path.join(PUBLIC_DIR, 'static_db.json'), JSON.stringify(db, null, 2), 'utf-8');
    console.log('[Static Build] Successfully wrote public/static_db.json');
  } catch (error) {
    console.error('[Static Build] Error:', error.message);
    process.exit(1);
  }
}

buildStaticDb();
