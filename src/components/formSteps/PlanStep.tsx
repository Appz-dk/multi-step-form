import { useState } from "react";
import { FieldErrors, UseFormGetValues, UseFormRegister } from "react-hook-form";
import { SubscriptionData } from "../form/SubscriptionForm";
import classes from "./PlanStep.module.css";
import { plans } from "../../types";

type PlanStepProps = {
  register: UseFormRegister<SubscriptionData>;
  getValues: UseFormGetValues<SubscriptionData>;
};

const PlanStep: React.FC<PlanStepProps> = ({ register, getValues }) => {
  const selectedPlan = getValues("planId");
  const formIsYearly = getValues("isYearly");
  const [activePlan, setActivePlan] = useState(selectedPlan || "arcade");
  const [isMonthly, setIsMonthly] = useState(!formIsYearly);

  return (
    <div className={classes["plan"]}>
      <h1>Select your plan</h1>
      <p>You have the option of monthly or yearly billing.</p>
      <fieldset className={classes["plan-fieldset"]}>
        {plans.map((plan) => (
          <label
            key={plan.id}
            className={classes["plan-radio"]}
            data-active={activePlan === plan.id}
            onClick={() => setActivePlan(plan.id)}
          >
            <input
              type="radio"
              aria-selected={activePlan === plan.id}
              {...register("planId")}
              value={plan.id}
            />
            <img src={plan.icon} />
            <div className={classes["plan-info"]}>
              <h3 className={classes["plan-type"]}>{plan.name}</h3>
              <span className={classes["plan-price"]}>
                {isMonthly ? `$${plan.monthlyPrice}/mo` : `$${plan.yearlyPrice}/yr`}
              </span>
              {!isMonthly && (
                <span className={classes["plan-discount"]}>{plan.yearlyBonusMessage}</span>
              )}
            </div>
          </label>
        ))}
      </fieldset>
      {/* Plan Slider */}
      <div>
        <label className={classes["plan-switch"]}>
          <span className={classes["plan-period"]} aria-selected={isMonthly}>
            Monthly
          </span>
          <input
            className="visually-hidden"
            type="checkbox"
            {...register("isYearly")}
            onChange={() => setIsMonthly((prev) => !prev)}
          />
          <span className={classes.slider}></span>
          <span className={classes["plan-period"]} aria-selected={!isMonthly}>
            Yearly
          </span>
        </label>
      </div>
    </div>
  );
};

export default PlanStep;
