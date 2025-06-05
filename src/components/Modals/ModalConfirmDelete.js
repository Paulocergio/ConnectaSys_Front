"use client";

import { Dialog } from "@headlessui/react";
import { Trash2 } from "lucide-react";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, itemName = "este item" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Fundo transparente com blur */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/40 animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
        relative bg-white rounded-xl sm:rounded-2xl shadow-2xl 
        w-full max-w-xs sm:max-w-md mx-2 sm:mx-0
        animate-in zoom-in-95 slide-in-from-bottom-4 duration-300
        border border-gray-200/50
        max-h-[90vh] overflow-y-auto
      "
      >
        {/* Cabeçalho com ícone */}
        <div className="flex items-center gap-2 sm:gap-3 p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full text-red-600 flex-shrink-0">
            <Trash2 size={16} className="sm:w-5 sm:h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
            Confirmar Exclusão
          </h2>
        </div>

        {/* Conteúdo */}
        <div className="p-4 sm:p-6 text-sm sm:text-base text-gray-600 leading-relaxed">
          Tem certeza que deseja excluir <strong className="text-gray-800">{itemName}</strong>?
          <br className="hidden sm:block" />
          <span className="block sm:inline mt-1 sm:mt-0">Esta ação não poderá ser desfeita.</span>
        </div>

        {/* Botões */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="
              w-full sm:w-auto px-4 sm:px-6 py-2.5 text-sm font-medium text-gray-700 bg-white 
              border border-gray-300 rounded-lg sm:rounded-xl
              hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200
              transition-all duration-200 shadow-sm hover:shadow-md
              active:scale-98 sm:active:scale-95
            "
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="
              w-full sm:w-auto px-4 sm:px-6 py-2.5 text-sm font-medium text-white 
              bg-red-600 hover:bg-red-700 rounded-lg sm:rounded-xl
              focus:outline-none focus:ring-2 focus:ring-red-500/50
              transition-all duration-200 shadow-lg hover:shadow-xl
              transform active:scale-98 sm:hover:scale-105 sm:active:scale-95
            "
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
