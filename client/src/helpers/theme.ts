import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      paper: '#fafafa',
    },
    action: {
      focus: 'silver',
      hover: 'green',
    },
  },
  spacing: 8,
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          boxShadow: 'none',
          '&::before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '0',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderBottom: '1.3px solid rgba(0, 56, 101, 0.1)',
          padding: '0',
          borderRadius: 'none',
          margin: '0',
          fontSize: '20px',
          fontWeight: 'bold',
          '&.Mui-expanded': {
            minHeight: '48px',
            margin: '0',
          },
        },
        content: {
          margin: '0',
          '&.Mui-expanded': {
            margin: '0',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body2: {
          fontWeight: 'inherit',
          fontFamily: 'inherit',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: 'silver',
          '& .MuiSvgIcon-root': {
            fontSize: '24px',
          },
          '&.Mui-checked': {
            color: '#47e7e7',
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: '#6d6d6d',
          '&::after': {
            background: 'linear-gradient(90deg,transparent,#808080,transparent)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#47e7e7a6',
          color: 'rgba(255,255,255)',
          textTransform: 'none',
          padding: '4px 12px',
          minWidth: '100px',
          borderRadius: '20px',
          '&.MuiButton-text, &.MuiButton-text:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'underline',
            color: '#47e7e7',
            marginLeft: '-16px',
          },
          '&:hover': {
            backgroundColor: '#47e7e7a6',
          },
          '&.Mui-disabled': {
            backgroundColor: '#47e7e7a6',
            cursor: 'not-allowed',
            color: '#ffffff75',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '4px 0',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: 500,
          color: '#70838f',
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          color: '#70838f',
          marginTop: '-4px',
        },
        label: {
          paddingTop: '4px',
          fontSize: '18px',
          color: '#70838f',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'red',
          letterSpacing: '0.16px',
          fontSize: '16px',
          fontWeight: 500,
          fontFamily: 'Roboto',
          '&.Mui-focused': {
            color: '#70838f',
          },
          '&$shrink, &$shrink $asterisk': {
            color: 'red',
            letterSpacing: '0.4px',
            lineHeight: 1.33,
            fontWeight: 500,
            fontFamily: 'Roboto',
          },
          '& $asterisk': {
            color: '#47e7e7',
          },
          '&$error, &$error $asterisk': {
            color: '#ff7100',
            fontWeight: 500,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.3px',
          '&.Mui-error': {
            color: '#ff7100',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#47e7e7',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            outline: 'none',
            borderColor: '#47e7e7',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            outline: 'none',
            borderColor: '#ff7100',
          },
          '&.Mui-error .MuiSvgIcon-root': {
            outline: 'none',
            color: '#ff7100',
          },
          '& .MuiInputBase-input.Mui-disabled': {
            color: '#70838f',
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            border: 'solid 1px rgba(0, 56, 101, 0.1)',
          },
          '&$error $notchedOutline, &$error:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ff7100',
          },
          fontSize: '16px',
        },
        notchedOutline: {
          border: '2px solid #47e7e7',
          borderRadius: '20px',
        },
        input: {
          background: 'inherit',
          color: 'white',
          '&::placeholder': {
            color: 'white',
            opacity: '.6',
          },
        },
      },
    },
  },
});

export default theme;
