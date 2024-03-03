import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { updateSetting as updateSettingApi } from '../../services/apiSettings';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  // editing
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    // destrucringt the obj that we get from mutateEdit
    mutationFn: (newSetting) => updateSettingApi(newSetting),
    onSuccess: () => {
      toast.success('setting updated successfully');
      queryClient.invalidateQueries({ queryKey: ['setting'] });
      // reset();
    },
    onError: (err) => toast.error(err?.message),
  });

  return { updateSetting, isUpdating };
}
