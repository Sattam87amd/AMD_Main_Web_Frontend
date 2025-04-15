// components/GoogleTranslateButton.jsx
import { useEffect } from 'react';
import { Globe } from 'lucide-react';

const GoogleTranslateButton = () => {
  useEffect(() => {
    // 1. Inject Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js';
    script.async = true;
    document.body.appendChild(script);

    // 2. Initialize widget
    const initInterval = setInterval(() => {
      if (
        window.google &&
        window.google.translate &&
        typeof window.google.translate.TranslateElement === 'function'
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'ar',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
        clearInterval(initInterval);
      }
    }, 300);

    // 3. Remove the blue banner iframe
    const removeBanner = () => {
      const iframe = document.querySelector('iframe.goog-te-banner-frame');
      const body = document.body;

      if (iframe) {
        iframe.remove();
        console.log('✅ Google Translate banner removed');
      }

      if (body && body.style.top !== '0px') {
        body.style.top = '0px';
      }
    };

    const bannerInterval = setInterval(removeBanner, 300);
    const timeout = setTimeout(() => clearInterval(bannerInterval), 20000);

    removeBanner(); // try once immediately

    return () => {
      clearInterval(initInterval);
      clearInterval(bannerInterval);
      clearTimeout(timeout);
    };
  }, []);

  const handleTranslate = () => {
    const path = window.location.pathname;
    const hostname = window.location.hostname;
    document.cookie = 'googtrans=/en/ar; path=/;';
    document.cookie = `googtrans=/en/ar; domain=${hostname}; path=/;`;
  
    // Add hash but don't reload
    window.location.hash = 'googtrans(en|ar)';
  
    // Wait and remove banner once translation is applied
    const removeBanner = () => {
      const iframe = document.querySelector('iframe.goog-te-banner-frame');
      const body = document.querySelector('body');
  
      if (iframe) iframe.remove();
      if (body) body.style.top = '0px';
    };
  
    setTimeout(removeBanner, 500); // run once
    const retry = setInterval(removeBanner, 300);
    setTimeout(() => clearInterval(retry), 10000);
  };
  

  return (
    <div className="relative">
      <div
        id="google_translate_element"
        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
      ></div>

      <button
        onClick={handleTranslate}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-md shadow transition duration-150 ease-in-out"
      >
        <Globe size={20} />
        <span>Translate to Arabic</span>
      </button>
    </div>
  );
};

export default GoogleTranslateButton;
