import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import cs from 'classnames';

import { usePageTitle } from '@hooks/usePageTitle';
import { useAuth } from '@hooks/useAuth';
import { UserInfo } from '@services/UsersService';

import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';
import { Form } from '@components/Form';
import { FileUploader } from '@components/FileUploader';
import { Loader } from '@components/Loader';
import { Toaster } from '@components/Toaster';

import defaultAvatarIcon from '@assets/images/user-circle.png';

const editSchema = yup.object({
  name: yup.string().required().label('Name'),
  email: yup.string().email('Email format is invalid').required().label('Email'),
}).required();

type EditSchema = yup.InferType<typeof editSchema>;

export function ProfileSettings() {
  usePageTitle('Auth | Profile');

  const {
    isLoading, isAuthenticated, user, handleUpdateInfo, handleLogout,
  } = useAuth();

  const {
    register, handleSubmit, reset, formState: { errors, isDirty, isValid },
  } = useForm<EditSchema>({
    mode: 'all',
    resolver: yupResolver(editSchema),
  });

  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(defaultAvatarIcon);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!user) return;

    reset(user);
  }, [user, reset]);

  function handleFileChange(file: File) {
    const image = URL.createObjectURL(file);
    setImageUrl(image);
  }

  const onSubmit: SubmitHandler<EditSchema> = async (data) => {
    if (!isDirty) return;

    try {
      const newInfo: UserInfo = {
        email: data.email,
        name: data.name,
      };

      await handleUpdateInfo(newInfo);
    } catch (err) {
      if (err instanceof axios.AxiosError) {
        alert(err.response?.data.error ?? 'Something went wrong!');
      }
    }
  };

  if (isLoading && !isAuthenticated) {
    return <Loader />;
  }

  return (
    <main className="h-full flex flex-col items-center justify-center bg-blue-100 font-poppins">
      <Toaster />

      <button
        type="button"
        className={cs(
          'absolute top-5 right-5 py-2 px-3 rounded-lg bg-white border-2 border-gray-500',
          'font-poppins font-semibold text-base text-gray-500 shadow-md',
          'hover:bg-gray-600 hover:border-gray-600 hover:text-white transition-colors',
        )}
        onClick={handleLogout}
      >
        Sign Out
      </button>

      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className="pt-[58px] sm:pt-[78px] relative"
      >
        <div
          className={cs(
            'absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2',
            'bg-white rounded-full',
          )}
        >
          <Avatar src={imageUrl} size="lg" />

          <FileUploader onFileChange={handleFileChange}>
            <div className="w-12 absolute bottom-[10px] -left-[10px]">
              <Button className="ring-blue-800 ring-2" size="xs">
                Edit
              </Button>
            </div>
          </FileUploader>
        </div>

        <Form.Field
          {...register('name')}
          label="Name"
          placeholder="Your name"
          error={errors.name?.message}
          leftIcon={<i className="fa-solid fa-user" />}
        />

        <Form.Field
          {...register('email')}
          label="Email"
          placeholder="Your email"
          inputType="email"
          error={errors.email?.message}
          leftIcon={<i className="fa-solid fa-envelope" />}
        />

        <Form.Field
          disabled
          label="Password"
          placeholder="••••••••"
          inputType="password"
          leftIcon={<i className="fa-solid fa-lock" />}
        >
          <div className="w-full flex justify-end mt-1">
            <Link
              to="/profile/password"
              className={cs(
                'text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors',
              )}
            >
              Change password&nbsp;
              <i className="fa-solid fa-arrow-up-right-from-square" />
            </Link>
          </div>
        </Form.Field>

        <Button
          type="submit"
          className="mt-2"
          disabled={!isDirty || !isValid || isLoading}
          loading={isLoading}
        >
          Update
        </Button>
      </Form.Root>
    </main>
  );
}
