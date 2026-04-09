import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

async function signIn() {
  await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
}

describe('Observed UI behavior', () => {
  test('TC-01 login screen shows the basic sign-in controls', () => {
    render(<App />);

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.queryAllByLabelText(/username|password/i)).toHaveLength(0);
  });

  test('TC-02 blank login currently enters the dashboard without validation', async () => {
    render(<App />);

    await signIn();

    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.queryByText(/required|invalid|error/i)).not.toBeInTheDocument();
  });

  test('TC-03 authenticated navigation shows all modules but no active-page indicator', async () => {
    render(<App />);

    await signIn();

    [
      'Dashboard',
      'Orders',
      'Inventory',
      'Notifications',
      'Invoices',
      'View Logs',
      'Account',
    ].forEach((label) => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });

    expect(document.querySelector('[aria-current="page"]')).toBeNull();
  });

  test('TC-04 inventory opens with placeholder values instead of a clear empty state', async () => {
    render(<App />);

    await signIn();
    await userEvent.click(screen.getByRole('button', { name: /inventory/i }));

    expect(screen.getByRole('heading', { name: /^inventory$/i })).toBeInTheDocument();
    expect(screen.getAllByText('-').length).toBeGreaterThan(0);
    expect(screen.queryByText(/no items|no inventory|empty/i)).not.toBeInTheDocument();
  });

  test('TC-05 order quantity inputs retain an entered numeric value', async () => {
    render(<App />);

    await signIn();
    await userEvent.click(screen.getByRole('button', { name: /^orders$/i }));

    const quantityInputs = screen.getAllByRole('spinbutton');
    await userEvent.clear(quantityInputs[0]);
    await userEvent.type(quantityInputs[0], '2');

    expect(quantityInputs[0]).toHaveValue(2);
  });

  test('TC-06 users can move from place order to view orders and back', async () => {
    render(<App />);

    await signIn();
    await userEvent.click(screen.getByRole('button', { name: /^orders$/i }));
    await userEvent.click(screen.getByRole('button', { name: /view all orders/i }));

    expect(screen.getByRole('heading', { name: /view orders/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /back to place order/i }));

    expect(screen.getByRole('heading', { name: /place order/i })).toBeInTheDocument();
  });

  test('TC-07 submit order currently provides no confirmation or total update', async () => {
    render(<App />);

    await signIn();
    await userEvent.click(screen.getByRole('button', { name: /^orders$/i }));

    const quantityInputs = screen.getAllByRole('spinbutton');
    await userEvent.clear(quantityInputs[0]);
    await userEvent.type(quantityInputs[0], '2');
    await userEvent.click(screen.getByRole('button', { name: /submit order/i }));

    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.queryByText(/submitted|success|created|saved/i)).not.toBeInTheDocument();
  });

  test('TC-08 dashboard metrics remain at zero after an attempted order submission', async () => {
    render(<App />);

    await signIn();
    await userEvent.click(screen.getByRole('button', { name: /^orders$/i }));

    const quantityInputs = screen.getAllByRole('spinbutton');
    await userEvent.clear(quantityInputs[0]);
    await userEvent.type(quantityInputs[0], '3');
    await userEvent.click(screen.getByRole('button', { name: /submit order/i }));
    await userEvent.click(screen.getByRole('button', { name: /^dashboard$/i }));

    expect(screen.getByText(/total number of orders/i)).toBeInTheDocument();
    expect(screen.getByText(/to be packaged/i)).toBeInTheDocument();
    expect(screen.getByText(/to be shipped/i)).toBeInTheDocument();
    expect(screen.getByText(/to be invoiced/i)).toBeInTheDocument();
    expect(screen.getAllByText('0').length).toBeGreaterThan(0);
  });

  test('TC-09 notifications, invoices, and logs are reachable but still show placeholders', async () => {
    render(<App />);

    await signIn();

    await userEvent.click(screen.getByRole('button', { name: /^notifications$/i }));
    expect(screen.getByRole('heading', { name: /^notifications$/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /^invoices$/i }));
    expect(screen.getByRole('heading', { name: /^invoices$/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /view logs/i }));
    expect(screen.getByRole('heading', { name: /^logs$/i })).toBeInTheDocument();

    expect(screen.getAllByText('-').length).toBeGreaterThan(0);
    expect(screen.queryByText(/no notifications|no invoices|no logs|empty/i)).not.toBeInTheDocument();
  });

  test('TC-10 logout works, but switch account has no visible effect', async () => {
    render(<App />);

    await signIn();
    await userEvent.click(screen.getByRole('button', { name: /^account$/i }));

    await userEvent.click(screen.getByRole('button', { name: /switch account/i }));
    expect(screen.getByRole('heading', { name: /^account$/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /log out/i }));
    expect(screen.getByRole('heading', { name: /south balance/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^dashboard$/i })).not.toBeInTheDocument();
  });
});
