import React, { useState } from 'react';

const Country = ({
  country,
  className,
  handleVisitedCountries,
  handleVisitedFlag,
}) => {
  const [visited, setVisited] = useState(false);
  const [flagAdded, setFlagAdded] = useState(false); // নতুন state
  //toggle flag
  const toggleFlag = () => {
    if (flagAdded) {
      // আগে যোগ করা থাকলে বাদ দিন
      handleVisitedFlag(country.flags?.flags?.png);
    } else {
      // না থাকলে যোগ করুন
      handleVisitedFlag(country.flags?.flags?.png);
    }
    setFlagAdded(!flagAdded); // toggle state
  };


  return (
    <div
      className={`${className} ${visited && 'border-2 border-red-600'} flex h-full flex-col`}
    >
      <div className='relative h-48 shrink-0'>
        <img
          src={country.flags?.flags?.png || '/placeholder-flag.png'}
          alt={country?.flags?.flags?.alt}
          className='h-full w-full object-cover p-4 transition-transform duration-300 group-hover:scale-105'
          loading='lazy'
        />
      </div>

      {/* Content area that grows */}
      <div className='grow px-4'>
        <h2 className='mt-3 text-xl font-bold'>{country.name?.common}</h2>
        {country.name?.official && (
          <p className='wrap-break-words'>
            <span className='font-semibold'>
              Official Name : {country.name?.official}
            </span>
          </p>
        )}
        <p>
          <span>Region : {country.region?.region}</span>
        </p>
        <p>
          <span className='font-semibold'>Capital:</span>{' '}
          {country?.capital?.capital[0]}
        </p>
        <p>
          <span className='font-semibold wrap-break-word'>Currency:</span>{' '}
          {Object.values(country.currencies.currencies || {})
            .map(c => `${c.name} (${c.symbol})`)
            .join(', ') || 'N/A'}
        </p>
        <p>
          <span className='font-semibold'>Area:</span>{' '}
          {country.area?.area?.toLocaleString()} km²
        </p>
        <p>
          <span className='font-semibold'>Population:</span>{' '}
          {country.population?.population?.toLocaleString()}
        </p>
      </div>

      {/* Button at the bottom with margin-top auto */}
      <div className='mt-auto p-4'>
        <button
          onClick={() => {
            setVisited(!visited); // toggle local state
            handleVisitedCountries(country); // pass the actual country object
          }}
          className={`btn btn-sm ${visited ? 'btn-success' : 'btn-warning'} mb-4 w-full shadow-lg transition-all hover:shadow-xl`}
        >
          {visited ? 'Visited' : 'Not Visited'}
        </button>

        <button
          onClick={toggleFlag}
          className={`btn btn-sm ${flagAdded ? 'btn-success' : 'btn-error'} w-full shadow-lg transition-all hover:shadow-xl`}
        >
          {flagAdded ? 'Flag Added' : 'Add Flag'}
        </button>
      </div>
    </div>
  );
};

export default Country;
