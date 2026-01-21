
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  IconButton,
} from '@mui/material';
import { FetchAssetPrice } from '../../services/finnhubClient';
import type { AssetDTO } from '../../models/API/AssetDTO';
import { AssetType } from '../../common/enums/AssetType';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
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

function Crypto() {
  const [cryptoData, setCryptoData] = useState<AssetDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchAssetPrice(AssetType.CRYPTO);
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 10000); // Refetch every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 0.5 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 3 }}>
        Crypto Prices
      </Typography>
      <Grid container spacing={1} direction="column">
        {cryptoData.map((crypto) => (
          <Grid key={crypto.symbol}>
            <StyledCard>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" component="div" sx={{ mr: '10' }}>
                    {crypto.symbol}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" component="div" sx={{ mr: 10, ml:10 }}>
                      ${crypto.price !== undefined ? crypto.price.toFixed(2) : "N/A"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={crypto.change >= 0 ? 'success.main' : 'error.main'}
                      sx={{ mr: 2, ml:10 }}
                    >
                      {crypto.change >= 0 ? '+' : ''}{crypto.change !== undefined ? crypto.change.toFixed(3) : "N/A"}%
                    </Typography>
                    <IconButton size="small" onClick={() => toggleFavorite(crypto.symbol)}>
                      {favorites.includes(crypto.symbol) ? (
                        <StarIcon sx={{ color: 'warning.main' }} />
                      ) : (
                        <StarBorderOutlinedIcon />
                      )}
                    </IconButton>
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

export default Crypto;
