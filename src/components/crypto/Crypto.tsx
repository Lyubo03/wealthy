
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { FetchCryptoPrice } from '../../services/finnhubClient';
import type { CryptoDTO } from '../../models/CryptoDTO';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Crypto() {
  const [cryptoData, setCryptoData] = useState<CryptoDTO[]>([]);
  const [loading, setLoading] = useState(true);

  //TODO: Reaload on every n minutes
  //see what is going to happen without loading state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchCryptoPrice();
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Symbol</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Change (%)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell colSpan={3} align="center">Loading...</StyledTableCell>
              </StyledTableRow>
            ) : (
              cryptoData.map((crypto) => (
                <StyledTableRow key={crypto.symbol}>
                  <StyledTableCell component="th" scope="row">
                    {crypto.symbol}
                  </StyledTableCell>
                  <StyledTableCell align="right">${crypto.price}</StyledTableCell>
                  <StyledTableCell align="right">{crypto.change}%</StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}

export default Crypto;
