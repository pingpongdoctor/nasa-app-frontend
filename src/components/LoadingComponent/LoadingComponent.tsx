import "./LoadingComponent.scss";
import { ClassicSpinner } from "react-spinners-kit";

interface LoadingComponentProps {
  loadingComponentDisappear?: string;
  loadingContent?: string;
}

const LoadingComponent = ({
  loadingComponentDisappear,
  loadingContent,
}: LoadingComponentProps) => {
  return (
    <div className={`loading-component ${loadingComponentDisappear}`}>
      <div className="loading-component__container">
        <p className="loading-component__text">{loadingContent}</p>
        <ClassicSpinner size={80} />
      </div>
    </div>
  );
};

export default LoadingComponent;
