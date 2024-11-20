import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import logoImage from '../assets/images/logo.png';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPath: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, onSelectPath }) => {
  const { theme } = useTheme();
  const hasCheckedPath = useRef(false);

  useEffect(() => {
    if (isOpen && !hasCheckedPath.current) {
      handleAutoDetect();
      hasCheckedPath.current = true;
    }
  }, [isOpen]);

  const handleAutoDetect = async () => {
    try {
      const defaultPath = await window.electron.checkDefaultOsuPath();
      if (defaultPath) {
        localStorage.setItem('osuPath', defaultPath);
        alert('Successfully found and set osu! path automatically!\nPath: ' + defaultPath);
        onClose();
      } else {
        console.log('Could not find osu! in default location. Please select manually.');
      }
    } catch (error) {
      console.error('Error auto-detecting osu! path:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/90 transition-opacity duration-300 ease-in-out z-50 
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div 
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          bg-primary border border-custom rounded-lg w-[500px] p-6 shadow-xl
          transition-all duration-300 ease-in-out text-center`}
      >
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center space-y-6 mt-4">
          <img src={logoImage} alt="OSL" className="w-24 h-24 animate-bounce" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-accent bg-clip-text text-transparent">
            Welcome to OSL!
          </h1>
          <p className="text-secondary max-w-md">
            To continue using the launcher, please select your osu! executable file.
          </p>
          
          <div className="flex space-x-4 mt-8">
            <button
              onClick={onSelectPath}
              className="px-6 py-3 bg-accent hover:bg-[#5020C9] rounded-lg 
                transition-all duration-200 flex items-center space-x-2 text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Select osu!.exe</span>
            </button>
            <button
              onClick={onClose}
              className={`px-6 py-3 rounded-lg transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-secondary hover:bg-hover-bg'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Select Later
            </button>
          </div>

          <div className="mt-4 text-sm text-secondary">
            <p>You can change the osu! path later in settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal; 