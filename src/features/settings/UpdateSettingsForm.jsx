import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  // 🌋 we destrucor setting twice and default is {} bc data doesn't arrive yet w'll get error getting it's values
  const {
    setting: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();

  // updating
  const { updateSetting, isUpdating } = useUpdateSetting();

  function handleBlur(e, field) {
    const { value } = e.target;
    if (!value) return;
    // console.log({ field: value }); ⛔⛔ this the name of the key will be always field
    // console.log({ [field]: value }); ⛔⛔ this the key will be dyncamic like (breakfastPrice,minBookingLength)

    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleBlur(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleBlur(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleBlur(e, 'maxGuestsPerBooking')}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          disabled={isUpdating}
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleBlur(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
