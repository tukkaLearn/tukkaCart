import "./Error.css";

type Props = {
  message: string;
};

export default function Error({ message }: Props) {
  return (
    <div className="error-box">
      <h2>Something went wrong</h2>
      <p>{message}</p>
    </div>
  );
}
