import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import FormRenderer from './FormRenderer';
import { useFormData } from './useFormData';

export default function ViewForm() {
  const { id } = useParams<{ id: string }>();
  const { form, loading, error } = useFormData(id!);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!form) return <div>Form not found</div>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{form.title}</h1>
        <FormRenderer form={form} />
      </div>
    </Layout>
  );
}