export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center flex-col gap-6 p-4">
      <div className="text-center space-y-4 animate-fade-in">
        <div className="relative">
          <h1 className="text-9xl font-bold text-gray-800 opacity-10 absolute -top-10 -left-10 transform -rotate-12">404</h1>
          <h1 className="text-6xl font-bold text-indigo-700 relative z-10">Oops! Página não encontrada</h1>
        </div>
        
        <p className="text-xl text-gray-600 max-w-2xl">
Desapareceu... igual minhas promessas       </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a 
            href="/" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            Voltar para a Home
          </a>
          <a 
            href="/contato" 
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300"
          >
            Preciso de ajuda
          </a>
        </div>
      </div>
      
      <div className="mt-12 animate-bounce-slow">
        <img
          src="/ladrao.png" // Caminho relativo a /public
          alt="Imagem de erro 404"
          width={700} // Ajuste conforme o tamanho real
          height={700} // Ajuste conforme o tamanho real
          className="object-contain"
        />
      </div>
    </div>
  );
}



 {/* "use client";

import { Home, ArrowLeft, Search, Map } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-75 {
          animation-delay: 0.075s;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="flex justify-center items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl transform rotate-12">
                    <span className="text-6xl font-bold text-white">4</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
                </div>

                <div className="relative">
                  <div className="w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl transform -rotate-6">
                    <Search className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl transform rotate-12">
                    <span className="text-6xl font-bold text-white">4</span>
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                </div>
              </div>

              <div className="absolute top-0 left-1/4 w-4 h-4 bg-indigo-300 rounded-full animate-float"></div>
              <div className="absolute top-12 right-1/4 w-6 h-6 bg-purple-300 rounded-full animate-float delay-200"></div>
              <div className="absolute bottom-0 left-1/3 w-3 h-3 bg-pink-300 rounded-full animate-float delay-300"></div>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-pulse">
                404
              </h1>

              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Oops! Página não encontrada
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Parece que você se aventurou por um caminho que não existe. Não se preocupe, até
                  os melhores exploradores às vezes se perdem!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <a
                  href="/"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Voltar para Home
                </a>

                <button
                  onClick={() => window.history.back()}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-full shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-indigo-300 transform hover:scale-105 transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Página Anterior
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 */}