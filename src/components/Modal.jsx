// eslint-disable-next-line react/prop-types
export default function Modal({ children }) {
  return (
    <div
      id="modal"
      className="absolute bg-gray-600 bg-opacity-50 left-0 top-0 w-full h-full flex"
    >
      <div className="w-full h-full flex items-center justify-center z-50">{children}</div>
    </div>
  );
}
