import React from 'react';

interface InputGroupProps {
  label: string;
  value: number | '';
  onChange: (val: number | '') => void;
  min?: number;
  placeholder?: string;
  helperText?: string;
  isInteger?: boolean;
  isDarkMode?: boolean;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  value,
  onChange,
  min = 0,
  placeholder = '0',
  helperText,
  isInteger = false,
  isDarkMode = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    if (rawVal === '') {
      onChange('');
      return;
    }

    let numVal = parseFloat(rawVal);
    if (isNaN(numVal)) {
      onChange('');
      return;
    }

    if (numVal < min) numVal = min;
    if (isInteger) numVal = Math.floor(numVal);

    onChange(numVal);
  };

  const labelTextClass = isDarkMode ? 'text-slate-300' : 'text-slate-700';
  const helperTextClass = isDarkMode ? 'text-slate-500' : 'text-slate-500';
  const inputClass = isDarkMode
    ? 'w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-lg font-semibold text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20 placeholder:text-slate-600'
    : 'w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-semibold text-slate-950 outline-none transition focus:border-cyan-600/40 focus:ring-2 focus:ring-cyan-600/20 placeholder:text-slate-400';

  return (
    <div className="flex flex-col gap-1.5">
      <label className={`flex items-center justify-between text-sm font-semibold ${labelTextClass}`}>
        <span>{label}</span>
        {helperText && <span className={`text-xs font-normal ${helperTextClass}`}>{helperText}</span>}
      </label>
      <div>
        <input
          type="number"
          min={min}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={inputClass}
        />
      </div>
    </div>
  );
};

export default InputGroup;
