import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

export function useSettings() {
  const {
    data: setting,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['setting'], queryFn: getSettings });

  return { setting, isLoading };
}
