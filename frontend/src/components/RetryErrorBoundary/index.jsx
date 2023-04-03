import { useQueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';

function RetryComponent({ resetErrorBoundary }) {
  return (
    <div>
      <div> 데이터를 불러오는데 실패하였습니다. </div>
      <button type="button" onClick={() => resetErrorBoundary()}>
        다시 시도
      </button>
    </div>
  );
}

function RetryErrorBoundary({ children }) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} fallbackRender={RetryComponent}>
      {children}
    </ErrorBoundary>
  );
}

export default RetryErrorBoundary;
