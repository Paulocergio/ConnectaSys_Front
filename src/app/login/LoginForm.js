'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from './actions';

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: 'augusto.morais@memt.com.br', password: '123456' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(form.email, form.password);
      if (success) {
        router.push('/dashboard');
      } else {
        alert('Usuário ou senha inválidos.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Lado esquerdo - Imagem com gradiente simples */}
      <div className="hidden md:flex md:w-2/3 bg-gradient-to-b from-cyan-400 to-blue-900">
        <div className="flex flex-col justify-center items-start p-16 text-white">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo à nossa plataforma</h1>
          <p className="text-xl mb-8 max-w-xl">
            Acesse sua conta para gerenciar seus projetos e acompanhar seu progresso.
          </p>
          
          {/* Informações */}
          <div className="mt-8 space-y-6 max-w-lg">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Fácil Gerenciamento</h3>
                <p className="text-white/90">Controle todos os seus projetos em um único lugar de forma intuitiva.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Segurança Avançada</h3>
                <p className="text-white/90">Seus dados protegidos com criptografia de ponta a ponta.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Suporte 24/7</h3>
                <p className="text-white/90">Nossa equipe está sempre disponível para ajudar com suas dúvidas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário com visual limpo e elegante */}
      <div className="w-full md:w-1/3 flex items-center justify-center bg-black">
        <div className="w-full max-w-md px-12">
          <div className="text-center mb-10">
            <div className="inline-flex justify-center mb-6">
              <div className="bg-cyan-500 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                  <path fillRule="evenodd" d="M12 3.75a6.715 6.715 0 00-3.722 1.118.75.75 0 11-.828-1.25 8.25 8.25 0 0112.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 01-1.395-.551A21.69 21.69 0 0018.75 10.5 6.75 6.75 0 0012 3.75z" clipRule="evenodd" />
                  <path d="M7.5 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 12zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zM7.5 18a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 017.5 18z" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-white text-3xl font-bold mb-2">Bem-vindo de volta</h2>
            <p className="text-gray-400">Entre na sua conta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-md border border-gray-800 focus:border-cyan-500 focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-md border border-gray-800 focus:border-cyan-500 focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-gray-900 text-cyan-600 focus:ring-cyan-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Lembrar de mim
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-cyan-500 hover:text-cyan-400">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 mt-4 bg-cyan-500 text-white font-medium rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Carregando...
                </span>
              ) : 'Entrar'}
            </button>
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-black px-4 text-sm text-gray-500">ou continue com</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="flex justify-center items-center py-2 px-4 bg-gray-900 rounded-md border border-gray-800 hover:bg-gray-800"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M6 12C6 15.3137 8.68629 18 12 18C14.6124 18 16.8349 16.3304 17.6586 14H12V10H21.8047V14H21.8C20.8734 18.5645 16.8379 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.445 2 18.4831 3.742 20.2815 6.39318L17.0039 8.68815C15.9296 7.06812 14.0895 6 12 6C8.68629 6 6 8.68629 6 12Z" fill="#EA4335"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex justify-center items-center py-2 px-4 bg-gray-900 rounded-md border border-gray-800 hover:bg-gray-800"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M12.001 2.00195C6.47895 2.00195 2.00195 6.47895 2.00195 12.001C2.00195 16.991 5.65795 21.127 10.439 21.88V14.892H7.89895V12.001H10.439V9.79795C10.439 7.28995 11.932 5.90695 14.215 5.90695C15.309 5.90695 16.455 6.10195 16.455 6.10195V8.56095H15.191C13.951 8.56095 13.563 9.33295 13.563 10.124V11.999H16.334L15.891 14.89H13.563V21.878C18.344 21.129 22 16.992 22 12.001C22 6.47895 17.523 2.00195 12.001 2.00195Z"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex justify-center items-center py-2 px-4 bg-gray-900 rounded-md border border-gray-800 hover:bg-gray-800"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Não tem uma conta?{' '}
                <a href="#" className="font-medium text-cyan-500 hover:text-cyan-400">
                  Cadastre-se
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}