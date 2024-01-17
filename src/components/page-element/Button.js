import classNames from 'classnames';

function Button({
  className, children, disabled, primary, success, danger, ...rest
}) {
  const definedStyling = classNames(
    className,
    'px-3',
    'py-1',
    'my-1',
    'text-white',
    'text-sm',
    'border-solid',
    'rounded-md',
    'my-0.5',
    {
      'bg-blue-500 hover:bg-blue-600': primary,
      'bg-green-500 hover:bg-green-600': success && !disabled,
      'bg-red-500 hover:bg-red-600': danger,
      'bg-gray-300': disabled,
    },
  );

  return (
    <button
      className={definedStyling}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
