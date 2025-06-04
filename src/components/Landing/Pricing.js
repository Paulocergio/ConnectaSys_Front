"use client";

import { Check, Star, X, HelpCircle } from "lucide-react";
import React, { useState } from "react";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const plans = [
    {
      name: "Free",
      description: "Ideal para oficinas iniciantes",
      price: { monthly: 0, yearly: 0 },
      originalPrice: { monthly: 0, yearly: 0 },
      features: [
        "Cadastro de clientes básico",
        "Ordens de serviço simples",
        "1 usuário",
        "Suporte por email",
      ],
      notIncluded: [
        "Estoque e agendamentos",
        "Relatórios avançados",
        "Múltiplos usuários",
        "API para integração",
      ],
      buttonText: "Começar Grátis",
      buttonColor: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      popular: false,
      tag: null,
    },
    {
      name: "Pro",
      description: "Para quem quer controle total",
      price: { monthly: 49.5, yearly: 39.5 },
      originalPrice: { monthly: 99, yearly: 79 },
      features: [
        "Tudo do plano Free",
        "Estoque e agendamentos",
        "Relatórios avançados",
        "1 usuário",
        "Controle financeiro",
        "Backup automático",
        "Suporte prioritário",
      ],
      notIncluded: ["Múltiplos usuários", "API para integração"],
      buttonText: "Comprar Agora",
      buttonColor: "from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700",
      popular: true,
      tag: "Popular",
    },
    {
      name: "Team",
      description: "Solução completa para equipes",
      price: { monthly: 124.5, yearly: 99.5 },
      originalPrice: { monthly: 249, yearly: 199 },
      features: [
        "Tudo do plano Pro",
        "Até 10 usuários",
        "API para integração",
        "Suporte prioritário",
        "Treinamento personalizado",
        "Personalização de relatórios",
        "Integração com sistemas fiscais",
      ],
      notIncluded: [],
      buttonText: "Comprar Agora",
      buttonColor: "from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700",
      popular: false,
      tag: "Completo",
    },
  ];

  const formatCurrency = (value) => {
    return value === 0 ? "R$0" : `R$${value.toFixed(2).replace(".", ",")}`;
  };

  return (
    <section id="planos" className="py-24 px-6 bg-[#101218] text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#101218] z-0"></div>

      {/* Decorative Elements */}
      <div className="absolute top-40 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -left-32 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-indigo-500/10 px-4 py-1.5 rounded-full text-indigo-400 font-medium text-sm mb-4 border border-indigo-500/20">
            <Star size={14} className="mr-2 fill-indigo-400" />
            Preços transparentes, sem surpresas
          </div>

          <h3 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
            Planos para todos os tamanhos de oficina
          </h3>

          <p className="text-gray-400 max-w-xl mx-auto">
            Escolha o plano ideal para o seu negócio. Comece gratuitamente e faça upgrade à medida
            que sua oficina cresce.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center p-1 bg-[#0A101F] rounded-xl border border-gray-800">
            <button
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Mensal
            </button>
            <button
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
                billingPeriod === "yearly"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setBillingPeriod("yearly")}
            >
              Anual
              <span className="ml-2 bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col lg:flex-row justify-center gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`w-full max-w-sm bg-gradient-to-b from-[#070D1A] to-[#050A14] rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 relative group ${
                plan.popular
                  ? "border border-indigo-500 shadow-lg shadow-indigo-500/10 lg:-mt-4 lg:mb-4"
                  : "border border-gray-800 hover:border-gray-700"
              }`}
            >
              {/* Popular Tag */}
              {plan.tag && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-max">
                  <div
                    className={`
                    bg-gradient-to-r 
                    ${plan.popular ? "from-indigo-500 to-purple-600" : "from-purple-500 to-pink-600"} 
                    text-white py-1 px-6 rounded-full inline-block font-medium text-sm shadow-lg
                  `}
                  >
                    {plan.tag}
                  </div>
                </div>
              )}

              {/* Card Header */}
              <div className="p-8 text-center border-b border-gray-800">
                <h4 className="text-2xl font-bold mb-2 text-white">{plan.name}</h4>
                <p className="text-gray-400 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-2">
                  <span className="text-5xl font-bold text-white">
                    {formatCurrency(plan.price[billingPeriod])}
                  </span>
                  {plan.price[billingPeriod] > 0 && (
                    <span className="text-gray-400 text-sm ml-2">
                      /mês
                      {billingPeriod === "yearly" && " (cobrado anualmente)"}
                    </span>
                  )}
                </div>

                {/* Original Price */}
                {plan.originalPrice[billingPeriod] > plan.price[billingPeriod] && (
                  <div className="text-gray-500 line-through mb-2">
                    De {formatCurrency(plan.originalPrice[billingPeriod])}/mês
                  </div>
                )}

                {/* Button */}
                <a
                  href="/cadastro"
                  className={`
                    mt-6 inline-block w-full py-3 px-6 rounded-xl font-medium 
                    bg-gradient-to-r ${plan.buttonColor} 
                    text-white transition-all shadow-lg shadow-indigo-500/10
                    transform group-hover:translate-y-0 translate-y-0 hover:-translate-y-1
                  `}
                >
                  {plan.buttonText}
                </a>
              </div>

              {/* Features */}
              <div className="p-8">
                <h5 className="font-semibold text-white mb-4 flex items-center">
                  <Check size={18} className="text-green-500 mr-2" />O que está incluído:
                </h5>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Not Included */}
                {plan.notIncluded.length > 0 && (
                  <>
                    <h5 className="font-semibold text-white mb-4 flex items-center">
                      <X size={18} className="text-gray-500 mr-2" />
                      Não incluído:
                    </h5>
                    <ul className="space-y-3">
                      {plan.notIncluded.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <X size={18} className="text-gray-500 mr-2 mt-0.5 shrink-0" />
                          <span className="text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Option */}
        <div className="mt-16 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 p-8 rounded-2xl backdrop-blur-sm border border-indigo-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">
                Precisa de mais? Temos um plano Enterprise
              </h4>
              <p className="text-gray-400">
                Customize o ConnectaSys para as necessidades específicas da sua rede de oficinas com
                recursos avançados e suporte dedicado.
              </p>
            </div>
            <a
              href="/contato"
              className="shrink-0 inline-flex items-center justify-center bg-white text-[#050A14] font-medium py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Fale com nossa equipe
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 text-center">
          <h4 className="text-2xl font-bold text-white mb-2">Perguntas frequentes</h4>
          <p className="text-gray-400 mb-10">Tire suas dúvidas sobre nossos planos e preços</p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              {
                q: "Posso mudar de plano depois?",
                a: "Sim, você pode fazer upgrade ou downgrade a qualquer momento. Ao fazer upgrade, você terá acesso imediato aos novos recursos.",
              },
              {
                q: "Existe alguma taxa de configuração?",
                a: "Não, não cobramos nenhuma taxa de configuração. Você paga apenas pelo plano escolhido.",
              },
              {
                q: "Como funciona o período de teste?",
                a: "Oferecemos 14 dias de teste gratuito em todos os planos pagos, sem necessidade de cartão de crédito.",
              },
              {
                q: "Posso cancelar a qualquer momento?",
                a: "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#070D1A] p-6 rounded-xl border border-gray-800">
                <h5 className="flex items-center text-lg font-semibold text-white mb-2">
                  <HelpCircle size={18} className="text-indigo-400 mr-2" />
                  {item.q}
                </h5>
                <p className="text-gray-400 pl-7">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center p-2 pr-6 bg-green-500/10 rounded-full text-green-400 font-medium mb-4">
            <div className="bg-green-500 rounded-full p-1 mr-2">
              <Check size={16} className="text-[#050A14]" />
            </div>
            Garantia de 30 dias de devolução do dinheiro
          </div>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Se você não estiver satisfeito com o ConnectaSys por qualquer motivo, basta nos avisar
            dentro de 30 dias e reembolsaremos 100% do seu pagamento.
          </p>
        </div>
      </div>
    </section>
  );
}
