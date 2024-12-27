import { FormField } from '../../types';
import FieldEditor from './FieldEditor';
import AddFieldButton from './AddFieldButton';

interface FormBuilderProps {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
}

export default function FormBuilder({ fields, onChange }: FormBuilderProps) {
  const addField = (type: string) => {
    const newField: FormField = {
      type,
      label: '',
      name: '',
      validation: {
        required: false,
      }
    };
    onChange([...fields, newField]);
  };

  const updateField = (index: number, field: FormField) => {
    const newFields = [...fields];
    newFields[index] = field;
    onChange(newFields);
  };

  const removeField = (index: number) => {
    onChange(fields.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <FieldEditor
          key={index}
          field={field}
          onChange={(field) => updateField(index, field)}
          onRemove={() => removeField(index)}
        />
      ))}
      
      <AddFieldButton onAdd={addField} />
    </div>
  );
}