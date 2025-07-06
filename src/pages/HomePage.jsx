import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const HomePage = () => {
  const navigate = useNavigate();

  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-orange-100 to-yellow-50 p-8 text-center rounded-lg shadow-xl m-4">
      <h1 className="text-6xl font-extrabold text-orange-900 mb-6 drop-shadow-lg animate-fade-in">
        Welcome to ChocoZoo!
      </h1>
      <p className="text-xl text-orange-800 mb-10 max-w-2xl leading-relaxed animate-slide-up">
        Discover our delightful collection of artisanal chocolates shaped like your favorite animals.
        Perfect for gifts, parties, or a sweet treat for yourself!
      </p>
      <Button
        onClick={goToShop}
        className="bg-amber-700 hover:bg-amber-800 text-white text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 animate-bounce-in"
      >
        Explore Our Chocolate Animals
      </Button>

      {/* Basic CSS for animations - usually in index.css or global.css */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          80% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-slide-up { animation: slideUp 1s ease-out 0.5s forwards; opacity: 0; }
        .animate-bounce-in {animation: bounceIn 1s ease-out 1s forwards; animation-fill-mode: backwards;}
        `}
      </style>
    </div>
  );
};

export default HomePage;