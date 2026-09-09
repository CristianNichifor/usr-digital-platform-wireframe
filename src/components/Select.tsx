import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className="select-field">
      <select {...props} />
      <ChevronDown className="select-chevron" size={18} aria-hidden="true" />
    </span>
  );
}
