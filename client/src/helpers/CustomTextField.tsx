// Copyright © Bankers Healthcare Group, Inc.  All rights reserved.

import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, memo, useState } from 'react';

type ICustomTextFieldProps = Omit<TextFieldProps, 'onChange'> & {
  onChange: (value: string) => void;
  formatOnBlur?: () => void;
  onBlur?: () => void;
};

function TextFieldMaterial(props: ICustomTextFieldProps) {
  const [isError, setIsError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    props.onChange(event.target.value);
  };

  const { formatOnBlur, onBlur, ...rest } = props;

  return (
    <TextField
      size='medium'
      {...rest}
      variant='outlined'
      fullWidth
      spellCheck='false'
      autoComplete='on'
      onChange={handleChange}
      onBlur={() => {
        setIsError(true);
        const trimmedValue = String(props.value).trim();
        if (trimmedValue !== String(props.value)) {
          props.onChange(trimmedValue);
        }

        if (formatOnBlur) {
          formatOnBlur();
        }

        if (onBlur) {
          onBlur();
        }
      }}
      error={props.error && isError}
      helperText={isError && props.error ? props.helperText : ''}
    />
  );
}

TextFieldMaterial.defaultProps = {
  formatOnBlur: () => {},
  onBlur: () => {},
};

export default memo(
  TextFieldMaterial,
  (previous, next) =>
    previous.value === next.value &&
    previous.helperText === next.helperText &&
    previous.error === next.error &&
    previous.onChange === next.onChange
);
