import { useTheme } from '@mui/material/styles';
import { GlobalStyles as GlobalThemeStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const theme = useTheme();

  return (
    <GlobalThemeStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          '&::-webkit-scrollbar': {
            width: 5,
            borderRadius: 10,
          },

          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          /* Handle */
          '&::-webkit-scrollbar-thumb': {
            background: '#C4CDD5',
          },

          /* Handle on hover */
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#454F5B',
          },
        },
        html: {
          width: '100%',
          height: '100%',
          // '-ms-text-size-adjust': '100%',
          // '-webkit-overflow-scrolling': 'touch',
        },
        body: {
          width: '100%',
          height: '100%',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        textarea: {
          '&::-webkit-input-placeholder': {
            color: theme.palette.text.disabled,
          },
          '&::-moz-placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
          '&:-ms-input-placeholder': { color: theme.palette.text.disabled },
          '&::placeholder': { color: theme.palette.text.disabled },
        },
        '.textLimit': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          lineClamp: 2,
          WebkitBoxOrient: 'vertical',
        },
        a: {
          color: theme.palette.primary.main,
          textDecoration: 'none ',
          fontWeight: 600,
        },
        img: { display: 'block', maxWidth: '100%' },
        '.dispFlexAlgnCentr': {
          display: 'flex',
          alignItems: 'center',
        },
        '.cursorPointer': {
          cursor: 'pointer',
        },
      }}
    />
  );
}
