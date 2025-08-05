"use client";

import { login } from "../../services/api/loginService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  showSuccess,
  showError,
  ToastContainerWrapper,
} from "../../components/Toast/ToastNotification";

export default function LoginForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await login(form.email, form.password);

      if (data?.token) {
        document.cookie = `token=${data.token}; path=/; max-age=86400`;

        localStorage.setItem(
          "user-data",
          JSON.stringify({
            email: data.email,
            token: data.token,
            firstName: data.firstName,
            lastName: data.lastName,
          })
        );

        showSuccess("Login realizado com sucesso!");
        router.push("/customer");
      } else {
        showError("Usuário ou senha inválidos.");
      }
    } catch (error) {
      showError("Erro ao tentar logar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <div className="hidden md:flex md:w-2/3 bg-gradient-to-b from-[#F4F5FA] to-[#ECEDF3] justify-center items-center relative overflow-hidden">
        <div className="flex flex-col items-center justify-center w-full max-w-xl p-4">
          <div className="absolute top-[20%] left-[30%] bg-white rounded-lg shadow-sm p-4 w-40">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-[#9747FF] flex items-center justify-center mr-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex justify-between items-center w-full">
                <span className="text-xs text-gray-600">New Project</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                    fill="#9E9E9E"
                  />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-semibold text-gray-800">862</div>
            <div className="flex items-center">
              <span className="text-red-500 text-xs mr-1">-18%</span>
              <span className="text-xs text-gray-500">Yearly Project</span>
            </div>
          </div>

          <div className="w-64 h-64 my-10">
            <Image
              src="/v2-login-light.png"
              alt="Plataforma"
              width={300}
              height={300}
              className="object-contain"
              priority
            />
          </div>

          <div className="absolute bottom-[30%] right-[25%] bg-white rounded-lg shadow-sm p-4 w-44">
            <div className="text-lg font-semibold text-gray-800 mb-1">$86.4k</div>
            <div className="h-16 mb-1">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 40L20 35L40 28L60 15L80 25L100 5" stroke="#4CAF50" strokeWidth="2" />
                <circle cx="100" cy="5" r="4" fill="#4CAF50" />
              </svg>
            </div>
            <div className="text-xs text-gray-600">Total Profit</div>
          </div>

          <div className="absolute top-[60%] left-[15%] bg-white rounded-lg shadow-sm p-3 w-48">
            <div className="flex items-center mb-2">
              <div className="w-5 h-5 bg-yellow-100 rounded-sm flex items-center justify-center mr-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.5 18.5L9.5 12.5L13.5 16.5L22 7.5" stroke="#FFC107" strokeWidth="2" />
                </svg>
              </div>
              <span className="text-xs text-gray-500">Total Profit</span>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-800 mr-2">2,856</span>
              <span className="text-green-500 text-xs">+18.2%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/3 flex items-center justify-center bg-white min-h-screen">
        <div className="w-full max-w-md px-4 sm:px-6 md:px-8 py-8 md:py-12">
          <div className="md:hidden flex justify-center mb-8 bg-gradient-to-b from-[#F4F5FA] to-[#ECEDF3] py-8 rounded-lg">
            <div className="w-40">
              <Image
                src="/v2-login-light.png"
                alt="Plataforma"
                width={200}
                height={200}
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex justify-center mb-6">
              <div className="bg-[#9747FF] p-3 rounded-full shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a6.715 6.715 0 00-3.722 1.118.75.75 0 11-.828-1.25 8.25 8.25 0 0112.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 01-1.395-.551A21.69 21.69 0 0018.75 10.5 6.75 6.75 0 0012 3.75z"
                    clipRule="evenodd"
                  />
                  <path d="M7.5 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 12zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zM7.5 18a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 017.5 18z" />
                </svg>
              </div>
            </div>

            <h2 className="text-gray-800 text-2xl sm:text-3xl font-bold mb-2">
              Bem-vindo de volta
            </h2>
            <p className="text-gray-500">Entre na sua conta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md border border-gray-300 focus:border-[#9747FF] focus:outline-none focus:ring-1 focus:ring-[#9747FF]/50 transition-all"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md border border-gray-300 focus:border-[#9747FF] focus:outline-none focus:ring-1 focus:ring-[#9747FF]/50 transition-all"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 bg-white text-[#9747FF] focus:ring-[#9747FF]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Lembrar de mim
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#9747FF] hover:text-purple-600 transition-colors"
                >
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 mt-6 bg-[#9747FF] text-white font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-[#9747FF] focus:ring-offset-2 focus:ring-offset-white transition-all ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Carregando...
                </span>
              ) : (
                "Entrar"
              )}
            </button>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">ou continue com</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                <button
                  type="button"
                  className="flex justify-center items-center py-2 px-2 sm:px-4 bg-white rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 12C6 15.3137 8.68629 18 12 18C14.6124 18 16.8349 16.3304 17.6586 14H12V10H21.8047V14H21.8C20.8734 18.5645 16.8379 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.445 2 18.4831 3.742 20.2815 6.39318L17.0039 8.68815C15.9296 7.06812 14.0895 6 12 6C8.68629 6 6 8.68629 6 12Z"
                      fill="#EA4335"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex justify-center items-center py-2 px-2 sm:px-4 bg-white rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M12.001 2.00195C6.47895 2.00195 2.00195 6.47895 2.00195 12.001C2.00195 16.991 5.65795 21.127 10.439 21.88V14.892H7.89895V12.001H10.439V9.79795C10.439 7.28995 11.932 5.90695 14.215 5.90695C15.309 5.90695 16.455 6.10195 16.455 6.10195V8.56095H15.191C13.951 8.56095 13.563 9.33295 13.563 10.124V11.999H16.334L15.891 14.89H13.563V21.878C18.344 21.129 22 16.992 22 12.001C22 6.47895 17.523 2.00195 12.001 2.00195Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex justify-center items-center py-2 px-2 sm:px-4 bg-white rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Não tem uma conta?{" "}
                <a
                  href="#"
                  className="font-medium text-[#9747FF] hover:text-purple-600 transition-colors"
                >
                  Cadastre-se
                </a>
              </p>
            </div>
          </form>
          <ToastContainerWrapper />
        </div>
      </div>
    </div>
  );
}
