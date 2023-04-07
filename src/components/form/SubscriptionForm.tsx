import { useMultistepForm } from "../../hooks/useMultistepForm";
import PersonalInfoStep from "../formSteps/PersonalInfoStep";
import { useForm } from "react-hook-form";
import PlanStep from "../formSteps/PlanStep";

import classes from "./SubscriptionForm.module.css";

export type SubscriptionData = {
  name: string;
  email: string;
  phoneNumber: string;
  planId: string;
  isMonthly: boolean;
  addons: string[];
};

const SubscriptionForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SubscriptionData>({
    mode: "onSubmit",
  });

  const { step, isLastStep, nextStep } = useMultistepForm([
    <PersonalInfoStep register={register} errors={errors} />,
    <PlanStep register={register} errors={errors} />,
  ]);

  const onSubmit = (data: SubscriptionData) => {
    nextStep();

    if (isLastStep) console.log(data);
  };

  return (
    <section className={classes["form-wrapper"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step}
        <div className={classes["form-actions"]}>
          {!isLastStep && <button>Next Step</button>}
          {isLastStep && <button>confirm</button>}
        </div>
      </form>
    </section>
  );
};

export default SubscriptionForm;
