import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../src/App.jsx';
import i18n from '../src/i18n/index.js';
import en from '../src/i18n/locales/en/translation.json';
import fa from '../src/i18n/locales/fa/translation.json';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('application routing', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  });

  it('renders the English homepage with page-specific metadata', async () => {
    renderAt('/');
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(/Khalid Khan/);
    await waitFor(() => expect(document.title).toBe(en.meta.home.title));
    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
  });

  it('loads Dari routes with RTL direction and localized metadata', async () => {
    renderAt('/fa/about');
    await waitFor(() => expect(document.title).toBe(fa.meta.about.title));
    expect(document.documentElement.lang).toBe('fa');
    expect(document.documentElement.dir).toBe('rtl');
    expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('switches language through the localized language link', async () => {
    renderAt('/about');
    await screen.findByRole('heading', { level: 1 });
    const dariLink = screen.getAllByRole('link', { name: /دری/i })[0];
    fireEvent.click(dariLink);
    await waitFor(() => expect(document.title).toBe(fa.meta.about.title));
    expect(document.documentElement.lang).toBe('fa');
    expect(document.documentElement.dir).toBe('rtl');
  });
});
