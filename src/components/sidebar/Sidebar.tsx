import { formSteps } from "../../formData";
import classes from "./Sidebar.module.css";

type SidebarProps = {
  currentStep: number;
};

const Sidebar: React.FC<SidebarProps> = ({ currentStep }) => {
  return (
    <div className={classes["sidebar-container"]}>
      <div className={classes.sidebar}>
        {formSteps.map((step) => (
          <div className={classes["sidebar-step-container"]} key={step.stepDescription}>
            <div className={classes["sidebar-step-circle"]}>
              <span data-active={currentStep === step.stepNumber}>{step.stepNumber}</span>
            </div>
            <div className={classes["sidebar-step-info"]}>
              <span>{`Step ${step.stepNumber}`}</span>
              <p>{step.stepDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
