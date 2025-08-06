"use client";

import { ClipboardList, User, CalendarDays, Wrench, Clock } from "lucide-react";

export default function ServiceOrderFormFields({ formData, onChange, customers }) {
  return (
    <>
      <div className="mb-4">
        <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-2">
          Cliente *
        </label>
        <select
          name="customerId"
          value={formData.customerId}
          onChange={onChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 bg-white"
        >
          <option value="">Selecione o cliente</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {`${c.firstName} ${c.lastName}`}
            </option>
          ))}
        </select>
      </div>

      <InputField
        label="Tipo de Serviço"
        name="serviceType"
        icon={<Wrench />}
        value={formData.serviceType}
        onChange={onChange}
        required
      />


      <InputField
        label="Data de Abertura"
        name="openedDate"
        icon={<Clock />}
        type="date"
        value={formData.openedDate}
        onChange={onChange}
      />
      
      <InputField
        label="Data Agendada"
        name="scheduledDate"
        icon={<CalendarDays />}
        type="date"
        value={formData.scheduledDate}
        onChange={onChange}
      />
      <InputField
        label="Valor Total"
        name="totalAmount"
        icon={<ClipboardList />}
        type="number"
        value={formData.totalAmount}
        onChange={onChange}
      />
      {/* vehicleId can be a hidden input or a select if needed */}
      <input type="hidden" name="vehicleId" value={formData.vehicleId} onChange={onChange} />
      <input type="hidden" name="closedAt" value={formData.closedAt} onChange={onChange} />
    </>
  );
}

const InputField = ({ label, name, icon, value, onChange, type = "text", required = false }) => {
  return (
    <div className="mb-4">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        {icon} {label} {required && "*"}
      </label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};