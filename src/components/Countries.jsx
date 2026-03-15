import React, { use, useState } from 'react';
import { Suspense } from 'react';
import Country from './country/Country';

const Countries = ({ countriesPromise }) => {
  const [visitedCountry, setVisitedCountry] = useState([]);
  const [visitedFlags, setVisitedFlags] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  //receive data with use
  const countriesData = use(countriesPromise);
  //data destructuring
  const countries = countriesData.countries;
  //visited button eventlistener
  const handleVisitedCountries = country => {
    setVisitedCountry(prev => {
      if (prev.some(c => c.cca3 === country.cca3)) {
        return prev.filter(c => c.cca3 !== country.cca3);
      }
      return [...prev, country];
    });
  };
  //visited flag eventlistener
//   const handleVisitedFlag = flag => {
//     setVisitedFlags(prev => {
//       if (prev.includes(flag)) {
//          আগে থাকলে বাদ দিন
//         return prev.filter(f => f !== flag);
//       }
//       না থাকলে যোগ করুন
//       return [...prev, flag];
//     });
//   };
const handleVisitedFlag = flag => {
  setVisitedFlags(prev =>
    prev.includes(flag) ? prev.filter(f => f !== flag) : [...prev, flag]
  );
};

  const filteredCountries = countries.filter(country => {
    const term = searchCountry.toLowerCase();

    const commonName = country.name?.common?.toLowerCase() || '';
    const officialName = country.name?.official?.toLowerCase() || '';
    const capitalName = country.capital?.[0]?.toLowerCase() || '';

    return (
      commonName.includes(term) ||
      officialName.includes(term) ||
      capitalName.includes(term)
    );
  });

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-900 to-gray-800 p-8 py-12'>
      <div className='mx-auto max-w-6xl'>
        <div className='sticky top-0 right-0 z-40 rounded-lg bg-gray-900/80 p-4 shadow-lg backdrop-blur-md'>
          <h1 className='mb-6 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-5xl font-extrabold text-transparent'>
            Country List : {countries.length}
          </h1>
          <h3 className='mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-2xl font-semibold text-transparent'>
            Total Country Visited : {visitedCountry.length}
          </h3>
          {/* Visited Country */}
          {visitedCountry.length > 0 && (
            <div className='mx-auto max-w-md'>
              <h4 className='mb-3 text-center text-lg font-bold text-green-400'>
                Visited Countries
              </h4>
              <ol className='flex flex-wrap justify-center gap-3'>
                {visitedCountry.map(country => (
                  <li
                    key={country.cca3}
                    className='rounded-full bg-linear-to-r from-blue-500 to-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105'
                  >
                    {country.name?.common}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {/* Visited Flags */}
          {visitedFlags.length > 0 && (
            <div className='mx-auto mt-6 max-w-md'>
              <h4 className='mb-3 text-center text-lg font-bold text-blue-400'>
                Visited Flags : {visitedFlags.length}
              </h4>
              <div className='flex flex-wrap justify-center gap-4'>
                {visitedFlags.map((flag, idx) => (
                  <img
                    key={idx}
                    src={flag}
                    alt='Visited flag'
                    className='h-12 w-20 rounded object-cover shadow-md transition-transform hover:scale-105'
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search */}
        <label className='input mx-auto mb-10 flex w-full max-w-md justify-center'>
          <svg
            className='h-[1em] opacity-50'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <g
              strokeLinejoin='round'
              strokeLinecap='round'
              strokeWidth='2.5'
              fill='none'
              stroke='currentColor'
            >
              <circle cx='11' cy='11' r='8'></circle>
              <path d='m21 21-4.3-4.3'></path>
            </g>
          </svg>
          <input
            type='search'
            required
            placeholder='Search'
            value={searchCountry}
            onChange={e => setSearchCountry(e.target.value.toLowerCase())}
          />
        </label>
        {/* Suspense */}
        <Suspense
          fallback={
            <div className='flex items-center justify-center py-20'>
              <div className='text-center'>
                <div className='mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
                <p className='text-xl text-gray-600'>Load Country List...</p>
              </div>
            </div>
          }
        >
          <div className='grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {filteredCountries.map(country => (
              <Country
                key={country.cca3}
                country={country}
                handleVisitedCountries={handleVisitedCountries}
                handleVisitedFlag={handleVisitedFlag}
                className='overflow-hidden rounded-lg border border-gray-200 shadow-md'
              />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Countries;
