import { useForm } from 'react-hook-form';

import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : '',
  });
  const { errors } = formState;

  // creating
  const { mutateCreate, isCreating } = useCreateCabin();

  // updating
  const { mutateUpdate, isUpdating } = useUpdateCabin();

  const creatingOrUpdatin = isCreating || isUpdating;

  function onSubmit(data) {
    // like in apicabin which img we should pass the mutateUpdate is't the same image or in the file
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      mutateUpdate(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            // ⛔⛔mutate like useMutation it can have {opt} and receive data params that comes return mutationFn in this case it's data from createCabinApi
            // console.log(data);
          },
        }
      );
    else
      mutateCreate({ ...data, image: data.image[0] }, { onSuccess: (data) => reset() });
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
          disabled={creatingOrUpdatin}
          id="name"
          {...register('name', { required: 'this field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          disabled={creatingOrUpdatin}
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
          disabled={creatingOrUpdatin}
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
          disabled={creatingOrUpdatin}
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
          disabled={creatingOrUpdatin}
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
        <Button variation="secondary" disabled={creatingOrUpdatin} type="reset">
          Cancel
        </Button>
        <Button disabled={creatingOrUpdatin}>
          {isEditSession ? 'Edit Cabin' : 'Create a cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
