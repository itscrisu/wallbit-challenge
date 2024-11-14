import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React from 'react';
import { CartItem } from '../../types/cart';
import { StyledImage } from '../common/StyledImage';

interface CartTableProps {
  items: CartItem[];
}

export const CartTable: React.FC<CartTableProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary">
          No hay productos en el carrito, probá agregando uno nuevo arriba con su ID y la cantidad que desees ingresar
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cant</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio U</TableCell>
            <TableCell>Precio T</TableCell>
            <TableCell>Foto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>${item.totalPrice.toFixed(2)}</TableCell>
              <TableCell>
                <StyledImage 
                  src={item.image} 
                  alt={item.title}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};