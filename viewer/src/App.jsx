import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';

// Load Prism tomorrow CSS (already loaded in index or App.css, but good to keep)
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markdown';

// Configure marked options for code highlighting
marked.setOptions({
  highlight: function (code, lang) {
    if (Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    }
    return code;
  },
  breaks: true,
  gfm: true
});

function App() {
  const [tree, setTree] = useState(null);
  const [staticDb, setStaticDb] = useState(null);
  const [openTabs, setOpenTabs] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [viewMode, setViewMode] = useState('preview'); // 'preview' or 'raw'
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Folder expansion state: mapping path keys to boolean
  const [expandedPaths, setExpandedPaths] = useState({
    'dsa': true,
    'js': true,
    'extra-skills': true
  });
  
  // Status dropdown state
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', show: false });
  const contentRef = useRef(null);

  // Helper to load localStorage status overrides
  const applyLocalStorageStatus = (treeData) => {
    if (!treeData) return null;
    const cloned = JSON.parse(JSON.stringify(treeData));
    Object.keys(cloned).forEach(trackKey => {
      cloned[trackKey].forEach(topic => {
        topic.files.forEach(file => {
          const storedStatus = localStorage.getItem(`status_${file.relativePath}`);
          if (storedStatus) {
            file.status = storedStatus;
          }
        });
      });
    });
    return cloned;
  };

  // Fetch the full file tree on mount
  const fetchTree = async () => {
    try {
      const res = await fetch('/api/tree');
      if (!res.ok) throw new Error('API server not available');
      const data = await res.json();
      
      const mergedTree = applyLocalStorageStatus(data);
      setTree(mergedTree);
      
      // Auto-select first file on very first load
      if (mergedTree && openTabs.length === 0 && !activeFile) {
        const dsaTrack = mergedTree['dsa'];
        if (dsaTrack && dsaTrack.length > 0 && dsaTrack[0].files && dsaTrack[0].files.length > 0) {
          handleOpenFile(dsaTrack[0].files[0]);
        }
      }
    } catch (err) {
      // Fallback to static_db.json for Vercel/Serverless
      try {
        const staticRes = await fetch('/static_db.json');
        if (!staticRes.ok) throw new Error('Static DB not found');
        const dbData = await staticRes.json();
        setStaticDb(dbData);
        
        const mergedTree = applyLocalStorageStatus(dbData.tree);
        setTree(mergedTree);
        
        if (mergedTree && openTabs.length === 0 && !activeFile) {
          const dsaTrack = mergedTree['dsa'];
          if (dsaTrack && dsaTrack.length > 0 && dsaTrack[0].files && dsaTrack[0].files.length > 0) {
            handleOpenFile(dsaTrack[0].files[0]);
          }
        }
      } catch (staticErr) {
        showToast('Error loading file list');
      }
    }
  };

  useEffect(() => {
    fetchTree();
  }, []);

  // Update file content when active file changes
  useEffect(() => {
    if (activeFile) {
      loadFileContent(activeFile.relativePath);
    } else {
      setFileContent('');
    }
  }, [activeFile]);

  // Run syntax highlighting whenever content or viewMode changes
  useEffect(() => {
    if (fileContent && contentRef.current) {
      Prism.highlightAllUnder(contentRef.current);
    }
  }, [fileContent, viewMode, activeFile]);

  const showToast = (message) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: '', show: false }), 2500);
  };

  const loadFileContent = async (relativePath) => {
    // If staticDb content is already loaded, use it immediately (O(1) client lookup)
    if (staticDb && staticDb.fileContents && staticDb.fileContents[relativePath] !== undefined) {
      setFileContent(staticDb.fileContents[relativePath]);
      setViewMode(relativePath.endsWith('.md') ? 'preview' : 'raw');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/file?path=${encodeURIComponent(relativePath)}`);
      const data = await res.json();
      setFileContent(data.content || '');
      setViewMode(relativePath.endsWith('.md') ? 'preview' : 'raw');
    } catch (err) {
      // Fallback to static data cache if network fails
      if (staticDb && staticDb.fileContents && staticDb.fileContents[relativePath] !== undefined) {
        setFileContent(staticDb.fileContents[relativePath]);
        setViewMode(relativePath.endsWith('.md') ? 'preview' : 'raw');
      } else {
        showToast('Error loading file content');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenFile = (file) => {
    // Check if file is already open
    const isAlreadyOpen = openTabs.find(tab => tab.relativePath === file.relativePath);
    if (!isAlreadyOpen) {
      setOpenTabs(prev => [...prev, file]);
    }
    
    // Make sure we load the local storage status for this file
    const storedStatus = localStorage.getItem(`status_${file.relativePath}`);
    const activeWithStatus = storedStatus ? { ...file, status: storedStatus } : file;
    
    setActiveFile(activeWithStatus);
    setSidebarOpen(false); // Close sidebar on mobile
  };

  const handleCloseFile = (e, relativePath) => {
    e.stopPropagation();
    const filteredTabs = openTabs.filter(tab => tab.relativePath !== relativePath);
    setOpenTabs(filteredTabs);

    if (activeFile?.relativePath === relativePath) {
      if (filteredTabs.length > 0) {
        // Set active file to last tab
        setActiveFile(filteredTabs[filteredTabs.length - 1]);
      } else {
        setActiveFile(null);
      }
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!activeFile) return;
    setStatusDropdownOpen(false);

    // Save status in browser local storage
    localStorage.setItem(`status_${activeFile.relativePath}`, newStatus);
    
    // Update local status states immediately
    const updatedFile = { ...activeFile, status: newStatus };
    setActiveFile(updatedFile);
    setOpenTabs(prev => prev.map(tab => 
      tab.relativePath === activeFile.relativePath ? updatedFile : tab
    ));

    try {
      // Try posting to backend API
      const res = await fetch('/api/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: activeFile.relativePath, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Marked as ${newStatus.replace('-', ' ')}`);
      } else {
        showToast('Saved to browser storage');
      }
    } catch (err) {
      // Fallback when offline or running hosted
      showToast('Saved to browser storage (Static)');
    }

    // Refresh tree to show new status dots in sidebar explorer
    fetchTree();
  };

  const findFileInTree = (relativePath) => {
    if (!tree) return null;
    let found = null;
    Object.keys(tree).forEach(trackKey => {
      tree[trackKey].forEach(topic => {
        topic.files.forEach(file => {
          if (file.relativePath === relativePath) {
            found = file;
          }
        });
      });
    });
    return found;
  };

  const handleBodyClick = (e) => {
    const anchor = e.target.closest('a');
    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href) {
        if (href.startsWith('file:///')) {
          e.preventDefault();
          const rootFolderToken = 'self-skill/';
          const idx = href.indexOf(rootFolderToken);
          if (idx !== -1) {
            const relativePath = href.substring(idx + rootFolderToken.length);
            const fileObj = findFileInTree(relativePath);
            if (fileObj) {
              handleOpenFile(fileObj);
            } else {
              const fileName = relativePath.split('/').pop();
              handleOpenFile({ name: fileName, relativePath, status: 'not-started' });
            }
          }
        }
      }
    }
  };

  const toggleFolder = (pathKey) => {
    setExpandedPaths(prev => ({
      ...prev,
      [pathKey]: !prev[pathKey]
    }));
  };

  // Helper calculations for status bar
  const getLineCount = () => {
    if (!fileContent) return 0;
    return fileContent.split('\n').length;
  };

  const getWordCount = () => {
    if (!fileContent) return 0;
    return fileContent.trim().split(/\s+/).filter(Boolean).length;
  };

  const getStatusLabel = (status) => {
    if (status === 'done') return 'Done';
    if (status === 'in-progress') return 'In Progress';
    return 'To Do';
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Reading file...</p>
        </div>
      );
    }

    if (!activeFile) {
      return (
        <div className="empty-state">
          <h2>🎓 Study Desk</h2>
          <p>Select a topic or file from the explorer sidebar to begin reading explanations and solving exercises.</p>
        </div>
      );
    }

    if (viewMode === 'preview' && activeFile.name.endsWith('.md')) {
      const htmlContent = marked.parse(fileContent);
      return (
        <div 
          ref={contentRef}
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      );
    } else {
      const langClass = activeFile.name.endsWith('.js') ? 'language-javascript' : 'language-markdown';
      return (
        <div ref={contentRef} className="code-viewer-container">
          <pre className="line-numbers">
            <code className={langClass}>{fileContent}</code>
          </pre>
        </div>
      );
    }
  };

  return (
    <div className="app-container">
      {/* Toast Alert */}
      <div className={`toast ${toast.show ? 'show' : ''}`}>
        {toast.message}
      </div>

      {/* Title Bar / Header */}
      <header className="main-header">
        <div className="header-left">
          <button className="menu-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '✕' : '☰'}
          </button>
          <div className="logo-section">
            <span className="logo-emoji">📖</span>
            <h1>Study Desk</h1>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="workspace">
        {/* Mobile Sidebar Backdrop */}
        {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>}
        
        {/* Sidebar - VS Code style Explorer */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>Explorer</h3>
          </div>
          <div className="tree-navigation">
            {tree ? (
              Object.keys(tree).map(trackKey => {
                const trackFolders = tree[trackKey] || [];
                const isTrackExpanded = !!expandedPaths[trackKey];
                
                return (
                  <div key={trackKey} className="tree-node">
                    {/* Track Level Folder */}
                    <div 
                      className="tree-node-label"
                      onClick={() => toggleFolder(trackKey)}
                    >
                      <span className={`folder-arrow ${isTrackExpanded ? 'expanded' : ''}`}>▶</span>
                      <span className="folder-icon">📁</span>
                      <span>{trackKey}</span>
                    </div>

                    {/* Subfolders & Files under Track */}
                    {isTrackExpanded && (
                      <div className="tree-node-children" style={{ paddingLeft: '1rem' }}>
                        {trackFolders.map(topic => {
                          const topicPath = `${trackKey}/${topic.name}`;
                          const isTopicExpanded = !!expandedPaths[topicPath];
                          
                          return (
                            <div key={topic.name} className="tree-node">
                              {/* Topic Level Folder */}
                              <div 
                                className="tree-node-label"
                                onClick={() => toggleFolder(topicPath)}
                              >
                                <span className={`folder-arrow ${isTopicExpanded ? 'expanded' : ''}`}>▶</span>
                                <span className="folder-icon">📁</span>
                                <span>{topic.name}</span>
                              </div>

                              {/* Files under Topic */}
                              {isTopicExpanded && (
                                <div className="tree-node-children" style={{ paddingLeft: '1.25rem' }}>
                                  {topic.files.map(file => {
                                    const isActive = activeFile?.relativePath === file.relativePath;
                                    
                                    // Make sure status displays correctly based on live overrides
                                    const storedStatus = localStorage.getItem(`status_${file.relativePath}`);
                                    const displayStatus = storedStatus || file.status;
                                    
                                    return (
                                      <div 
                                        key={file.relativePath}
                                        className={`tree-node-label ${isActive ? 'active' : ''}`}
                                        onClick={() => handleOpenFile(file)}
                                      >
                                        <span className={`status-dot status-${displayStatus}`}></span>
                                        <span>{file.name}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            )}
          </div>
        </aside>

        {/* Content Panel Frame */}
        <main className="content-viewer">
          {/* Tab Bar */}
          {openTabs.length > 0 && (
            <div className="tab-bar">
              {openTabs.map(tab => {
                const isActive = activeFile?.relativePath === tab.relativePath;
                return (
                  <div 
                    key={tab.relativePath}
                    className={`tab-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveFile(tab)}
                  >
                    <span>{tab.name}</span>
                    <span 
                      className="tab-close"
                      onClick={(e) => handleCloseFile(e, tab.relativePath)}
                    >
                      ×
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Subheader / File Info & Preview Toggle */}
          {activeFile && (
            <div className="content-subheader">
              <div className="file-info">
                <span className="file-tag">{activeFile.name.endsWith('.md') ? 'DOC' : 'CODE'}</span>
                <span className="file-path">{activeFile.relativePath}</span>
              </div>
              
              <div className="editor-controls">
                {activeFile.name.endsWith('.md') && (
                  <div className="toggle-group">
                    <button 
                      className={`toggle-btn ${viewMode === 'raw' ? 'active' : ''}`}
                      onClick={() => setViewMode('raw')}
                    >
                      RAW
                    </button>
                    <button 
                      className={`toggle-btn ${viewMode === 'preview' ? 'active' : ''}`}
                      onClick={() => setViewMode('preview')}
                    >
                      PREVIEW
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Render Area */}
          <div className="content-body-wrapper" onClick={handleBodyClick}>
            {renderContent()}
          </div>
        </main>
      </div>

      {/* VS Code Status Bar */}
      <footer className="status-bar">
        <div className="status-left">
          <span>{activeFile ? `~/ ${activeFile.relativePath}` : 'No file open'}</span>
        </div>
        
        <div className="status-right">
          {activeFile && (
            <>
              {/* Word & Line Count */}
              <span>Ln {getLineCount()}, Col 1</span>
              <span>{getWordCount()} words</span>
              
              {/* Status Badge Dropdown */}
              <div className="status-dropdown">
                <span 
                  className={`status-badge badge-${activeFile.status || 'todo'}`}
                  onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                >
                  [{getStatusLabel(activeFile.status)}]
                </span>
                
                {statusDropdownOpen && (
                  <div className="status-dropdown-content">
                    <div 
                      className="status-dropdown-item"
                      onClick={() => handleStatusChange('not-started')}
                    >
                      <span className="status-dot status-todo"></span>
                      To Do
                    </div>
                    <div 
                      className="status-dropdown-item"
                      onClick={() => handleStatusChange('in-progress')}
                    >
                      <span className="status-dot status-progress"></span>
                      In Progress
                    </div>
                    <div 
                      className="status-dropdown-item"
                      onClick={() => handleStatusChange('done')}
                    >
                      <span className="status-dot status-done"></span>
                      Completed
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;
