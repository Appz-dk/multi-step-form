import { useEffect, useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import { getPlanAddonsByIds, getPlanById, Plan, PlanAddon } from "../../formData";
import { SubscriptionData } from "../form/SubscriptionForm";
import classes from "./ConfirmStep.module.css";

type ConfirmationData = {
  isYearly: boolean;
  plan: Plan;
  addons?: PlanAddon[];
};

type ConfirmStepProps = {
  goToStep: (step: number) => void;
  getValues: UseFormGetValues<SubscriptionData>;
};

const ConfirmStep: React.FC<ConfirmStepProps> = ({ goToStep, getValues }) => {
  const [subscriptionData, setSubscriptionData] = useState<ConfirmationData>();

  const handleGetConfirmationData = () => {
    const formData = getValues();
    const plan = getPlanById(formData.planId)!; // Should never be undefined
    const addons = getPlanAddonsByIds(formData.addons);
    return {
      isYearly: formData.isYearly,
      plan,
      addons,
    };
  };

  const getTotalPrice = () => {
    if (!subscriptionData) {
      return;
    }

    let totalPrice = 0;
    if (subscriptionData?.isYearly) {
      totalPrice += subscriptionData.plan.yearlyPrice;
      if (subscriptionData.addons) {
        // Loop addons and add to totalPrice
        subscriptionData.addons.forEach((addon) => (totalPrice += addon.yearlyPrice));
      }
    } else {
      totalPrice += subscriptionData.plan.monthlyPrice;
      if (subscriptionData.addons) {
        // Loop addons and add to totalPrice
        subscriptionData.addons.forEach((addon) => (totalPrice += addon.monthlyPrice));
      }
    }
    return totalPrice;
  };

  useEffect(() => {
    setSubscriptionData(handleGetConfirmationData());
  }, []);

  const showAddons = subscriptionData?.addons && subscriptionData.addons.length > 0;
  const isYearly = subscriptionData?.isYearly;
  const currentPlanPrice = isYearly
    ? `$${subscriptionData.plan.yearlyPrice}/yr`
    : `$${subscriptionData?.plan.monthlyPrice}/mo`;
  const totalPrice = isYearly ? `+$${getTotalPrice()}/yr` : `+$${getTotalPrice()}/mo`;

  return (
    <section className={classes.confirm}>
      <h1>Finishing up</h1>
      <p>Double-check everything looks ok before confirming.</p>
      <div className={classes["confirm-prices"]}>
        <div className={classes["confirm-plan"]}>
          <div>
            <h3>Arcade ({isYearly ? "Yearly" : "Monthly"})</h3>
            <button type="button" onClick={() => goToStep(2)}>
              Change
            </button>
          </div>
          <span>{currentPlanPrice}</span>
        </div>
        {showAddons && (
          <div className={classes["confirm-addons"]}>
            {subscriptionData.addons?.map((addon) => (
              <div key={addon.id}>
                <p>{addon.name}</p>
                <span>{isYearly ? `+$${addon.yearlyPrice}/yr` : `+$${addon.monthlyPrice}/mo`}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classes["confirm-total"]}>
        <p>Total (per {isYearly ? "year" : "month"})</p>
        <span>{totalPrice}</span>
      </div>
    </section>
  );
};

export default ConfirmStep;
