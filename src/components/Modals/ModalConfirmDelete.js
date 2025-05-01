'use client';
import React from 'react';

export default function ModalConfirmDelete({ isOpen, onClose, onConfirm, itemName }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Confirmar exclusão
                </h2>
                <p className="text-gray-600 mb-6">
                    Tem certeza que deseja excluir <span className="font-medium text-red-600">{itemName}</span>?
                    Esta ação não poderá ser desfeita.
                </p>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
