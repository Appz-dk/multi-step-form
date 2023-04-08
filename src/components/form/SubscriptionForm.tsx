import { useMultistepForm } from "../../hooks/useMultistepForm";
import PersonalInfoStep from "../formSteps/PersonalInfoStep";
import { useForm } from "react-hook-form";
import PlanStep from "../formSteps/PlanStep";

import classes from "./SubscriptionForm.module.css";
import Sidebar from "../sidebar/Sidebar";
import AddonsStep from "../formSteps/AddonsStep";
import { planAddons, plans } from "../../formData";

export type SubscriptionData = {
  name: string;
  email: string;
  phoneNumber: string;
  planId: string;
  isYearly: boolean;
  addons: string[];
};

const SubscriptionForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<SubscriptionData>({
    mode: "onSubmit",
    defaultValues: {
      addons: [planAddons[0].id],
      isYearly: false,
      planId: plans[0].id,
    },
  });

  const { step, isLastStep, isFirstStep, nextStep, prevStep, currentStepIndex } = useMultistepForm([
    <PersonalInfoStep register={register} errors={errors} />,
    <PlanStep register={register} getValues={getValues} />,
    <AddonsStep register={register} getValues={getValues} />,
  ]);

  const onSubmit = (data: SubscriptionData) => {
    nextStep();

    if (isLastStep) console.log(data);
  };

  return (
    <>
      <Sidebar currentStep={currentStepIndex + 1} />
      <section className={classes["form-wrapper"]}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step}
          <div className={classes["form-actions"]}>
            {!isFirstStep && (
              <button
                className={classes["form-actions-prev-step"]}
                type="button"
                onClick={prevStep}
              >
                Go Back
              </button>
            )}
            {!isLastStep && (
              <button className={classes["form-actions-next-step"]}>Next Step</button>
            )}
            {isLastStep && <button>confirm</button>}
          </div>
        </form>
      </section>
    </>
  );
};

export default SubscriptionForm;
