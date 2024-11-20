import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { translations } from '../translations/faq';

interface FAQProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQ: React.FC<FAQProps> = ({ isOpen, onClose }) => {
  useTheme();
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('faqLanguage') || 'en';
  });

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('faqLanguage', lang);
  };

  const currentTranslation = translations[language];

  return (
    <div 
      className={`fixed inset-0 bg-black/90 transition-opacity duration-300 ease-in-out z-50 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          bg-primary border border-custom rounded-lg w-[800px] max-h-[80vh] p-6 shadow-xl overflow-hidden`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-primary">{currentTranslation.title}</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-2 py-1 rounded transition-colors duration-200 ${
                  language === 'en' ? 'bg-accent text-white' : 'bg-secondary hover:bg-hover-bg'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('ru')}
                className={`px-2 py-1 rounded transition-colors duration-200 ${
                  language === 'ru' ? 'bg-accent text-white' : 'bg-secondary hover:bg-hover-bg'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => handleLanguageChange('ja')}
                className={`px-2 py-1 rounded transition-colors duration-200 ${
                  language === 'ja' ? 'bg-accent text-white' : 'bg-secondary hover:bg-hover-bg'
                }`}
              >
                JA
              </button>
              <button
                onClick={() => handleLanguageChange('pt')}
                className={`px-2 py-1 rounded transition-colors duration-200 ${
                  language === 'pt' ? 'bg-accent text-white' : 'bg-secondary hover:bg-hover-bg'
                }`}
              >
                PT
              </button>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar pr-4" style={{ maxHeight: 'calc(80vh - 100px)' }}>
          <div className="space-y-8">
            {currentTranslation.sections.map((section, index) => (
              <div key={index} className="bg-secondary p-6 rounded-lg">
                <h3 className="text-xl font-bold text-accent mb-4">{section.title}</h3>
                <div className="text-primary">{section.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 