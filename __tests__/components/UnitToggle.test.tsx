import { render, screen, fireEvent } from '@testing-library/react';
import UnitToggle from '@/components/UnitToggle';
import { WeatherProvider } from '@/lib/WeatherContext';

const renderWithProvider = (component: React.ReactElement) => {
  return render(<WeatherProvider>{component}</WeatherProvider>);
};

describe('UnitToggle', () => {
  it('should render both unit buttons', () => {
    renderWithProvider(<UnitToggle />);
    expect(screen.getByLabelText('Switch to Celsius')).toBeInTheDocument();
    expect(screen.getByLabelText('Switch to Fahrenheit')).toBeInTheDocument();
  });

  it('should toggle units when clicked', () => {
    renderWithProvider(<UnitToggle />);
    const fahrenheitButton = screen.getByLabelText('Switch to Fahrenheit');
    
    fireEvent.click(fahrenheitButton);
    expect(fahrenheitButton).toHaveAttribute('aria-pressed', 'true');
    
    const celsiusButton = screen.getByLabelText('Switch to Celsius');
    fireEvent.click(celsiusButton);
    expect(celsiusButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should have proper accessibility attributes', () => {
    renderWithProvider(<UnitToggle />);
    const celsiusButton = screen.getByLabelText('Switch to Celsius');
    const fahrenheitButton = screen.getByLabelText('Switch to Fahrenheit');
    
    expect(celsiusButton).toHaveAttribute('aria-label');
    expect(fahrenheitButton).toHaveAttribute('aria-label');
    expect(celsiusButton).toHaveAttribute('aria-pressed');
    expect(fahrenheitButton).toHaveAttribute('aria-pressed');
  });
});

