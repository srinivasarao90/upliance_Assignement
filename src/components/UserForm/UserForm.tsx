import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Box, CircularProgress, Avatar } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserData, FormData } from '../types';

// Define validation schema
const schema = yup.object().shape<FormData>({
  name: yup.string().required('Name is required').min(3, 'Minimum 3 characters').max(50, 'Maximum 50 characters'),
  email: yup.string().email('Invalid email format').required('Email is required')
    .matches(/@(gmail|yahoo|outlook)\.com$/, 'We only accept Gmail, Yahoo, or Outlook'),
  phone: yup.string().matches(/^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/, 'Invalid phone number format')
    .required('Phone number is required'),
  address: yup.string().max(200, 'Maximum 200 characters').required('Address is required').min(10, 'Minimum 10 characters'),
});

const UserForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storedUserData, setStoredUserData] = useState<UserData | null>(() => {
    try {
      const data = localStorage.getItem('userData');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading user data:', error);
      return null;
    }
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(storedUserData?.image || null);

  const { control, handleSubmit, formState, reset } = useForm<FormData>({
    defaultValues: { name: '', email: '', phone: '', address: '' },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (storedUserData) {
      setSelectedImage(storedUserData.image || null);
    }
  }, [storedUserData]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      const userData: UserData = {
        ...data,
        id: uuidv4(),
        image: selectedImage || ''
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      setStoredUserData(userData);
      
      // **Reset form after submission but keep stored data visible**
      reset({ name: '', email: '', phone: '', address: '' });
      setSelectedImage(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle image upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: { xs: 1, md: 3 } }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form Fields */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              margin="normal"
              error={!!formState.errors.name}
              helperText={formState.errors.name?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              margin="normal"
              type="email"
              error={!!formState.errors.email}
              helperText={formState.errors.email?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone"
              fullWidth
              margin="normal"
              error={!!formState.errors.phone}
              helperText={formState.errors.phone?.message}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!formState.errors.address}
              helperText={formState.errors.address?.message}
            />
          )}
        />

        {/* Image Upload Section */}
        <Box sx={{ mt: 2 }}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {selectedImage && (
            <Avatar src={selectedImage} sx={{ width: 100, height: 100, mt: 1 }} />
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting || !formState.isValid}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </Button>
      </form>

      {/* Display stored data */}
      {storedUserData && (
        <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          <h3>Saved User Data</h3>
          {storedUserData.image && <Avatar src={storedUserData.image} sx={{ width: 100, height: 100, mb: 1 }} />}
          <p><strong>Name:</strong> {storedUserData.name}</p>
          <p><strong>Email:</strong> {storedUserData.email}</p>
          <p><strong>Phone:</strong> {storedUserData.phone}</p>
          <p><strong>Address:</strong> {storedUserData.address}</p>
        </Box>
      )}
    </Box>
  );
};

export default UserForm;
