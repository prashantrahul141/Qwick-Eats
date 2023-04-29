import type { FC } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { AiOutlineUpload } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';

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
  const [selectedImage, setSelectedImage] = useState<{
    file: File;
    objectUrl: string;
  } | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const addFormItem: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      className='flex flex-col gap-4 rounded-md border border-gray-300 bg-main p-4 dark:border-bord dark:bg-black'
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
        />
        {errors.description && (
          <span className='w-full max-w-md text-[#ff0f0f] dark:text-red-500'>
            {errors.description.message}
          </span>
        )}
      </div>

      <div>
        {!selectedImage && (
          <div
            onClick={() => {
              imageRef.current?.click();
            }}
            className='group flex aspect-square h-24 cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-500 dark:bg-black'>
            <AiOutlineUpload
              size={28}
              className='text-gray-900 group-hover:text-black dark:text-gray-500 dark:group-hover:text-gray-400'></AiOutlineUpload>
          </div>
        )}

        {selectedImage && (
          <div className='relative w-fit'>
            <button
              onClick={() => {
                setSelectedImage(null);
                if (imageRef.current) {
                  imageRef.current.value = '';
                }
              }}
              className='group absolute right-2 top-2 rounded-md bg-gray-900/20 p-1 hover:bg-red-600'>
              <MdDeleteForever className='text-2xl text-red-500 group-hover:text-white'></MdDeleteForever>
            </button>
            <img
              className='max-h-48'
              src={selectedImage.objectUrl}
              alt='Selected Food Image'></img>
          </div>
        )}
      </div>
      <input
        onChange={({ target: { files } }) => {
          if (files !== null && files[0] !== undefined) {
            if (files[0].size / 1024 ** 2 < 4) {
              const objectUrl = URL.createObjectURL(files[0]);
              setSelectedImage({ objectUrl, file: files[0] });
            }
          }
        }}
        ref={imageRef}
        accept={'.png, .jpg, .jpeg'}
        type='file'
        name='Food Image'
        className='fixed -top-full -left-full -z-50'
      />
      <button className='btn'>Add</button>
    </form>
  );
};

export default CreateFoodItemForm;
