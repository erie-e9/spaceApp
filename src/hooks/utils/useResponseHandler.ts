import { useDispatch, useSelector } from 'react-redux';
import { setLoadingState, setErrorState } from '@slices/shared';
import { type ResponseHandlerState } from '@slices/types/responseHandler';

export const useResponseHandler = (): {
  loading: boolean;
  error: string;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
} => {
  const { loading, error } = useSelector(
    (state: { responseHandler: ResponseHandlerState }) => state.responseHandler,
  );

  const dispatch = useDispatch();
  const setLoading = (isLoading: boolean): void => {
    dispatch(setLoadingState(isLoading));
  };

  const setError = (errorString: string): void => {
    dispatch(setErrorState(errorString));
  };

  return {
    loading,
    setLoading,
    setError,
    error,
  };
};
