import { useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {
    const error = useRouteError();
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(error);
    }
  return (
    <div>ErrorBoundary</div>
  )
}

export default ErrorBoundary
