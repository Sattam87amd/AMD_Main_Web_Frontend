import { Globe } from 'lucide-react';
import { useEffect } from 'react';

const TranslateButton = () => {
  const handleTranslate = () => {
    // Select the language dropdown inserted by the Google Translate widget
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = 'ar'; // Set the value to Arabic
      // Create and dispatch a change event to trigger the translation
      const event = document.createEvent('HTMLEvents');
      event.initEvent('change', true, true);
      combo.dispatchEvent(event);
    }
  };

  return (
    <button 
      onClick={handleTranslate} 
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-md shadow transition duration-150 ease-in-out"
    >
      <Globe size={20} />
      <span>Translate to Arabic</span>
    </button>
  );
};

export default TranslateButton;