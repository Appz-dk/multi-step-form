import { useState } from "react";
import { UseFormRegister, UseFormGetValues } from "react-hook-form";
import { planAddons } from "../../types";
import { SubscriptionData } from "../form/SubscriptionForm";
import classes from "./AddonsStep.module.css";

type AddonsStepProps = {
  register: UseFormRegister<SubscriptionData>;
  getValues: UseFormGetValues<SubscriptionData>;
};

const AddonsStep: React.FC<AddonsStepProps> = ({ register, getValues }) => {
  const chosenAddons = getValues("addons");
  const isYearly = getValues("isYearly");
  const [addons, setAddons] = useState<string[]>(chosenAddons || [planAddons[0].id]);

  const onAddonsChange = (addonId: string) => {
    // Remove addon if already exists
    if (addons.includes(addonId)) {
      setAddons((prev) => prev.filter((addon) => addon !== addonId));
      return;
    }
    // Add addon
    setAddons((prev) => [...prev, addonId]);
  };

  return (
    <div className={classes["addons"]}>
      <h1>Pick add-ons</h1>
      <p>Add-ons help enhance your gaming experience.</p>
      <fieldset className={classes["addon-fieldset"]}>
        {planAddons.map((addon, idx) => (
          <label
            key={addon.id}
            className={classes["addon-label"]}
            data-checked={addons.includes(addon.id)}
          >
            <input
              defaultChecked={idx === 0}
              className={classes.test}
              type="checkbox"
              value={addon.id}
              {...register("addons")}
              onChange={() => onAddonsChange(addon.id)}
            />
            <div>
              <h3>{addon.name}</h3>
              <p>{addon.description}</p>
            </div>
            <span>{isYearly ? `+$${addon.yearlyPrice}/yr` : `+$${addon.monthlyPrice}/mo`}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
};

export default AddonsStep;
