import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Grid from '@mui/material/Grid';

export const NewsPageSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#252525" highlightColor="#998e87">
      <Grid container spacing={3}>
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
      </Grid>
    </SkeletonTheme>
  );
};

function Block() {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Skeleton height={'255px'} width={'100%'} />
      <Skeleton height={'45px'} width={'100%'} />
      <Skeleton height={'45px'} width={'100%'} />
    </Grid>
  );
}
