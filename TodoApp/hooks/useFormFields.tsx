import { useState } from 'react';

export function useFormFields<T extends object>(initialValues: T) {
  const [fields, setFields] = useState(initialValues);

  const handleChange = (name: keyof T, value: any) => {
    setFields(prev => ({ ...prev, [name]: value }));
  };

  return {
    fields,
    handleChange,
    setFields,
  };
}
