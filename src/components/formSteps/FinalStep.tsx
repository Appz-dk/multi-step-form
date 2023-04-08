import iconThanks from "../../assets/images/icon-thank-you.svg";
import classes from "./FinalStep.module.css";

const FinalStep = () => {
  return (
    <div className={classes["final-step"]}>
      <div>
        <img src={iconThanks} alt="red circle with a checkmark in the middle" />
      </div>
      <h1>Thank you!</h1>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our platform. If you
        ever need support, please feel free to email us at support@lorengaming.com
      </p>
    </div>
  );
};

export default FinalStep;
