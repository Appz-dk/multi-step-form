import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SubscriptionData } from "../form/SubscriptionForm";

type PlanStepProps = {
  register: UseFormRegister<SubscriptionData>;
  errors: FieldErrors<SubscriptionData>;
};

const PlanStep: React.FC<PlanStepProps> = ({ register, errors }) => {
  return (
    <fieldset>
      <div>
        <label>Plan</label>
        <input
          type="text"
          {...register("planId", {
            required: {
              value: true,
              message: "This field is required",
            },
          })}
        />
        {errors.planId && <span>{errors.planId.message}</span>}
      </div>
      <div>
        <label>Type</label>
        <input type="text" {...register("billingType")} />
        {errors.billingType && <span>{errors.billingType.message}</span>}
      </div>
    </fieldset>
  );
};

export default PlanStep;
