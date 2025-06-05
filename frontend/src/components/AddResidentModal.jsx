import { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

const AddResidentModal = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    profilePhoto: '',
    linkedinUrl: '',
    twitterUrl: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.title) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}/residents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add resident');
      }

      toast.success("You're in!", {
        style: {
          background: '#6B46C1',
          color: '#fff',
        },
        icon: '👋',
      });
      onSuccess();
      onClose();
      setFormData({
        firstName: '',
        lastName: '',
        title: '',
        profilePhoto: '',
        linkedinUrl: '',
        twitterUrl: '',
      });
    } catch (error) {
      toast.error('Error adding resident');
      console.error('Error:', error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Modal 
          open={open} 
          onClose={onClose}
          closeAfterTransition
          sx={{
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Box sx={style}>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <PersonAddIcon sx={{ fontSize: 30, color: '#6B46C1', mr: 2 }} />
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#2D3748' }}>
                    Add New Resident
                  </Typography>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: 16,
                      top: 16,
                      color: '#718096',
                      '&:hover': { color: '#2D3748' }
                    }}
                    onClick={onClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </motion.div>

              <Box 
                component="form" 
                onSubmit={handleSubmit} 
                sx={{ 
                  mt: 2,
                  '& .MuiTextField-root': {
                    mb: 2,
                  }
                }}
              >
                {[
                  { name: 'firstName', label: 'First Name', required: true },
                  { name: 'lastName', label: 'Last Name', required: true },
                  { name: 'title', label: 'Title / Role', required: true },
                  { name: 'profilePhoto', label: 'Profile Photo URL', required: false, helperText: 'Leave empty for default avatar' },
                  { name: 'linkedinUrl', label: 'LinkedIn URL', required: false },
                  { name: 'twitterUrl', label: 'Twitter URL', required: false }
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <TextField
                      fullWidth
                      label={field.label}
                      name={field.name}
                      required={field.required}
                      value={formData[field.name]}
                      onChange={handleChange}
                      helperText={field.helperText}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#6B46C1',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#6B46C1',
                          }
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#6B46C1',
                        }
                      }}
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      py: 1.5,
                      backgroundColor: '#6B46C1',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '12px',
                      textTransform: 'none',
                      boxShadow: '0 4px 6px -1px rgba(107, 70, 193, 0.2), 0 2px 4px -1px rgba(107, 70, 193, 0.1)',
                      '&:hover': {
                        backgroundColor: '#805AD5',
                        boxShadow: '0 10px 15px -3px rgba(107, 70, 193, 0.2), 0 4px 6px -2px rgba(107, 70, 193, 0.1)',
                      }
                    }}
                  >
                    Add Resident
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default AddResidentModal; 