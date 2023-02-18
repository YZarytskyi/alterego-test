import { Dna } from 'react-loader-spinner';

export const Spinner = (): JSX.Element => {
  return (
    <div
      style={{
        margin: '0 auto',
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
      />
    </div>
  );
};
