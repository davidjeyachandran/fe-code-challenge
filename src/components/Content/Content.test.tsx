import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Content from './Content';

describe('Content Component', () => {
    const props = {
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        buttonText: 'Open Dialog'
    };

    test('renders title, subtitle, and button', () => {
        render(<Content {...props} />);

        expect(screen.getByText(props.title)).toBeInTheDocument();
        expect(screen.getByText(props.subtitle)).toBeInTheDocument();
        expect(screen.getByText(props.buttonText)).toBeInTheDocument();
    });

    test('opens and closes the dialog', () => {
        render(<Content {...props} />);

        const button = screen.getByText(props.buttonText);
        fireEvent.click(button);

        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
});
