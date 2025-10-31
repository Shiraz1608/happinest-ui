import { useTheme } from '@/app/providers/ThemeProvider';
import { useId } from 'react';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  isRequired?: boolean;
}

export function Switch({ id, checked, onCheckedChange, isRequired = false }: SwitchProps) {
  const { theme } = useTheme();
  const internalId = useId();
  const switchId = id || internalId;

  const bgColor = isRequired
    ? 'bg-gray-300 cursor-not-allowed'
    : checked
      ? theme === 'light'
        ? 'bg-black'
        : 'bg-white'
      : theme === 'light'
        ? 'bg-gray-200'
        : 'bg-neutral-900';

  const knobColor = isRequired
    ? 'bg-gray-400'
    : checked
      ? theme === 'light'
        ? 'bg-white'
        : 'bg-black'
      : theme === 'light'
        ? 'bg-card-foreground'
        : 'bg-white';

  const translate = checked ? 'translate-x-[calc(100%-2px)]' : 'translate-x-0';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      id={switchId}
      disabled={isRequired}
      className={`inline-flex h-[1.15rem] w-8 items-center rounded-full border border-transparent transition-all mt-0.5 
        outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:opacity-70 ${bgColor}`}
      onClick={() => !isRequired && onCheckedChange(!checked)}
    >
      <span
        className={`block size-4 rounded-full ring-0 shadow-sm transition-transform ${translate} ${knobColor}`}
      />
    </button>
  );
}