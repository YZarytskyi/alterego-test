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
    visibility: 'hidden',
    opacity: 0,
    pointerEvents: 'none',
    bottom: 5,
    right: 5,
    transition:
      'opacity 250ms cubic-bezier(.42, 0, .58, 1), visibility 250ms cubic-bezier(.42, 0, .58, 1)',
    '&:hover': {
      backgroundColor: 'rgb(255, 255, 255, 0.3)',
    },
  },
};
