import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SubscriptionData } from "../form/SubscriptionForm";
import { personalInfo } from "../../types";
import classes from "./PersonalInfoStep.module.css";

type PersonalInfoStepProps = {
  register: UseFormRegister<SubscriptionData>;
  errors: FieldErrors<SubscriptionData>;
};

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ register, errors }) => {
  return (
    <div className={classes["personal-info"]}>
      <h1>Personal Info</h1>
      <p>Please provide your name, email address, and phone number.</p>
      <fieldset className={classes["personal-info-fieldset"]}>
        {personalInfo.map((info) => (
          <div key={info.inputValue}>
            <div className={classes["label-container"]}>
              <label>{info.label}</label>
              {errors[info.inputValue] && (
                <span role="alert">{errors[info.inputValue]?.message}</span>
              )}
            </div>
            <input placeholder={info.placeholder} {...register(info.inputValue, info.errorObj)} />
          </div>
        ))}
      </fieldset>
    </div>
  );
};

export default PersonalInfoStep;

// Maybe more clear solution than the mapping above
{
  /* <div>
          <div className={classes["label-container"]}>
            <label>Name</label>
            {errors.name && <span aria-role="alert">{errors.name.message}</span>}
          </div>
          <input
            placeholder="e.g. Stephen King"
            {...register("name", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
        </div>
        <div>
          <div className={classes["label-container"]}>
            <label>Email Address</label>
            {errors.email && <span aria-role="alert">{errors.email.message}</span>}
          </div>
          <input
            type="email"
            placeholder="e.g stephenking@lorem.com"
            {...register("email", {
              required: {
                value: true,
                message: "This field is required",
              },
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid Email",
              },
            })}
          />
        </div>
        <div>
          <div className={classes["label-container"]}>
            <label>Phone Number</label>
            {errors.phoneNumber && <span aria-role="alert">{errors.phoneNumber.message}</span>}
          </div>
          <input
            placeholder="e.g. 12345678"
            {...register("phoneNumber", {
              required: {
                value: true,
                message: "This field is required",
              },
              pattern: {
                value: /^\d+$/,
                message: "Only contain numbers",
              },
              minLength: {
                value: 8,
                message: "Minimum length 8",
              },
            })}
          />
        </div> */
}
