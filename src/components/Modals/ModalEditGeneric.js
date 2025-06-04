'use client';

export default function ModalEditGeneric({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  title = 'Editar',
  labels = {},
  fields = [],
  checkboxLast = false
}) {
  if (!isOpen) return null;

  const effectiveFields = fields.length > 0
    ? fields
    : Object.keys(formData || {}).map(name => ({
        name,
        type: typeof formData[name] === 'boolean' ? 'checkbox' : 'text'
      }));

  const inputKeys = effectiveFields
    .filter(field => field.type !== 'checkbox' && field.name !== 'id')
    .map(field => field.name);

  const checkboxKeys = effectiveFields
    .filter(field => field.type === 'checkbox')
    .map(field => field.name);

  const renderInput = (key, value) => (
    <div key={key} className="group relative">
      <label className="block text-sm font-semibold text-slate-700 mb-1.5 
                        tracking-wide uppercase text-xs">
        {labels[key] || key}
      </label>
      <div className="relative">
        <input
          name={key}
          value={value ?? ''}
          onChange={onChange}
          className="w-full px-3 py-2 bg-white/80 backdrop-blur-sm
                     border border-slate-200/60 rounded-lg
                     focus:bg-white focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/10
                     transition-all duration-300 ease-out
                     text-slate-800 placeholder:text-slate-400
                     shadow-sm hover:shadow-md focus:shadow-lg
                     group-hover:border-slate-300/60 text-sm max-w-[200px]"
          placeholder={`Digite ${labels[key] || key}...`}
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-400/5 to-blue-400/5 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );

  const renderCheckbox = (key, value) => (
    <div key={key} className="group relative">
      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gradient-to-r 
                      hover:from-violet-50/50 hover:to-blue-50/50 transition-all duration-300">
        <div className="relative">
          <input
            type="checkbox"
            name={key}
            checked={value}
            onChange={onChange}
            className="h-4 w-4 text-violet-600 bg-white border-2 border-slate-300 rounded-md
                       focus:ring-2 focus:ring-violet-400/20 transition-all duration-200
                       checked:border-violet-500 checked:bg-violet-500"
            id={`checkbox-${key}`}
          />
          {value && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <label
          htmlFor={`checkbox-${key}`}
          className="text-sm font-medium text-slate-700 cursor-pointer select-none
                     group-hover:text-slate-800 transition-colors"
        >
          {labels[key] || key}
        </label>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-violet-900/20 to-blue-900/40 
                   backdrop-blur-md transition-all duration-500"
        onClick={onClose}
      />

      <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl 
                      w-full max-w-md mx-auto
                      border border-white/40 shadow-violet-500/10
                      transform transition-all duration-500 ease-out scale-100">

        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/30 via-transparent to-blue-50/30 pointer-events-none" />

        <div className="relative px-5 py-3 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-600 rounded-lg 
                                flex items-center justify-center shadow-md shadow-violet-500/25
                                hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-violet-400 to-blue-500 rounded-lg opacity-20 blur-sm" />
              </div>

              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 
                               bg-clip-text text-transparent">
                  {title}
                </h2>
                <p className="text-xs text-slate-500">Preencha os campos</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="group p-1.5 hover:bg-slate-100/60 rounded-lg transition-all duration-300
                         hover:rotate-90 transform"
            >
              <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative px-5 py-4">
          <form onSubmit={onSubmit} className="space-y-4">
            {inputKeys.length > 0 && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {inputKeys.map(key => renderInput(key, formData[key]))}
              </div>
            )}

            {checkboxKeys.length > 0 && (
              <div className="pt-2">
                <h3 className="text-sm font-semibold text-slate-700 mb-2 
                               tracking-wide uppercase text-xs">
                  Configurações
                </h3>
                <div className="grid grid-cols-2 gap-1">
                  {checkboxKeys.map(key => renderCheckbox(key, formData[key]))}
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="relative px-5 py-3 bg-gradient-to-r from-slate-50/80 to-slate-100/40 
                        border-t border-slate-200/50 backdrop-blur-sm">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 font-semibold rounded-lg
                         hover:bg-white/60 border border-slate-200/60
                         transition-all duration-300 ease-out
                         hover:shadow-md hover:scale-105 active:scale-95 text-sm"
            >
              Cancelar
            </button>

            <button
              type="submit"
              onClick={onSubmit}
              className="relative px-5 py-2 bg-gradient-to-r from-violet-600 to-blue-600 
                         text-white font-semibold rounded-lg shadow-md shadow-violet-500/25
                         hover:from-violet-700 hover:to-blue-700 hover:shadow-lg hover:shadow-violet-500/30
                         transition-all duration-300 ease-out
                         hover:scale-105 active:scale-95
                         border border-violet-500/20 text-sm"
            >
              <span className="relative z-10">Salvar</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent 
                              rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-1 
                        bg-gradient-to-r from-transparent via-violet-400/50 to-transparent blur-sm" />
      </div>
    </div>
  );
}
