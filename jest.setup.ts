/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Extrai o valor de src considerando diferentes formatos
    let srcValue = '';
    
    if (typeof props.src === 'string') {
      srcValue = props.src;
    } else if (props.src?.src) {
      srcValue = props.src.src;
    } else {
      // Valor padrão para evitar src vazio
      srcValue = 'mock-image.jpg';
    }

    // Remove prefixos comuns
    const normalizedSrc = srcValue
      .replace('@/', '')
      .replace('public/', '');

    return React.createElement('img', {
      ...props,
      role: 'img',
      'aria-hidden': props.alt ? 'false' : 'true',
      src: normalizedSrc || 'mock-image.jpg', // Garante sempre um valor
      'data-testid': 'mock-next-image'
    });
  },
}));

// Mocks específicos para SVGs com valores padrão
jest.mock('@/app/assets/chevron.svg', () => ({
  __esModule: true,
  default: (props: any) => React.createElement('img', {
    ...props,
    role: 'img',
    'aria-hidden': 'true',
    src: 'mock-chevron.svg',
    'data-testid': 'mock-chevron-icon'
  }),
}));

jest.mock('@/app/assets/dolarsign.svg', () => ({
  __esModule: true,
  default: (props: any) => React.createElement('img', {
    ...props,
    role: 'img',
    'aria-hidden': 'true',
    src: 'mock-dolarsign.svg',
    'data-testid': 'mock-dolar-icon'
  }),
}));

const mockRadixAccordion = () => {
  const original = jest.requireActual('@radix-ui/react-accordion') as any;

  const AccordionContext = React.createContext(null);

  const AccordionWrapper: React.FC<any> = ({ children, collapsible, ...props }) => {
    const filteredProps = collapsible === true ? props : { ...props, collapsible };
    
    return React.createElement(
      AccordionContext.Provider,
      { value: null },
      React.createElement(
        'div',
        {
          'data-testid': 'radix-accordion',
          ...filteredProps
        },
        children
      )
    );
  };

  const AccordionItemWrapper: React.FC<any> = ({ children, ...props }) => 
    React.createElement(
      'div',
      {
        'data-testid': 'accordion-item',
        ...props
      },
      children
    );

  const AccordionTriggerWrapper: React.FC<any> = ({ children, ...props }) =>
    React.createElement(
      'button',
      {
        'data-testid': 'accordion-trigger',
        ...props
      },
      children
    );

  const AccordionContentWrapper: React.FC<any> = ({ children, ...props }) =>
    React.createElement(
      'div',
      {
        'data-testid': 'accordion-content',
        ...props
      },
      children
    );

  return {
    ...original,
    Accordion: AccordionWrapper,
    AccordionItem: AccordionItemWrapper,
    AccordionTrigger: AccordionTriggerWrapper,
    AccordionContent: AccordionContentWrapper,
  };
};

jest.mock('@radix-ui/react-accordion', () => mockRadixAccordion());