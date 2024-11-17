import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { CartTable } from './CartTable';

describe('CartTable', () => {
  const mockItems = [
    {
      id: 1,
      title: 'Test Product',
      price: 100,
      quantity: 2,
      totalPrice: 200,
      image: 'test.jpg',
      description: 'Test description',
      category: 'test'
    }
  ];

  const mockHandlers = {
    onRemoveItem: vi.fn(),
    onUpdateQuantity: vi.fn(),
    onClearCart: vi.fn()
  };

  it('muestra mensaje cuando el carrito está vacío', () => {
    render(
      <CartTable 
        items={[]} 
        {...mockHandlers}
      />
    );

    expect(screen.getByText(/no hay productos en el carrito/i)).toBeInTheDocument();
  });

  it('muestra los productos correctamente', () => {
    render(
      <CartTable 
        items={mockItems} 
        {...mockHandlers}
      />
    );
  
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByTestId('price-u')).toHaveTextContent('$100');
    expect(screen.getByTestId('price-t')).toHaveTextContent('$200.00');
    expect(screen.getByText('Total: $200.00')).toBeInTheDocument();
  });

  it('ejecuta onRemoveItem cuando se hace click en eliminar', () => {
    render(
      <CartTable 
        items={mockItems} 
        {...mockHandlers}
      />
    );

    const onRemoveItem = screen.getByTestId('delete-button');
    fireEvent.click(onRemoveItem);
  
    expect(mockHandlers.onRemoveItem).toHaveBeenCalledWith(1);
  });

  it('ejecuta onUpdateQuantity cuando se cambia la cantidad', () => {
    render(
      <CartTable 
        items={mockItems} 
        {...mockHandlers}
      />
    );

    const inputCantidad = screen.getByRole('spinbutton');
    fireEvent.change(inputCantidad, { target: { value: '3' } });

    expect(mockHandlers.onUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('ejecuta onClearCart cuando se hace click en limpiar carrito', () => {
    render(
      <CartTable 
        items={mockItems} 
        {...mockHandlers}
      />
    );

    const onClearCart = screen.getByRole('button', { name: /limpiar carrito/i });
    fireEvent.click(onClearCart);

    expect(mockHandlers.onClearCart).toHaveBeenCalled();
  });

  it('muestra el total correcto', () => {
    const items = [
      { ...mockItems[0] },
      { ...mockItems[0], id: 2, quantity: 3, totalPrice: 300 }
    ];
  
    render(
      <CartTable 
        items={items} 
        {...mockHandlers}
      />
    );
  
    expect(screen.getByText((content) => content.includes('$500.00'))).toBeInTheDocument();
    expect(screen.getByText('Total: $500.00')).toBeInTheDocument();
  });
});