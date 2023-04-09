import { useMultistepForm } from "../../hooks/useMultistepForm";
import PersonalInfoStep from "../formSteps/PersonalInfoStep";
import { useForm } from "react-hook-form";
import PlanStep from "../formSteps/PlanStep";

import classes from "./SubscriptionForm.module.css";
import Sidebar from "../sidebar/Sidebar";
import AddonsStep from "../formSteps/AddonsStep";
import { planAddons, plans } from "../../formData";
import ConfirmStep from "../formSteps/ConfirmStep";
import FinalStep from "../formSteps/FinalStep";
import { useState } from "react";

export type SubscriptionData = {
  name: string;
  email: string;
  phoneNumber: string;
  planId: string;
  isYearly: boolean;
  addons: string[];
};

const SubscriptionForm = () => {
  const [formIsDone, setFormIsDone] = useState(false);
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

  const { step, isLastStep, isFirstStep, nextStep, prevStep, currentStepIndex, goToStep } =
    useMultistepForm([
      <PersonalInfoStep register={register} errors={errors} />,
      <PlanStep register={register} getValues={getValues} />,
      <AddonsStep register={register} getValues={getValues} />,
      <ConfirmStep goToStep={handleGoToStep} getValues={getValues} />,
    ]);

  const onSubmit = (data: SubscriptionData) => {
    nextStep();

    if (isLastStep) {
      console.log(`"data sent to backend:"`, data);
      setFormIsDone(true);
    }
  };

  function handleGoToStep(step: number) {
    goToStep(step);
  }

  return (
    <div className={classes["form-layout"]}>
      <Sidebar currentStep={currentStepIndex + 1} />
      <section className={classes["form-wrapper"]}>
        <>
          {!formIsDone && (
            <form onSubmit={handleSubmit(onSubmit)}>
              {step}
              {/* Navigation btns */}
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
          )}
          {formIsDone && <FinalStep />}
        </>
      </section>
    </div>
  );
};

export default SubscriptionForm;
