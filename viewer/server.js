import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const app = express();
app.use(cors());
app.use(express.json());

const ALLOWED_DIRS = ['dsa', 'js', 'extra-skills'];

// Helper to check if path is safe and allowed
function getSafePath(relativePath) {
  if (!relativePath) return null;
  const resolved = path.resolve(ROOT_DIR, relativePath);
  
  // Ensure the resolved path starts with ROOT_DIR and is in allowed directories
  if (!resolved.startsWith(ROOT_DIR)) {
    return null;
  }
  
  const relativeFromRoot = path.relative(ROOT_DIR, resolved);
  const topDir = relativeFromRoot.split(path.sep)[0];
  
  if (!ALLOWED_DIRS.includes(topDir)) {
    return null;
  }
  
  return resolved;
}

// API: Get structured file tree of all tracks
app.get('/api/tree', (req, res) => {
  try {
    const tree = {};
    
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
              // Read status if it's a markdown/explanation file
              let status = 'not-started';
              const filePath = path.join(subDirPath, file);
              try {
                const content = fs.readFileSync(filePath, 'utf-8');
                if (content.includes('[x] In progress')) {
                  status = 'in-progress';
                } else if (content.includes('[x] Done')) {
                  status = 'done';
                }
              } catch (e) {
                // Ignore errors reading status
              }
              return { name: file, relativePath: path.relative(ROOT_DIR, filePath).replace(/\\/g, '/'), status };
            });
            
          tree[dir].push({
            name: subdir.name,
            relativePath: path.relative(ROOT_DIR, subDirPath).replace(/\\/g, '/'),
            files
          });
        }
      });
    });
    
    res.json(tree);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Get file contents
app.get('/api/file', (req, res) => {
  const fileRelativePath = req.query.path;
  const safePath = getSafePath(fileRelativePath);
  
  if (!safePath || !fs.existsSync(safePath)) {
    return res.status(400).json({ error: 'Invalid or non-existent file path' });
  }
  
  try {
    const content = fs.readFileSync(safePath, 'utf-8');
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Update status inside file
app.post('/api/status', (req, res) => {
  const { path: fileRelativePath, status } = req.body;
  const safePath = getSafePath(fileRelativePath);
  
  if (!safePath || !fs.existsSync(safePath)) {
    return res.status(400).json({ error: 'Invalid or non-existent file path' });
  }
  
  if (!['not-started', 'in-progress', 'done'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  
  try {
    let content = fs.readFileSync(safePath, 'utf-8');
    
    // Status line regex to match: ## Status: [ ] Not started / [ ] In progress / [ ] Done
    const statusRegex = /## Status:\s*\[([ xX]?)\]\s*Not started\s*\/\s*\[([ xX]?)\]\s*In progress\s*\/\s*\[([ xX]?)\]\s*Done/i;
    
    let replacement = '';
    if (status === 'not-started') {
      replacement = '## Status: [x] Not started / [ ] In progress / [ ] Done';
    } else if (status === 'in-progress') {
      replacement = '## Status: [ ] Not started / [x] In progress / [ ] Done';
    } else if (status === 'done') {
      replacement = '## Status: [ ] Not started / [ ] In progress / [x] Done';
    }
    
    if (statusRegex.test(content)) {
      content = content.replace(statusRegex, replacement);
      fs.writeFileSync(safePath, content, 'utf-8');
      return res.json({ success: true, message: 'Status updated inside file successfully.' });
    }
    
    res.status(400).json({ error: 'No status indicator found in the file' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`[Dashboard Backend] Running on http://localhost:${PORT}`);
});
