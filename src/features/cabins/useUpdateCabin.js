import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createOrUpdateCabin } from '../../services/apiCabins';

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  // updating
  const { mutate: mutateUpdate, isLoading: isUpdating } = useMutation({
    // destrucringt the obj that we get from mutateEdit
    mutationFn: ({ newCabinData, id }) => createOrUpdateCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('cabin updated successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      // reset();
    },
    onError: (err) => toast.error(err?.message),
  });

  return { mutateUpdate, isUpdating };
}
