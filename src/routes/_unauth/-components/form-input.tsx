import { ReactNode } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shadcn-ui/form';
import { Label } from '@/components/shadcn-ui/label';
import { Input } from '@/components/shadcn-ui/input';
import { LucideIcon } from 'lucide-react';

interface FormInputFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  icon: LucideIcon;
  type?: string;
  rightElement?: ReactNode;
}

export const FormInputField = ({
  control,
  name,
  label,
  placeholder,
  icon: Icon,
  type = 'text',
  rightElement,
}: FormInputFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Label>{label}</Label>
          <div className="relative">
            <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                className="pl-10 !text-lg py-5 placeholder:text-lg placeholder:text-gray-400"
                {...field}
              />
            </FormControl>
            {rightElement}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
