import { useState, useEffect } from 'react';
import { Container, Box, Button, Typography, useTheme } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import ResidentCard from './components/ResidentCard';
import AddResidentModal from './components/AddResidentModal';
import config from './config';
import './App.css';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function App() {
  const [residents, setResidents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();

  const fetchResidents = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/residents`);
      const data = await response.json();
      setResidents(data);
    } catch (error) {
      console.error('Error fetching residents:', error);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%)',
      pb: 8
    }}>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
          },
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          background: 'linear-gradient(135deg, #6B46C1 0%, #805AD5 100%)',
          py: 8,
          mb: 6,
          borderRadius: '0 0 30px 30px',
          boxShadow: '0 4px 20px rgba(107, 70, 193, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}
          />
          <Container maxWidth="lg">
            <Typography 
              variant="h2" 
              component="h1" 
              align="center" 
              sx={{ 
                color: 'white',
                fontWeight: 700,
                mb: 3,
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              The Residents Book
            </Typography>
            <Typography 
              variant="h6" 
              align="center" 
              sx={{ 
                color: 'rgba(255,255,255,0.9)',
                mb: 4,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Discover and connect with our amazing community members
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  onClick={() => setIsModalOpen(true)}
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: 'white',
                    color: '#6B46C1',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '12px',
                    boxShadow: '0 4px 14px rgba(255,255,255,0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)',
                    }
                  }}
                >
                  Add Resident
                </Button>
              </motion.div>
            </Box>
          </Container>
        </Box>
      </motion.div>

      <Container maxWidth="lg">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '32px',
            padding: '0 16px'
          }}
        >
          {residents.map((resident) => (
            <motion.div 
              key={resident._id} 
              variants={item}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ResidentCard resident={resident} />
            </motion.div>
          ))}
        </motion.div>
      </Container>

      <AddResidentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchResidents}
      />
    </Box>
  );
}

export default App;
