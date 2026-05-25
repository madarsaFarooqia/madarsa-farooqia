import { useMutation } from '@tanstack/react-query';
import { paymentService } from '../../services';

export function usePaymentMutations() {
  const mockSuccess = useMutation({
    mutationFn: (paymentId) => paymentService.mockSuccess(paymentId),
  });

  return { mockSuccess };
}
