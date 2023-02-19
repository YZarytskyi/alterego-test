export const classes = {
  root: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:hover': {
      '& .MuiButtonBase-root': {
        visibility: 'visible',
        opacity: 1,
        pointerEvents: 'all',
      },
    },
  },
  media: {
    height: 250,
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: 0.6,
    marginBottom: 0.6,
  },
  deleteBtn: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    transition:
      'opacity 250ms cubic-bezier(.42, 0, .58, 1), visibility 250ms cubic-bezier(.42, 0, .58, 1), background-color 200ms cubic-bezier(.42, 0, .58, 1)',
    '@media (min-width: 1200px)': {
      bottom: 5,
      right: 5,
      visibility: 'hidden',
      opacity: 0,
      pointerEvents: 'none',
    },
    '&:hover': {
      backgroundColor: 'rgb(255, 255, 255, 0.3)',
    },
  },
};
