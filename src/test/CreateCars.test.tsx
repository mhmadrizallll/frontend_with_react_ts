// CreatePage.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CreatePage from '../dashboard/CreateCar';

jest.mock('axios'); // Mock axios module

describe('CreatePage', () => {
  it('should upload image to CDN and create a car', async () => {
    // Mock axios.post for CDN upload
    const mockPost = axios.post as jest.Mock;
    mockPost.mockImplementation((url, data) => {
      if (url === 'https://api.cloudinary.com/v1_1/dgaeoqlao/image/upload') {
        return Promise.resolve({ data: { url: 'http://cdn.example.com/test.png' } });
      }
      return Promise.resolve({ data: { id: '1', message: 'Car created successfully' } });
    });

    // Render the component
    const { getByLabelText, getByText } = render(<CreatePage />);

    // Fill out form fields
    fireEvent.change(getByLabelText('Plate'), { target: { value: 'ABC123' } });
    fireEvent.change(getByLabelText('Manufacture'), { target: { value: 'Toyota' } });
    fireEvent.change(getByLabelText('Model'), { target: { value: 'Camry' } });
    fireEvent.change(getByLabelText('Rent Per Day'), { target: { value: '100000' } });
    fireEvent.change(getByLabelText('Capacity'), { target: { value: '5' } });
    fireEvent.change(getByLabelText('Description'), { target: { value: 'Test car' } });
    fireEvent.change(getByLabelText('Available At'), { target: { value: '08:00' } });
    fireEvent.change(getByLabelText('Transmission'), { target: { value: 'automatic' } });
    fireEvent.change(getByLabelText('Type'), { target: { value: 'Sedan' } });
    fireEvent.change(getByLabelText('Year'), { target: { value: '2023' } });

    // Simulate checkbox change
    fireEvent.click(getByLabelText('Available'));

    // Mock file upload
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    Object.defineProperty(getByLabelText('Image'), 'files', {
      value: [file],
    });
    fireEvent.change(getByLabelText('Image'));

    // Click on Create button
    fireEvent.click(getByText('Create'));

    // Wait for async actions to complete
    await waitFor(() => {
      // Assert or expect statements based on success or failure conditions
      expect(mockPost).toHaveBeenCalledTimes(2); // Ensure axios.post was called twice (CDN upload and car creation)
      expect(mockPost).toHaveBeenCalledWith(
        'https://api.cloudinary.com/v1_1/dgaeoqlao/image/upload',
        expect.any(FormData)
      );
      expect(mockPost).toHaveBeenCalledWith(
        'http://localhost:8000/api/cars',
        expect.any(FormData),
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'), // Example mock token
          },
        }
      );

      // Example: Assert success message or redirection
      const successMessage = getByText('Mobil berhasil ditambahkan');
      expect(successMessage).toBeInTheDocument();

      // Example: Assert redirection after success
      setTimeout(() => {
        expect(window.location.href).toBe('/admin');
      }, 1500); // Adjust timeout as necessary
    });
  });

  // Add more tests as needed for edge cases, error handling, etc.
});
