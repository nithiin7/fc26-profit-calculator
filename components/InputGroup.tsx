import React from 'react';

interface InputGroupProps {
  label: string;
  value: number | '';
  onChange: (val: number | '') => void;
  min?: number;
  placeholder?: string;
  helperText?: string;
  isInteger?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  value,
  onChange,
  min = 0,
  placeholder = '0',
  helperText,
  isInteger = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    if (rawVal === '') {
      onChange('');
      return;
    }

    let numVal = parseFloat(rawVal);

    // Prevent negative if min is 0
    if (numVal < min) numVal = min;

    if (isInteger) {
      numVal = Math.floor(numVal);
    }

    onChange(numVal);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-neutral-600 flex justify-between">
        {label}
        {helperText && (
          <span className="text-neutral-400 text-xs font-normal">
            {helperText}
          </span>
        )}
      </label>
      <div className="relative group">
        <input
          type="number"
          min={min}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2.5 text-neutral-900 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder:text-neutral-300"
        />
        {/* Subtle decorative corner accent for focused state implied by ring */}
      </div>
    </div>
  );
};

export default InputGroup;
