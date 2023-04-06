import classes from "./Sidebar.module.css";

const STEPS = [1, 2, 3, 4];

const currentStep = 1;

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      {STEPS.map((step) => (
        <>
          <div className={classes["sidebar-step-circle"]}>
            <span data-active={currentStep === step}>{step}</span>
          </div>
          <div className={classes["sidebar-step-info"]}>
            <span>STEP 1</span>
            <p>YOUR INFO</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Sidebar;
