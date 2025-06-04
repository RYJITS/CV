
export const Select = ({ value, onChange, children }) => (
  <select value={value} onChange={onChange} className="p-2 border rounded">
    {children}
  </select>
);

export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);
