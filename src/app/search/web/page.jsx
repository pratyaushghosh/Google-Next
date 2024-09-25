import WebSearchResults from '@/components/WebSearchResults';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function WebSearchPage({ searchParams }) {
  const startIndex = searchParams.start || '1';

  // Simulating a delay for demonstration
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Fetch the search results from the API
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchParams.searchTerm}&start=${startIndex}`
  );
  if (!response.ok) throw new Error('Something went wrong');
  const data = await response.json();
  const results = data.items;

  // Handling no results
  if (!results) {
    return (
      <div className='flex flex-col justify-center items-center pt-10'>
        <h1 className='text-3xl mb-4'>
          No results found for {searchParams.searchTerm}
        </h1>
        <p className='text-lg'>
          Try searching the web or images for something else{' '}
          <Link href='/' className='text-blue-500'>
            Home
          </Link>
        </p>
      </div>
    );
  }

  // Suspense boundary wrapping the results component
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>{results && <WebSearchResults results={data} />}</div>
    </Suspense>
  );
}
