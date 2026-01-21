import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { FetchAssetPrices } from '../../services/finnhubClient';
import type { AssetDTO } from '../../models/API/AssetDTO';
import { useFavorites } from '../../contexts/FavoritesContext';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  backgroundColor: 'rgba(25, 118, 210, 0.1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

function Favorites() {
  const [favoritesData, setFavoritesData] = useState<AssetDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      if (favorites.length === 0) {
        setLoading(false);
        return;
      }
      try {
        const data = await FetchAssetPrices(favorites);
        setFavoritesData(data);
      } catch (error) {
        console.error('Error fetching favorites data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000); // Refetch every 30 seconds

    return () => clearInterval(interval);
  }, [favorites]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (favorites.length === 0) {
    return (
      <Box sx={{ flexGrow: 1, p: 0.5 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 3 }}>
          Favorite Assets
        </Typography>
        <Typography variant="body1">No favorites selected yet.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 0.5 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 3 }}>
        Favorite Assets
      </Typography>
      <Grid container spacing={1} direction="column">
        {favoritesData.map((asset) => (
          <Grid key={asset.symbol}>
            <StyledCard>
              <CardContent sx={{ flexGrow: 1, mr: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" component="div">
                    {asset.symbol}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" component="div" sx={{ mr: 20, ml: 20 }}>
                      ${asset.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={asset.change >= 0 ? 'success.main' : 'error.main'}
                      sx={{ ml: 0 }}
                    >
                      {asset.change >= 0 ? '+' : ''}{asset.change}%
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Favorites;