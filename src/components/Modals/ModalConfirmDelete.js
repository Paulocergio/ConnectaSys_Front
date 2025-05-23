'use client';

import { Dialog } from '@headlessui/react';
import { Trash2 } from 'lucide-react';

export default function ModalConfirmDelete({ isOpen, onClose, onConfirm, itemName = 'este item' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fundo transparente com blur */}
      <div 
        className="absolute inset-0 backdrop-blur-md bg-black/40 animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="
        relative bg-white rounded-2xl shadow-2xl w-full max-w-md
        animate-in zoom-in-95 slide-in-from-bottom-4 duration-300
        border border-gray-200/50
      ">
        {/* Cabeçalho com ícone */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-100">
          <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full text-red-600">
            <Trash2 size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Confirmar Exclusão</h2>
        </div>

        {/* Conteúdo */}
        <div className="p-6 text-sm text-gray-600">
          Tem certeza que deseja excluir <strong>{itemName}</strong>? Esta ação não poderá ser desfeita.
        </div>

        {/* Botões */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="
              px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl
              hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200
              transition-all duration-200 shadow-sm hover:shadow-md
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
              px-6 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-red-500/50
              transition-all duration-200 shadow-lg hover:shadow-xl
              transform hover:scale-105 active:scale-95
            "
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
