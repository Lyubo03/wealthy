import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import ShowChartIcon from '@mui/icons-material/ShowChart';

function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box textAlign="center" sx={{ mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Welcome to Wealthy
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4, color: 'text.secondary' }}>
          Your personal financial dashboard for tracking cryptocurrencies and stocks in real-time.
          Stay informed, make smarter investment decisions.
        </Typography>
        <Button variant="contained" size="large" component={Link} to="/crypto" sx={{ mr: 2 }}>
          Explore Crypto
        </Button>
        <Button variant="outlined" size="large" component={Link} to="/stocks">
          View Stocks
        </Button>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4}>
        <Grid>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <TrendingUpIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Real-Time Prices
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Get live cryptocurrency and stock prices with automatic updates every 30 seconds.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <StarIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Favorites
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Star your favorite assets and track them all in one place on the Favorites page.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CardContent>
              <ShowChartIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Market Insights
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Monitor price changes and trends to stay ahead in the financial markets.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <Box textAlign="center" sx={{ mt: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Start Tracking Today
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Navigate to Crypto or Stocks to begin exploring the markets.
        </Typography>
        <Button variant="contained" size="large" component={Link} to="/favorites">
          View Your Favorites
        </Button>
      </Box>
    </Container>
  );
}

export default Home;