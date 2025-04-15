import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

const GoogleTranslateButton = () => {
  const [isArabic, setIsArabic] = useState(false);

  // Set and get cookies
  const setCookie = (name, value) => {
    document.cookie = `${name}=${value}; path=/; domain=${window.location.hostname}`;
  };

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  useEffect(() => {
    // 1. Inject Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // 2. Define global init function for Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'ar',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // 3. Remove banner logic
    const removeBanner = () => {
      const iframe = document.querySelector('iframe.goog-te-banner-frame');
      const body = document.body;

      if (iframe) {
        iframe.remove();
        console.log('✅ Google Translate banner removed');
      }

      if (body && body.style.top !== '0px') {
        body.style.top = '0px';
        console.log('✅ Body top style reset');
      }
    };

    // Initial language check from cookie
    const lang = getCookie('googtrans');
    setIsArabic(lang?.includes('/en/ar'));

    // Repeated cleanup
    const interval = setInterval(removeBanner, 500);
    const timeout = setTimeout(() => clearInterval(interval), 10000);

    // MutationObserver as backup
    const observer = new MutationObserver(removeBanner);
    observer.observe(document.body, { childList: true, subtree: true });

    removeBanner(); // Immediate

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  const handleTranslate = () => {
    const newLang = isArabic ? '/ar/en' : '/en/ar';
    setCookie('googtrans', newLang);
    setIsArabic(!isArabic);
    window.location.reload(); // Apply translation
  };

  return (
    <div className="relative">
      {/* Hidden container for Google Translate widget */}
      <div
        id="google_translate_element"
        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
      ></div>

      <button
        onClick={handleTranslate}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-md shadow transition duration-150 ease-in-out"
      >
        <Globe size={20} />
        <span>{isArabic ? 'Translate to English' : 'ترجم إلى العربية'}</span>
      </button>
    </div>
  );
};

export default GoogleTranslateButton;
