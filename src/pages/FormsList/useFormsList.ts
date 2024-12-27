import { useState, useEffect } from 'react';
import { Form } from '../../types';
import { getForms } from '../../services/formService';

export function useFormsList(page: number) {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForms = async () => {
      try {
        setLoading(true);
        const response = await getForms(page);
        setForms(response);
        setError('');
      } catch (err) {
        setError('Failed to fetch forms');
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [page]);

  return { forms, loading, error };
}