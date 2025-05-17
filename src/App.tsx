import { useState, useEffect } from 'react'
import type { Server } from './types/Server'
import Settings from './components/Settings'
import WelcomeModal from './components/WelcomeModal'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import FAQ from './components/FAQ'
import logoImage from './assets/images/logo.png'
import iconGif from './assets/images/icon.gif'

function SplashScreen({ visible }: { visible: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700 bg-[#0b0c0b] ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      style={{ transitionProperty: 'opacity' }}
    >
      <img src={logoImage} alt="OSL Logo" className="w-32 h-32 mb-6 animate-splash-bounce" />
      <h1 className="text-3xl font-bold text-white mb-2">OSL</h1>
      <span className="text-lg text-gray-400">osu! Server List Launcher</span>
    </div>
  )
}

// Создаем отдельный компонент для основного содержимого
function AppContent() {
  const { theme } = useTheme(); // Используем хук useTheme здесь
  const [servers, setServers] = useState<Server[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'votes' | 'players' | 'none'>('none')
  const [showFavorites, setShowFavorites] = useState(false)
  const [favorites, setFavorites] = useState<Server[]>(() => {
    const saved = localStorage.getItem('favoriteServers')
    return saved ? JSON.parse(saved) : []
  })
  const [favoritesSort, setFavoritesSort] = useState<'votes' | 'players' | 'none'>(() => {
    const saved = localStorage.getItem('favoritesSort')
    return (saved as 'votes' | 'players' | 'none') || 'none'
  })
  const [selectedServerDetails, setSelectedServerDetails] = useState<{
    name: string;
    image: string;
  } | null>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [osuPath, setOsuPath] = useState<string>(() => {
    return localStorage.getItem('osuPath') || ''
  })
  const [showWelcome, setShowWelcome] = useState(() => {
    const isFirstLaunch = !localStorage.getItem('hasLaunched');
    const hasOsuPath = localStorage.getItem('osuPath');
    
    if (isFirstLaunch) {
      localStorage.setItem('hasLaunched', 'true');
    }
    
    return isFirstLaunch || !hasOsuPath;
  })
  const [autoClose, setAutoClose] = useState(() => {
    return localStorage.getItem('autoClose') === 'true';
  });
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('autoClose', autoClose.toString());
  }, [autoClose]);

  useEffect(() => {
    setLoading(true)
    setError(null)
    console.log('Fetching servers...')
    
    fetch('https://osu-server-list.com/api/v2/client/servers?key=PfGLccr8pA5nOp1')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        console.log('Received data:', data)
        setServers(data)
        const updatedFavorites = favorites.map(fav => {
          const updatedServer = data.find((s: Server) => s.id === fav.id);
          return updatedServer || fav;
        });
        setFavorites(updatedFavorites);
        localStorage.setItem('favoriteServers', JSON.stringify(updatedFavorites));
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching servers:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // В компоненте AppContent обновляем useEffect для проверки пути
  useEffect(() => {
    const checkOsuPath = async () => {
      // Сначала проверяем сохраненный путь
      const savedPath = localStorage.getItem('osuPath');
      if (savedPath) {
        setOsuPath(savedPath);
        return;
      }

      // Если сохраненного пути нет, показываем приветственное окно
      setShowWelcome(true);
    };

    checkOsuPath();
  }, []); // Проверяем только при первом рендере

  // Функция выбора пти к osu!
  const selectOsuPath = async () => {
    try {
      // Сначала пробуем найти автоматически
      const defaultPath = await window.electron.checkDefaultOsuPath();
      if (defaultPath) {
        console.log('Found osu! automatically:', defaultPath);
        setOsuPath(defaultPath);
        localStorage.setItem('osuPath', defaultPath);
        setShowWelcome(false);
        alert('Successfully found and set osu! path automatically!\nPath: ' + defaultPath);
        return defaultPath;
      }

      // Если автоматически не нашли, открываем диалог выбора файла
      console.log('Opening file dialog...');
      const filePath = await window.electron.openFileDialog();
      console.log('Selected file path:', filePath);
      
      if (filePath) {
        if (!filePath.toLowerCase().endsWith('.exe')) {
          console.error('Invalid file type - not an .exe');
          alert('Please select an .exe file!');
          return null;
        }
        console.log('Setting osu path:', filePath);
        setOsuPath(filePath);
        localStorage.setItem('osuPath', filePath);
        console.log('Saved osu path to localStorage');
        setShowWelcome(false);
        return filePath;
      }
      console.log('No file selected');
      return null;
    } catch (error) {
      console.error('Failed to select file:', error);
      return null;
    }
  };

  // Функция запуска сервера
  const launchServer = async () => {
    try {
      if (!selectedServerDetails || !osuPath) return;
      
      const server = servers.find(s => s.name === selectedServerDetails.name);
      if (!server) throw new Error('Server not found');

      // Устанавливаем статус активной сессии
      setIsSessionActive(true);

      // Launch osu! and wait for process completion
      await window.electron.launchOsu([osuPath], server.devserver);
      
      // После завершения процесса обновляем статус
      setIsSessionActive(false);
      
      if (autoClose) {
        window.electron.close();
      }
    } catch (error) {
      // В случае ошибки также обновляем статус
      setIsSessionActive(false);
      console.error('Failed to launch osu:', error);
      alert('Failed to launch osu! Please check the path and try again.');
    }
  };

  const handleLaunch = () => {
    if (selectedServerDetails) {
      launchServer()
    }
  }

  // Обновляем функцию getSortedServers
  const getSortedServers = () => {
    let serversToSort = showFavorites ? [...favorites] : [...servers];

    // Если отображаются избранные
    if (showFavorites) {
      if (favoritesSort === 'players') {
        serversToSort.sort((a, b) => b.players - a.players);
      } else if (favoritesSort === 'votes') {
        serversToSort.sort((a, b) => b.votes - a.votes);
      }
      // Если favoritesSort === 'none', оставляем порядок как есть
    } 
    // Если отображаются все серверы
    else {
      if (sortBy === 'votes') {
        serversToSort.sort((a, b) => b.votes - a.votes);
      } else if (sortBy === 'players') {
        serversToSort.sort((a, b) => b.players - a.players);
      }
    }

    return serversToSort;
  }

  // Функция для управления избранными серверами
  const toggleFavorite = (server: Server) => {
    const isFavorite = favorites.some(fav => fav.id === server.id)
    let newFavorites: Server[]
    
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== server.id)
    } else {
      newFavorites = [...favorites, server]
    }
    
    setFavorites(newFavorites)
    localStorage.setItem('favoriteServers', JSON.stringify(newFavorites))
  }

  const openInBrowser = (url: string) => {
    try {
      window.electron.openExternal(url)
    } catch (error) {
      console.error('Failed to open URL:', error)
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  // Добавляем обработчик горячих клавиш для сброса настроек (только для разработки)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl + Shift + R для сброса всех настроек
      if (event.ctrlKey && event.shiftKey && event.key === 'R') {
        localStorage.clear();
        window.location.reload();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);


  return (
    <>
      <SplashScreen visible={showSplash} />
      <div className={`h-screen w-screen ${theme === 'dark' ? 'bg-[#0b0c0b]' : 'bg-white'} text-primary flex flex-col overflow-hidden ${showSplash ? 'overflow-hidden h-screen' : ''}`} style={{ pointerEvents: showSplash ? 'none' : 'auto' }}>
        {/* Кнопки управления окном в правом верхнем углу */}
        <div className="fixed top-0 right-0 flex items-center z-50">
          <button
            onClick={() => window.electron.minimize()}
            className="h-8 w-12 hover:bg-hover-bg transition-colors duration-200 flex items-center justify-center titlebar-button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={() => window.electron.close()}
            className="h-8 w-12 hover:bg-red-500 hover:text-white transition-colors duration-200 flex items-center justify-center titlebar-button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Основной контент */}
        <div className="flex-1 relative">
          {/* Боковая панель - обновляем отступ сверху */}
          <div className={`fixed left-0 top-0 h-[calc(100vh-60px)] w-64 ${
            theme === 'dark' ? 'bg-[#0b0c0b]' : 'bg-white'
          } border-r border-custom p-4`}>
            <div className="flex items-center mb-8">
              <img src={logoImage} alt="OSL" className="w-12 h-12" />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-primary">OSL</h1>
                <p className="text-sm text-secondary">OsuListLauncher</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => openInBrowser('https://osu-server-list.com/')}
                className={`w-full text-left px-4 py-2 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-[#0b0c0b] hover:bg-[#252525] text-white'
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Website
                </div>
              </button>

              <button 
                onClick={() => openInBrowser('https://discord.gg/AyEFRYHjb4')}
                className={`w-full text-left px-4 py-2 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-[#0b0c0b] hover:bg-[#252525] text-white'
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Discord
              </div>
              </button>

              <button 
                onClick={() => setIsFAQOpen(true)}
                className={`w-full text-left px-4 py-2 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-[#0b0c0b] hover:bg-[#252525] text-white'
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  FAQ & Help
                </div>
              </button>

              <button 
                onClick={() => setIsSettingsOpen(true)}
                className={`w-full text-left px-4 py-2 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-[#0b0c0b] hover:bg-[#252525] text-white'
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </div>
              </button>

              <div className="w-full text-left px-4 py-2 text-gray-400">
                <div className="flex items-center">
                  <img 
                    src={iconGif} 
                    alt="KyurenoXD" 
                    className="w-5 h-5 mr-2 rounded-full"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <span className="text-sm">powered by KyurenoXD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Панель сортировки и фильтрации - обновляем отступ слева */}
          <div className={`ml-64 pt-4 px-6 flex items-center space-x-4 border-b border-custom pb-4 ${
            theme === 'dark' ? 'bg-[#0b0c0b]' : 'bg-white'
          }`}>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Sort by:</span>
              <button 
                onClick={() => setSortBy('votes')}
                className={`px-3 py-1 rounded transition-all duration-200 ${
                  sortBy === 'votes' 
                    ? 'bg-purple-500 bg-opacity-20 text-purple-500' 
                    : theme === 'dark' 
                      ? 'bg-[#0b0c0b] hover:bg-[#252525] text-white border border-white/20'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                }`}
              >
                Votes
              </button>
              <button 
                onClick={() => setSortBy('players')}
                className={`px-3 py-1 rounded transition-all duration-200 ${
                  sortBy === 'players' 
                    ? 'bg-green-500 bg-opacity-20 text-green-500' 
                    : theme === 'dark'
                      ? 'bg-[#0b0c0b] hover:bg-[#252525] text-white border border-white/20'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                }`}
              >
                Players
              </button>
            </div>
            <div className="h-6 w-px bg-[#2a2a2a]"></div>
            <button 
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-3 py-1 rounded flex items-center transition-all duration-200 ${
                showFavorites 
                  ? 'bg-yellow-500 bg-opacity-20 text-yellow-500' 
                  : theme === 'dark'
                    ? 'bg-[#0b0c0b] hover:bg-[#252525] text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
              }`}
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Favorites ({favorites.length})
            </button>
            <div className="h-6 w-px bg-[#2a2a2a]"></div>
            <button 
              onClick={() => {
                setLoading(true);
                fetch('https://osu-server-list.com/api/v2/client/servers?key=PfGLccr8pA5nOp1')
                  .then(res => {
                    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                    return res.json();
                  })
                  .then(data => {
                    setServers(data);
                    setLoading(false);
                  })
                  .catch(err => {
                    setError(err.message);
                    setLoading(false);
                  });
              }}
              className={`px-3 py-1 rounded flex items-center transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-[#0b0c0b] hover:bg-[#252525] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
              }`}
              disabled={loading}
            >
              <svg 
                className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
              Refresh
            </button>
          </div>

          {/* Основной контент - обновляем отступы */}
          <div className="ml-64 p-6 mb-0 h-[calc(100vh-60px)] flex flex-col">
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
              {loading ? (
                <div className="text-center py-4 text-primary">Loading servers...</div>
              ) : error ? (
                <div className="text-red-500 text-center py-4">Error: {error}</div>
              ) : servers.length === 0 ? (
                <div className="text-center py-4 text-primary">No servers found</div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {getSortedServers().map(server => (
                    <div 
                      key={server.id} 
                      className={`server-card p-4 w-full transform transition-all duration-300 ease-in-out ${
                        theme === 'dark' 
                          ? 'bg-[#0b0c0b]' 
                          : 'bg-white shadow-sm hover:shadow-md border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <div className="relative group">
                            <img 
                              src={server.image} 
                              alt={server.name} 
                              className="w-16 h-16 rounded object-cover aspect-square transition duration-200"
                              onError={(e) => {
                                e.currentTarget.src = logoImage
                              }}
                            />
                            {/* Hover overlay for full image, always small, with scale-down animation */}
                            <div className="hidden group-hover:flex animate-scale-down absolute z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 p-1 rounded shadow-lg items-center justify-center" style={{width: '64px', height: '64px'}}>
                              <img 
                                src={server.image} 
                                alt={server.name + ' full'} 
                                className="w-full h-full object-contain rounded bg-transparent"
                                onError={(e) => {
                                  e.currentTarget.src = logoImage
                                }}
                              />
                              {/* Online circle above overlay */}
                              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black z-10 ${
                                server.players >= 0 ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                            </div>
                            {/* Online circle for normal state */}
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full z-10 ${
                              server.players >= 0 ? 'bg-green-500' : 'bg-red-500'
                            } group-hover:hidden`}></div>
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <h2 className="text-lg font-bold">{server.name}</h2>
                                  <button 
                                    onClick={() => toggleFavorite(server)}
                                    className={`ml-2 p-1 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                      favorites.some(fav => fav.id === server.id)
                                        ? 'text-yellow-500 hover:text-yellow-600'
                                        : 'text-gray-400 hover:text-[#6528F7]'
                                    }`}
                                  >
                                    {favorites.some(fav => fav.id === server.id) ? (
                                      // Звезда для избранного
                                      <svg 
                                        className="w-5 h-5 transform transition-transform duration-300 animate-[wiggle_0.3s_ease-in-out]" 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ) : (
                                      // Плюсик для обавления в избранное
                                      <svg 
                                        className="w-5 h-5 transition-transform duration-300" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                      >
                                        <path 
                                          strokeLinecap="round" 
                                          strokeLinejoin="round" 
                                          strokeWidth={2} 
                                          d="M12 4v16m8-8H4" 
                                        />
                                      </svg>
                                    )}
                                  </button>
                                </div>
                                <a 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openInBrowser(`https://osu-server-list.com/server/${server.safe_name}`);
                                  }}
                                  href={`https://osu-server-list.com/server/${server.safe_name}`}
                                  className={`text-sm text-gray-400 mt-1 block transition-colors duration-200 ${
                                    theme === 'dark' 
                                      ? 'hover:text-white' 
                                      : 'hover:text-[#6528F7]'
                                  }`}
                                >
                                  {server.url}
                                </a>
                              </div>
                              <div className="flex space-x-3 mt-6">
                                <div className="px-3 py-1 bg-opacity-20 bg-green-500 rounded-full flex items-center">
                                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                  <span className="text-green-500 font-medium">{server.players} online</span>
                                </div>
                                <div className="px-3 py-1 bg-opacity-20 bg-purple-500 rounded-full flex items-center">
                                  <svg className="w-4 h-4 text-purple-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span className="text-purple-500 font-medium">{server.votes}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-400">
                              <span>Server: {server.devserver}</span>
                              <span className="ml-2">Added: {server.timestamp}</span>
                            </div>
                          </div>
                        </div>

                        {/* Кнопки справа */}
                        <div className="flex items-center space-x-2 ml-4">
                          <button 
                            onClick={() => openInBrowser(`https://osu-server-list.com/server/${server.safe_name}`)}
                            className={`px-3 py-1 rounded transition-colors duration-200 ${
                              theme === 'dark'
                                ? 'bg-[#0b0c0b] hover:bg-[#252525] text-white border border-white/20'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                            }`}
                          >
                            View
                          </button>
                          <button 
                            onClick={() => openInBrowser(`https://osu-server-list.com/server/${server.safe_name}/vote`)}
                            className={`px-3 py-1 rounded transition-colors duration-200 ${
                              theme === 'dark'
                                ? 'bg-[#0b0c0b] hover:bg-[#252525] text-white border border-white/20'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                            }`}
                          >
                            Vote
                          </button>
                          <button 
                            onClick={() => setSelectedServerDetails({
                              name: server.name,
                              image: server.image
                            })}
                            className="px-4 py-2 bg-[#6528F7] hover:bg-[#5020C9] rounded text-white"
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Нижняя панель */}
          <div className={`fixed bottom-0 left-0 right-0 h-[60px] flex items-center justify-between px-4 ${
            theme === 'dark' ? 'bg-[#0b0c0b]' : 'bg-white'
          } border-t border-custom`}>
            <div className="flex items-center ml-64">
              {selectedServerDetails && (
                <div className="flex items-center">
                  <img 
                    src={selectedServerDetails.image} 
                    alt={selectedServerDetails.name}
                    className="w-8 h-8 rounded mr-3"
                    onError={(e) => {
                      e.currentTarget.src = logoImage
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold">{selectedServerDetails.name}</span>
                    <div className="flex items-center text-sm">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        isSessionActive ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      <span className={`${
                        isSessionActive ? 'text-green-500' : 'text-gray-400'
                      }`}>
                        {isSessionActive ? 'Active' : 'Not Active'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={selectOsuPath}
                className={`px-4 py-2 rounded text-sm flex items-center ${
                  !osuPath 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : theme === 'dark'
                      ? 'bg-[#0b0c0b] hover:bg-[#252525] text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                }`}
              >
                <svg 
                  className="w-4 h-4 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                  />
                </svg>
                {osuPath ? 'Change Path' : 'Select osu!.exe'}
              </button>
              <button 
                className={`px-6 py-2 rounded ${
                  selectedServerDetails
                    ? 'bg-[#6528F7] hover:bg-[#5020C9] text-white'
                    : theme === 'dark'
                      ? 'bg-[#0b0c0b] text-gray-600'
                      : 'bg-gray-100 text-gray-400 border border-gray-200'
                }`}
                disabled={!selectedServerDetails}
                onClick={handleLaunch}
              >
                Launch
              </button>
            </div>
          </div>

          {/* Модальные окна */}
          <WelcomeModal 
            isOpen={showWelcome}
            onClose={() => setShowWelcome(false)}
            onSelectPath={selectOsuPath}
          />

          <Settings 
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            favoritesSort={favoritesSort}
            setFavoritesSort={setFavoritesSort}
            autoClose={autoClose}
            setAutoClose={setAutoClose}
          />

          <FAQ 
            isOpen={isFAQOpen}
            onClose={() => setIsFAQOpen(false)}
          />
        </div>
      </div>
    </>
  )
}

// Основной компонент App теперь только оборачивает контент в ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App