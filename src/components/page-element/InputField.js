import classNames from 'classnames';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function InputField({
  className, nameInput, letterInput, value, label, name, placeholder, type, maxLength, required, ...rest
}) {
  const errorMessage = useSelector((state) => state.game.errorMessage);

  const inputStyling = classNames('block mb-2 shadow appearance-none border-2 rounded text-gray-700 leading-tight focus:outline-none', {
    'w-10 h-10 text-lg': letterInput,
    'w-48': nameInput,
    'border-red-600': letterInput && errorMessage,
  });

  return (
    <div className="flex justify-center flex-col items-center">
      {label && <label htmlFor="input-field">{label}</label>}
      <input
        className={inputStyling}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        required
        {...rest}
      />
      {letterInput ? <span className="block mt-2 text-sm text-red-500 text-xs min-h-[20px]">{errorMessage}</span> : ''}
    </div>
  );
}

export default InputField;
