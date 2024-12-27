import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../types';

interface FormCardProps {
  form: Form;
}

export default function FormCard({ form }: FormCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card cursor-pointer"
      onClick={() => navigate(`/forms/${form._id}`)}
    >
      <h3 className="text-lg font-semibold mb-2">{form.title}</h3>
      <p className="text-sm text-gray-600 mb-4">
        {form.fields.length} fields
      </p>
      <div className="text-xs text-gray-500">
        Created: {new Date(form.createdAt).toLocaleDateString()}
      </div>
    </motion.div>
  );
}