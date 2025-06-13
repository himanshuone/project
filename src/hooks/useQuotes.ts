'use client';

import { useState, useEffect } from 'react';

interface Quote {
  text: string;
  author: string;
}

const fallbackQuotes: Quote[] = [
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "The more that you read, the more things you will know.", author: "Dr. Seuss" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
  { text: "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.", author: "Richard Feynman" },
];

export const useQuotes = () => {
  const [quote, setQuote] = useState<Quote>(fallbackQuotes[0]);
  const [loading, setLoading] = useState(false);

  const fetchRandomQuote = async () => {
    setLoading(true);
    try {
      // Try to fetch from Quotable API
      const response = await fetch('https://api.quotable.io/random?tags=motivational,inspirational,wisdom');
      
      if (response.ok) {
        const data = await response.json();
        setQuote({
          text: data.content,
          author: data.author,
        });
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.log('Using fallback quote due to API error:', error);
      // Use fallback quotes if API fails
      const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
      setQuote(fallbackQuotes[randomIndex]);
    } finally {
      setLoading(false);
    }
  };

  const getRandomFallbackQuote = () => {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    setQuote(fallbackQuotes[randomIndex]);
  };

  useEffect(() => {
    // Load initial quote
    fetchRandomQuote();
  }, []);

  return {
    quote,
    loading,
    fetchRandomQuote,
    getRandomFallbackQuote,
  };
};