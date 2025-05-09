import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '.';
import '@testing-library/jest-dom';

describe('Accordion Component', () => {
  const mockItems = [
    {
      id: '1',
      name: 'Produto 1',
      description: 'Descrição do produto 1',
      hasSomeOffProduct: true,
      variants: [
        {
          id: '1-1',
          name: 'Variante 1',
          price: 'R$ 100,00',
          offPrice: 'R$ 90,00',
          description: 'Descrição da variante 1',
        },
        {
          id: '1-2',
          name: 'Variante 2',
          price: 'R$ 120,00',
          startingPrice: true,
        },
      ],
    },
    {
      id: '2',
      name: 'Produto 2',
      variants: [
        {
          id: '2-1',
          name: 'Variante Única',
          price: 'R$ 80,00',
        },
      ],
    },
  ];

  test('renders accordion with items', () => {
    render(<Accordion items={mockItems} />);

    // Verify if the main items are present
    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Descrição do produto 1')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();


    const discountIcons = screen.getAllByRole('img');
    expect(discountIcons.length).toBeGreaterThan(2); // At least one at the header and another at the variant, could be more
  });

  test('renders with primary color scheme', () => {
    render(<Accordion items={mockItems} colorScheme="primary" />);

    const productName = screen.getByText('Produto 1');
    expect(productName).toHaveClass('text-color-primary');
  });

  test('renders multiple items expanded when type is "multiple"', () => {
    render(<Accordion items={mockItems} type="multiple" />);

    const trigger1 = screen.getByText('Produto 1').closest('button');
    const trigger2 = screen.getByText('Produto 2').closest('button');

    if (trigger1 && trigger2) {
      fireEvent.click(trigger1);
      fireEvent.click(trigger2);
    }

    expect(screen.getByText('Variante 1')).toBeInTheDocument();
    expect(screen.getByText('Variante Única')).toBeInTheDocument();
  });

  test('renders price information correctly', () => {
    render(<Accordion items={mockItems} />);

    const trigger = screen.getByText('Produto 1').closest('button');
    if (trigger) {
      fireEvent.click(trigger);
    }

    expect(screen.getByText('R$ 100,00')).toHaveClass('line-through');
    expect(screen.getByText('R$ 90,00')).toHaveClass('text-content-success');

    expect(screen.getByText('a partir de')).toBeInTheDocument();
  });

  test('renders without crashing when optional props are missing', () => {
    const minimalItems = [
      {
        id: 'minimal',
        name: 'Produto Minimal',
        variants: [
          {
            id: 'min-1',
            name: 'Variante Minimal',
            price: 'R$ 50,00',
          },
        ],
      },
    ];

    render(<Accordion items={minimalItems} />);

    expect(screen.getByText('Produto Minimal')).toBeInTheDocument();
  });
});