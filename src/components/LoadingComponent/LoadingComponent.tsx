import "./LoadingComponent.scss";
import { ClassicSpinner } from "react-spinners-kit";

interface LoadingComponentProps {
  loadingComponentDisappear: string;
}

const LoadingComponent = ({
  loadingComponentDisappear,
}: LoadingComponentProps) => {
  return (
    <div className={`loading-component ${loadingComponentDisappear}`}>
      <ClassicSpinner size={80} />
    </div>
  );
};

export default LoadingComponent;
