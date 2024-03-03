import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { createOrEditCabin } from '../../services/apiCabins';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : '',
  });
  const queryClient = useQueryClient();
  const { errors } = formState;

  // creating
  const { mutate: mutateCreate, isLoading: isCreating } = useMutation({
    // mutationFn: (cabin) => createCabin(cabin),
    mutationFn: createOrEditCabin,
    onSuccess: () => {
      toast.success('cabin created successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err?.message),
  });

  // editing
  const { mutate: mutateEdit, isLoading: isEditing } = useMutation({
    // destrucringt the obj that we get from mutateEdit
    mutationFn: ({ newCabinData, id }) => createOrEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('cabin edited successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err?.message),
  });

  const creatingOrEditing = isCreating || isEditing;
  function onSubmit(data) {
    // like in apicabin which img we should pass the mutateEdit is't the same image or in the file
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) mutateEdit({ newCabinData: { ...data, image }, id: editId });
    else mutateCreate({ ...data, image: data.image[0] });
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
          disabled={creatingOrEditing}
          id="name"
          {...register('name', { required: 'this field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          disabled={creatingOrEditing}
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
          disabled={creatingOrEditing}
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
          disabled={creatingOrEditing}
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
          disabled={creatingOrEditing}
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
          {...register('image', {
            required: isEditSession ? false : 'this field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" disabled={creatingOrEditing} type="reset">
          Cancel
        </Button>
        <Button disabled={creatingOrEditing}>
          {isEditSession ? 'Edit Cabin' : 'Create a cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
