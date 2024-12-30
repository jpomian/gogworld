'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NumberSearchBar() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) <= 10000)) {
      setInputValue(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue !== '') {
      router.push(`/avatars/${inputValue}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center space-x-2">
      <input
        type="text"
        id="numberSearch"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search by #"
        className="bg-background text-foreground border border-foreground/20 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-colors"
      />
      <button
        type="submit"
        className="bg-foreground text-background px-3 py-1 rounded-md hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-colors"
      >
        Check
      </button>
    </form>
  );
}

