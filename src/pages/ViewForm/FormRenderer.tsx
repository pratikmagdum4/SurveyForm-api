import { useForm } from 'react-hook-form';
import { Form } from '../../types';
import FormField from './FormField';

interface FormRendererProps {
  form: Form;
}

export default function FormRenderer({ form }: FormRendererProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {form.fields.map((field, index) => (
        <FormField
          key={index}
          field={field}
          register={register}
          error={errors[field.name]}
        />
      ))}

      <button type="submit" className="btn-primary w-full">
        Submit
      </button>
    </form>
  );
}