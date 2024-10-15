import { ErrorMessageProps } from "../../Interfaces/interfaces";

const ErrorMessage = ({ formik, fieldName }: ErrorMessageProps) => {
  const { touched, errors } = formik;
  const error = errors?.[fieldName];

  return (
    <div className="mt-2 mb-2">
      {touched?.[fieldName] && typeof error === "string" ? (
        <span className="error-message">{error}</span>
      ) : null}
    </div>
  );
};

export default ErrorMessage;
