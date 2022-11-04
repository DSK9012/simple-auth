import { FormikProps, FormikTouched } from 'formik';
import { ChangeEvent } from 'react';

export default function useFormikHelpers<T>(formik:FormikProps<T>) {
  const handleChangeAndBlur = (control:string) => {
    const fieldHandler = formik.handleChange(control);

    return (newValue:string) => {
      formik.setFieldTouched(control);
      fieldHandler(newValue);
    };
  };

  const handleChange = (event:ChangeEvent<HTMLInputElement>, control:string) => {
    const { value } = event.target;
    formik.setFieldTouched(control);
    formik.setFieldValue(control, value);
  };

  const handleDateChange = (control:string, value:string) => {
    formik.setFieldTouched(control);
    formik.setFieldValue(control, value, true);
  };

  function hasError(field:FormikTouched<keyof T>) {
    return formik.touched[field] && Boolean(formik.errors[field]);
  }

  function getHelpText(field:FormikTouched<keyof T>) {
    return formik.touched[field] ? formik.errors[field] : undefined;
  }

  return { handleChangeAndBlur, handleChange, handleDateChange, hasError, getHelpText };
}
