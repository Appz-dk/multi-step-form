import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SubscriptionData } from "../form/SubscriptionForm";

type PersonalInfoStepProps = {
  register: UseFormRegister<SubscriptionData>;
  errors: FieldErrors<SubscriptionData>;
};

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ register, errors }) => {
  return (
    <div>
      <h1>Personal Info</h1>
      <p>Please provide your name, email address, and phone number.</p>
      <fieldset>
        <div>
          <label>Name</label>
          <input
            placeholder="e.g. Stephen King"
            {...register("name", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label>Email</label>
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
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label>Phone Number</label>
          <input
            placeholder="e.g. 12345678"
            {...register("phoneNumber", {
              required: {
                value: true,
                message: "This field is required",
              },
              pattern: {
                value: /^\d+$/,
                message: "Should only contain numbers",
              },
              minLength: {
                value: 8,
                message: "Minimum length of 8 numbers",
              },
            })}
          />
          {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
        </div>
      </fieldset>
    </div>
  );
};

export default PersonalInfoStep;
