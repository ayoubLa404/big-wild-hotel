import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createOrUpdateCabin } from '../../services/apiCabins';

export function useCreateCabin() {
  const queryClient = useQueryClient();
  // creating
  const { mutate: mutateCreate, isLoading: isCreating } = useMutation({
    // mutationFn: (cabin) => createCabin(cabin),
    mutationFn: createOrUpdateCabin,
    onSuccess: () => {
      toast.success('cabin created successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      // reset();
    },
    onError: (err) => toast.error(err?.message),
  });

  return { mutateCreate, isCreating };
}
