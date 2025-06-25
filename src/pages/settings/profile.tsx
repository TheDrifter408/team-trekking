import React, { useState } from 'react';
import { z } from 'zod';
import {
  nameSchema,
  emailSchema,
  simplePasswordSchema,
} from '@/lib/validation/validationSchema.tsx';
import { LABEL } from '@/lib/constants/appStrings.ts';
import { InputIcon } from '@/components/shadcn-ui/input';
import { Button } from '@/components/shadcn-ui/button';
import { Label } from '@/components/shadcn-ui/label';

const profileFormSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  password: simplePasswordSchema,
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

const initialFormData: ProfileFormData = {
  fullName: 'Jawahir Nabhan',
  email: 'jawahir.dcastalia@gmail.com',
  password: '',
};

function parseZodErrors<T>(
  schema: z.ZodType<T>,
  data: T
): Partial<Record<keyof T, string>> | null {
  try {
    schema.parse(data);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errs: Partial<Record<keyof T, string>> = {};
      for (const err of error.errors) {
        const field = err.path[0] as keyof T;
        errs[field] = err.message;
      }
      return errs;
    }
    return null;
  }
}

const Profile = () => {
  const [formData, setFormData] = useState<ProfileFormData>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProfileFormData, string>>
  >({});

  // Dirty check to enable Save Changes button only if form has been modified
  const hasChanged =
    JSON.stringify(formData) !== JSON.stringify(initialFormData);

  const onInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const validationErrors = parseZodErrors(profileFormSchema, formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: API Call
    }
  };

  return (
    <>
      <div className="mx-[52px] my-[28px]">
        <p className="text-3xl font-semibold mb-8">{LABEL.MY_SETTINGS}</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-[70%]">
            <p className="text-base font-medium text-content-default">
              {LABEL.PROFILE}
            </p>
            <span className="text-content-tertiary text-sm">
              {LABEL.YOUR_PERSONAL_INFORMATION_AND_ACCOUNT_SECURITY}
            </span>
          </div>
          <div>
            <p className="text-base font-medium text-content-default">
              {LABEL.AVATAR}
            </p>
            <img
              src="/jnavatar.jpg"
              alt="avatar"
              className="rounded-full object-cover size-[80px] mt-1"
            />

            {/* Profile Form */}
            <div className="mt-8 max-w-2xl">
              <form onSubmit={onSubmit} className="space-y-6">
                {/* Full Name Field */}
                <div className="space-y-1.5">
                  <Label className="text-base font-medium text-content-default">
                    {LABEL.FULL_NAME}
                  </Label>
                  <InputIcon
                    icon="user"
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => onInputChange('fullName', e.target.value)}
                    className={`block w-full !py-[7px] !text-base border rounded-lg shadow-sm ${
                      errors.fullName ? 'border-red-300' : ''
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-content-danger">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <Label className="text-base font-medium text-content-default">
                    {LABEL.EMAIL}
                  </Label>
                  <InputIcon
                    icon="email"
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => onInputChange('email', e.target.value)}
                    className={`block w-full !py-[7px] !text-base border rounded-lg shadow-sm ${
                      errors.email ? 'border-red-300' : ''
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-content-danger">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <Label className="text-base font-medium text-content-default">
                    {LABEL.PASSWORD}
                  </Label>
                  <InputIcon
                    icon="lock"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => onInputChange('password', e.target.value)}
                    className={`block w-full !py-[7px] !text-base border rounded-lg shadow-sm ${
                      errors.password ? 'border-red-300' : ''
                    }`}
                    placeholder="Enter New Password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="z-10 border-t border-border/60 absolute bottom-0 h-[72px] flex justify-end items-center px-8 w-full bg-white">
        <div className="flex gap-3">
          <Button
            type="submit"
            className="bg-theme-main text-lg"
            onClick={onSubmit}
            disabled={!hasChanged}
          >
            {LABEL.SAVED}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Profile;
