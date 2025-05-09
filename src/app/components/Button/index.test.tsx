import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button Component', () => {
  // Test 1: Basic render with defaults
  it('renders a primary solid button by default', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toHaveClass('flex');
    expect(button).toHaveClass('items-center');
    expect(button).toHaveClass('justify-center');

    expect(button).toHaveClass('bg-surface-primary');
    expect(button).toHaveClass('text-white');
  });

  // Test 2: Render with color variants
  it.each([
    ['primary', 'bg-surface-primary'],
    ['secondary', 'bg-surface-neutral-base'],
    ['success', 'bg-surface-neutral-base'],
    ['neutral-base', 'bg-surface-neutral-base'],
    ['neutral-weak', 'bg-surface-neutral-weak'],
    ['neutral-background', 'bg-surface-background'],
    ['neutral-middleground', 'bg-surface-middleground'],
    ['neutral-foreground', 'bg-surface-foreground'],
  ])('renders correct classes for %s color variant', (color, expectedClass) => {
    render(<Button buttonColor={color as never}>{color} button</Button>);
    
    const button = screen.getByRole('button', { name: new RegExp(`${color} button`, 'i')});
    expect(button).toHaveClass(expectedClass);
  });

  // Test 3: Render with type variants
  it.each([
    ['solid', ''],
    ['ghost', 'bg-transparent'],
  ])('renders correct classes for %s type variant', (type, expectedClass) => {
    render(<Button buttonType={type as never}>{type} button</Button>);
    
    const button = screen.getByRole('button', { name: new RegExp(`${type} button`, 'i')});
    if (expectedClass) {
      expect(button).toHaveClass(expectedClass);
    }
  });

  // Teste 4: Mixing variants (compound variants)
  it('applies correct compound variant classes for primary ghost', () => {
    render(<Button buttonColor="primary" buttonType="ghost">Primary Ghost</Button>);
    
    const button = screen.getByRole('button', { name: /primary ghost/i });
    expect(button).toHaveClass('text-content-primary');
    expect(button).toHaveClass('hover:bg-surface-primary/10');
  });

  // Teste 5: Render icon as component
  it('renders icon when passed as a component', () => {
    const MockIcon = () => <svg data-testid="mock-icon" />;
    render(<Button icon={MockIcon}>With Icon</Button>);
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  // Teste 6: Render icon as JSX
  it('renders icon when passed as JSX', () => {
    render(<Button icon={<span data-testid="jsx-icon">⭐</span>}>With Icon</Button>);
    
    expect(screen.getByTestId('jsx-icon')).toBeInTheDocument();
  });

  // Teste 7: className props
  it('merges additional classes via className prop', () => {
    render(<Button className="custom-class">Test</Button>);
    
    const button = screen.getByRole('button', { name: /test/i });
    expect(button).toHaveClass('custom-class');
  });
});