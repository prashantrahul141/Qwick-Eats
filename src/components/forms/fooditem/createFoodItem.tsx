import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

type FormInputs = {
  name: string;
  description: string;
};

const CreateFoodItemForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'all' });

  const addFormItem: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      className='flex flex-col gap-4 rounded-md bg-main p-4 dark:bg-black'
      onSubmit={handleSubmit(addFormItem)}>
      <div>
        <input
          placeholder='Name'
          type='text'
          className='input'
          {...register('name', {
            required: { value: true, message: 'A name is required.' },
            minLength: {
              value: 2,
              message: 'Name cannot be shorter than 2 characters.',
            },
            maxLength: {
              value: 50,
              message: 'Name cannot be longer than 50 characters.',
            },
          })}></input>
        {errors.name && (
          <span className='w-full max-w-md text-[#ff0f0f] dark:text-red-500'>
            {errors.name.message}
          </span>
        )}
      </div>

      <div>
        <textarea
          className='input'
          placeholder='Description'
          {...register('description', {
            required: { value: true, message: 'A description is required.' },
          })}
        />{' '}
        {errors.description && (
          <span className='w-full max-w-md text-[#ff0f0f] dark:text-red-500'>
            {errors.description.message}
          </span>
        )}
      </div>

      <button className='btn'>Add</button>
    </form>
  );
};

export default CreateFoodItemForm;
