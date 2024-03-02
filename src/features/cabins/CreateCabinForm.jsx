import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';

import FormRow from '../../ui/FormRow';
import { createCabin } from '../../services/apiCabins';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const queryClient = useQueryClient();
  const { errors } = formState;

  const { mutate, isLoading: isCreating } = useMutation({
    // mutationFn: (cabin) => createCabin(cabin),
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('cabin created successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err?.message),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
    // console.log(data.image[0]);
  }
  function onError(errors) {
    // console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isCreating}
          id="name"
          {...register('name', { required: 'this field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          disabled={isCreating}
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'this field is required',
            min: { value: 1, message: 'the capacity must be greater than 1' },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isCreating}
          id="regularPrice"
          {...register('regularPrice', {
            required: 'this field is required',
            min: { value: 1, message: 'the capacity must be greater than 1' },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          disabled={isCreating}
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'this field is required',
            // we specify our validation that satisfy our requests
            validate: (value) => {
              return (
                value <= getValues().regularPrice ||
                'discount should be less than regular price'
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea
          type="number"
          disabled={isCreating}
          id="description"
          defaultValue=""
          {...register('description', { required: 'this field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          {...register('image', { required: 'this field is required' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" disabled={isCreating} type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
