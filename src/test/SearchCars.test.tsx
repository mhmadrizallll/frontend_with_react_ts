import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import SearchCars from '../components/SearchCars';

const mock = new MockAdapter(axios);

const mockCars = [
  {
    id: '1',
    plate: 'B 1234 CD',
    manufacture: 'Toyota',
    model: 'Avanza',
    image: 'image1.jpg',
    rentPerDay: 300000,
    capacity: 7,
    description: 'Family car',
    available: true,
    availableAt: '2023-06-23T08:00:00Z',
    transmission: 'Automatic',
    type: 'SUV',
    year: 2021,
  },
  {
    id: '2',
    plate: 'B 5678 EF',
    manufacture: 'Honda',
    model: 'Civic',
    image: 'image2.jpg',
    rentPerDay: 500000,
    capacity: 4,
    description: 'Sporty car',
    available: false,
    availableAt: '2023-06-23T09:00:00Z',
    transmission: 'Manual',
    type: 'Sedan',
    year: 2022,
  },
];

beforeEach(() => {
  mock.reset();
  mock.onGet('http://localhost:8000/api/cars').reply(200, { data: mockCars });
});

test('renders SearchCars component', () => {
  render(<SearchCars />);
  expect(screen.getByLabelText(/Tipe Drive/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Tanggal/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Pilih Waktu/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Jumlah Penumpang/i)).toBeInTheDocument();
  expect(screen.getByText(/Cari Mobil/i)).toBeInTheDocument();
});

test('searches and filters cars correctly', async () => {
  render(<SearchCars />);

  userEvent.selectOptions(screen.getByLabelText(/Tipe Drive/i), 'true');
  userEvent.type(screen.getByLabelText(/Tanggal/i), '2021');
  userEvent.selectOptions(screen.getByLabelText(/Pilih Waktu/i), '08:00');
  userEvent.type(screen.getByLabelText(/Jumlah Penumpang/i), '7');

  fireEvent.click(screen.getByTestId('load-btn'));

  await waitFor(() => {
    expect(screen.getByText(/No cars available/i)).toBeInTheDocument();
  });
});

test('handles empty search results', async () => {
  mock.onGet('http://localhost:8000/api/cars').reply(200, { data: [] });

  render(<SearchCars />);

  fireEvent.click(screen.getByText(/Cari Mobil/i));

  await waitFor(() => {
    expect(screen.getByText(/No cars available/i)).toBeInTheDocument();
  });
});

test('handles API errors', async () => {
  mock.onGet('http://localhost:8000/api/cars').reply(500);

  render(<SearchCars />);
  
  fireEvent.click(screen.getByTestId('load-btn'));

  await waitFor(() => {
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
