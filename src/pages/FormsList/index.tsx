import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import FormCard from './FormCard';
import { useFormsList } from './useFormsList';
import Pagination from './Pagination';

export default function FormsList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { forms, loading, error } = useFormsList(page);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Forms</h1>
          <button
            onClick={() => navigate('/forms/create')}
            className="btn-primary"
          >
            Create New Form
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <FormCard key={form._id} form={form} />
          ))}
        </div>

        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={Math.ceil(forms.length / 9)}
        />
      </div>
    </Layout>
  );
}