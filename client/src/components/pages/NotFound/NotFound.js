import { Grid, Paper, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Grid
      sx={{ height: 600 }}
      container
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        component="div"
        sx={{
          width: 300,
          height: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        elevation={3}
      >
        <Typography variant="h1" fontWeight="bold" letterSpacing={10}>
          4
          <Typography
            sx={{ color: '#66b6d2', fontWeight: 'bold' }}
            variant="span"
          >
            0
          </Typography>
          4
        </Typography>
        <Typography variant="h5">The Page Not Found</Typography>
      </Paper>
    </Grid>
  );
};

export default NotFound;
