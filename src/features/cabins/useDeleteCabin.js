import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
  // queryClient is responsible for invalidate data then it will cause a refetch
  const queryClient = useQueryClient();
  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    // on success what happend
    onSuccess: () => {
      // this will make 'cabins' invalidate so will refrech data
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      // display a nice notification to user that it's deleted
      toast.success('cabin deleted successufully');
    },
    // on error what happend
    onError: (err) => toast.error(err?.message),
  });

  return { deleteCabin, isDeleting };
}
