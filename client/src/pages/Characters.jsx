import { useState, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { KanjiChart } from '../components';
import { charBannerText } from '../constants/constants';
import hiraganaData from '../data/hiragana/hiraganaData';
import katakanaData from '../data/katakana/katakanaData';

const HIRAGANA_SECTIONS = [
  { key: 'basic', label: 'Basic Hiragana' },
  { key: 'diacritics', label: 'Diacritics' },
  { key: 'contracted', label: 'Contracted Sounds' },
  { key: 'doubleConsonants', label: 'Double Consonants' },
  { key: 'longVowels', label: 'Long Vowels' },
];
const KATAKANA_SECTIONS = [
  { key: 'basic', label: 'Basic Katakana' },
  { key: 'diacritics', label: 'Diacritics' },
  { key: 'contracted', label: 'Contracted Sounds' },
  { key: 'doubleConsonants', label: 'Double Consonants' },
  { key: 'longVowels', label: 'Long Vowels' },
];

const sectionAccent = [
  'bg-palette-4',
  'bg-palette-1',
  'bg-palette-5',
  'bg-palette-3',
  'bg-palette-2',
];

const Characters = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const tabs = ['Hiragana', 'Katakana', 'Kanji'];
  const [activeTab, setActiveTab] = useState('Hiragana');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // { character, romaji }
  const searchRef = useRef(null);

  // Filtered section data
  const getSectionData = (data, sections) =>
    sections.map((section) => ({
      ...section,
      chars: data[section.key].filter(
        (char) =>
          char.character &&
          (char.character.includes(search) || char.romaji.toLowerCase().includes(search.toLowerCase()))
      ),
    }));

  // Sticky search bar
  const SearchBar = (
    <div className="sticky top-0 z-20 bg-white dark:bg-palette-6 py-4 mb-4 flex flex-col md:flex-row md:items-center gap-4 shadow-sm">
      <input
        ref={searchRef}
        type="text"
        placeholder={`Search ${activeTab}...`}
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full md:w-80 px-4 py-2 rounded-lg border border-palette-3 dark:border-palette-5 bg-white dark:bg-palette-6 text-lg focus:outline-none focus:ring-2 focus:ring-palette-4"
      />
      {(activeTab === 'Hiragana' || activeTab === 'Katakana') && (
        <Link
          to={`/quiz/${activeTab.toLowerCase()}`}
          className="w-full md:w-fit px-8 py-3 font-bold text-lg text-center text-palette-2 dark:text-palette-6 bg-palette-4 hover:bg-palette-1 dark:bg-palette-3 dark:hover:bg-palette-5 rounded-xl"
        >
          Start {activeTab} Quiz
        </Link>
      )}
    </div>
  );

  return (
    <section id="characters" className="w-full min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-palette-6">
      <div className="mb-8">
        {/* Page Heading */}
        <h1 className="h1-style mb-8">Characters</h1>
        {/* Tabs */}
        <div className="mb-8 border-b-2 border-b-palette-3 dark:border-palette-5 flex justify-center sm:justify-start">
          <div className="w-full sm:max-w-md grid grid-cols-3 font-bold sm:text-lg text-center">
            {tabs.map((tab) => (
              <button
                key={`id-${tab}`}
                type="button"
                className={`tab-style ${activeTab === tab ? 'tab-active-style' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {/* Banner */}
        <div className="banner-container-style text-palette-2 text-shadow bg-gradient-to-r from-palette-1 to-palette-5">
          <div className="relative p-8 z-10">
            <h2 className="banner-heading mb-3">Let's learn {activeTab}!</h2>
            <p className="text-lg">{charBannerText[activeTab]}</p>
          </div>
          <div className="banner-bg-style bg-clouds" />
        </div>
      </div>
      {/* Content */}
      <div>
        {(activeTab === 'Hiragana' || activeTab === 'Katakana') ? (
          <>
            {SearchBar}
            <div className="flex flex-col gap-10">
              {(activeTab === 'Hiragana'
                ? getSectionData(hiraganaData, HIRAGANA_SECTIONS)
                : getSectionData(katakanaData, KATAKANA_SECTIONS)
              ).map((section, i) => (
                section.chars.length > 0 && (
                  <div key={section.key} className="mb-2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2 h-8 rounded-full ${sectionAccent[i % sectionAccent.length]}`}></div>
                      <h2 className="text-xl md:text-2xl font-bold text-palette-1 dark:text-palette-2 tracking-wide">{section.label}</h2>
                    </div>
                    <div className="overflow-x-auto pb-2">
                      <div className="flex gap-4 md:gap-6 min-w-fit">
                        {section.chars.map((char, idx) => (
                          <button
                            key={char.character + idx}
                            className="min-w-[90px] max-w-[110px] md:min-w-[120px] md:max-w-[140px] h-36 md:h-44 flex flex-col items-center justify-center bg-white dark:bg-palette-5 rounded-2xl shadow-md border-2 border-transparent hover:border-palette-4 dark:hover:border-palette-4 hover:shadow-xl transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-palette-4 relative"
                            onClick={() => setModal(char)}
                          >
                            <span className="text-3xl md:text-4xl font-extrabold text-palette-1 dark:text-palette-2 mb-3 group-hover:text-palette-4 transition-colors tracking-tight">{char.character}</span>
                            <span className="px-3 py-1 rounded-full bg-palette-4/10 text-palette-4 dark:bg-palette-3/20 dark:text-palette-3 font-bold text-base md:text-lg group-hover:bg-palette-4 group-hover:text-white transition-colors tracking-wide">{char.romaji}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </>
        ) : (
          // Kanji tab untouched
          <div className="mt-8">
            <KanjiChart />
          </div>
        )}
      </div>
      {/* Modal for character details */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setModal(null)}>
          <div className="bg-white dark:bg-palette-6 rounded-2xl shadow-2xl p-8 min-w-[240px] max-w-xs flex flex-col items-center relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-palette-4 hover:text-palette-1 text-2xl font-bold" onClick={() => setModal(null)}>&times;</button>
            <span className="text-6xl font-extrabold text-palette-1 dark:text-palette-2 mb-2">{modal.character}</span>
            <span className="text-lg text-palette-4 dark:text-palette-3 font-bold mb-2">{modal.romaji}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Characters;
