import { Rings } from 'react-loader-spinner';

export const Spinner = (): JSX.Element => {
  return (
    <div
      style={{
        margin: '0 auto',
        marginTop: '50px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Rings
        height="80"
        width="100%"
        color="#003cff"
        radius="6"
        ariaLabel="rings-loading"
      />
    </div>
  );
};
