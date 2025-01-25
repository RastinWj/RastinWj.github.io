import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Monitor, Cpu, Wrench } from 'lucide-react';
import { builds } from '../data/builds';
import { AddToCartButton } from '../components/AddToCartButton';

interface BuildDetailProps {
  isPersian?: boolean;
  user?: any;
}

export const BuildDetail: React.FC<BuildDetailProps> = ({ isPersian = false, user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const build = builds.find(b => b.id === id);

  if (!build) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            {isPersian ? 'ساخت پیدا نشد' : 'Build Not Found'}
          </h1>
          <button
            onClick={() => navigate('/builds')}
            className="glow-button"
          >
            {isPersian ? 'بازگشت' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="glow-button"
        >
          {isPersian ? 'بازگشت' : 'Back'}
        </button>
      </div>

      <div className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={build.image}
                alt={isPersian ? build.name.fa : build.name.en}
                className="w-full rounded-lg shadow-lg border border-gray-800"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {isPersian ? build.name.fa : build.name.en}
                </h1>
                <p className="text-2xl text-blue-400">${build.price.toLocaleString()}</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-blue-400" /> 
                  {isPersian ? 'مشخصات' : 'Specifications'}
                </h2>
                <p className="text-gray-300 text-lg">
                  {isPersian ? build.specs.fa : build.specs.en}
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-400" /> 
                  {isPersian ? 'توضیحات' : 'Description'}
                </h2>
                <p className="text-gray-300">
                  {isPersian ? build.description.fa : build.description.en}
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-blue-400" /> 
                  {isPersian ? 'ویژگی‌ها' : 'Features'}
                </h2>
                <ul className="space-y-2">
                  {(isPersian ? build.features.fa : build.features.en).map((feature, index) => (
                    <li key={index} className="text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {user ? (
                <AddToCartButton
                  productId={build.id}
                  isPersian={isPersian}
                />
              ) : (
                <button
                  onClick={() => navigate('/?login=true')}
                  className="glow-button w-full"
                >
                  {isPersian ? 'ورود برای خرید' : 'Login to Purchase'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};