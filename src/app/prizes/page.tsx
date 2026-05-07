'use client';

import { getConfig } from '@/utils/requests';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  probability: number;
}

interface CategoryWithProducts {
  categoryId: {
    _id: string;
    name: string;
    imageURL: string;
  };
  products: Product[];
}

const optimizeCloudinaryUrl = (url: string, width = 300): string => {
  if (!url || !url.includes('cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/w_${width}/`);
};

const PrizeCatalog = () => {
  const { data: config, isLoading } = useQuery<any>({
    queryKey: ['config'],
    queryFn: getConfig,
  });

  const categories: CategoryWithProducts[] = config?.categoriesSelected || [];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#1a0a1e] via-[#2d1233] to-[#0f0a1a]">
      {/* Header */}
      <div className="w-full py-6 px-4 flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/home" className="text-gray-400 hover:text-white transition-colors" aria-label="Volver al inicio">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl md:text-3xl font-moul bg-custom-gradient bg-clip-text text-transparent">
          Premios
        </h1>
        <div className="w-6" />
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white/5 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🎁</div>
            <h2 className="text-xl text-white font-bold mb-2">Aun no hay premios configurados</h2>
            <p className="text-gray-400">Vuelve pronto para ver los premios disponibles</p>
          </div>
        ) : (
          categories.map((category, catIndex) => (
            <div key={category.categoryId?._id || catIndex} className="mb-12">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3"
              >
                {category.categoryId?.imageURL && (
                  <div className="w-8 h-8 relative rounded-full overflow-hidden">
                    <Image
                      src={optimizeCloudinaryUrl(category.categoryId.imageURL, 50)}
                      alt={category.categoryId.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {category.categoryId?.name}
              </motion.h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#DF3132]/40 transition-all hover:scale-[1.02] group"
                  >
                    <div className="w-full h-48 relative overflow-hidden">
                      <Image
                        src={optimizeCloudinaryUrl(product.imageURL)}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-bold text-lg mb-1">{product.name}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/" aria-label="Jugar ahora">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-b from-[#C8191B] to-[#602E44] text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg shadow-red-500/30 cursor-pointer"
            >
              Jugar Ahora
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrizeCatalog;
