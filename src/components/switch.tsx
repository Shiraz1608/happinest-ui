import { useTheme } from '@/app/providers/ThemeProvider';
import { useId } from 'react';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
}

export function Switch({ id, checked, onCheckedChange }: SwitchProps) {
   const { theme } = useTheme();
  const internalId = useId();
  const switchId = id || internalId;
const switchStyle=
theme==="light"?
"data-[state=checked]:bg-black":
"data-[state=checked]:bg-white"
const spanStyle=
theme==="light"?
"bg-white":
"bg-black"
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      id={switchId}
      className={`peer  data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 mt-0.5 ${switchStyle}
      `}
      data-state={checked ? 'checked' : 'unchecked'}
      onClick={() => onCheckedChange(!checked)}
    >
      <span
        data-state={checked ? 'checked' : 'unchecked'}
        className={`dark:data-[state=unchecked]:bg-card-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 shadow-sm transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 ${spanStyle}`} 
      />
    </button>
  );
}