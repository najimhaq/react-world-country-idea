import { Suspense } from 'react';
import './App.css';
import Countries from './components/Countries';

const App = () => {
  const countriesPromise = fetch(
    'https://openapi.programming-hero.com/api/all'
  ).then(res => {
    if (!res.ok) {
      throw new Error('Failed to fetch countries data');
    }
    return res.json();
  });
  return (
    <div className='mx-auto min-h-screen bg-linear-to-b from-gray-900 to-gray-800'>
      <Suspense
        fallback={
          <div className='flex h-screen flex-col items-center justify-center space-y-6'>
            {/* Spinner */}
            <div className='h-20 w-20 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
            {/* Loading text */}
            <div className='text-center'>
              <p className='text-xl font-semibold text-gray-700'>
                Loading Countries...
              </p>
              <p className='text-gray-500'>Please wait a moment ✨</p>
            </div>
          </div>
        }
      >
        <Countries countriesPromise={countriesPromise} />
      </Suspense>
    </div>
  );
};

export default App;
