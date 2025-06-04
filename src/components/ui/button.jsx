
export const Button = ({ onClick, children }) => (
  <button onClick={onClick} className="px-4 py-2 border rounded">
    {children}
  </button>
);
