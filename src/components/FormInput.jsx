export default function FormInput({ label, type="text", value, onChange, name }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
      />
    </div>
  );
}
