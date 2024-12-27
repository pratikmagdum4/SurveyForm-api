import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import FormBuilder from './FormBuilder';
import { useCreateForm } from './useCreateForm';
import { FormField } from '../../types';

export default function CreateForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);
  const { createForm, loading, error } = useCreateForm();

  const handleSubmit = async () => {
    if (!title.trim()) return;
    
    const success = await createForm({ title, fields });
    if (success) {
      navigate('/forms');
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Form</h1>
        
        <div className="space-y-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Form Title"
            className="input-field text-xl font-semibold"
          />

          <FormBuilder fields={fields} onChange={setFields} />

          {error && (
            <div className="text-red-600">{error}</div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Creating...' : 'Create Form'}
          </button>
        </div>
      </div>
    </Layout>
  );
}