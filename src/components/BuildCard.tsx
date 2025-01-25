import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Build } from '../types/build';

interface BuildCardProps {
  build: Build;
  isPersian: boolean;
}

export const BuildCard: React.FC<BuildCardProps> = ({ build, isPersian }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative group">
        <img 
          src={build.image} 
          alt={isPersian ? build.name.fa : build.name.en} 
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white">
            {isPersian ? build.name.fa : build.name.en}
          </h3>
          <span className="text-xl font-semibold text-blue-400">
            ${build.price.toLocaleString()}
          </span>
        </div>
        <p className="text-gray-300 mb-6">
          {isPersian ? build.specs.fa : build.specs.en}
        </p>
        <button 
          className="learn-more-btn w-full"
          onClick={() => navigate(`/builds/${build.id}`)}
        >
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">
            {isPersian ? 'مشاهده جزئیات' : 'Learn More'}
          </span>
        </button>
      </div>
    </div>
  );
};