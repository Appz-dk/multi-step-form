import React, { useState } from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import PersonalInfoStep from "../formSteps/PersonalInfoStep";
import { useForm } from "react-hook-form";
import PlanStep from "../formSteps/PlanStep";

export type SubscriptionData = {
  name: string;
  email: string;
  phoneNumber: string;
  planId: string;
  billingType: string;
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

  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step}
        {!isLastStep && <button>next</button>}
        {isLastStep && <button>confirm</button>}
      </form>
    </div>
  );
};

export default SubscriptionForm;
