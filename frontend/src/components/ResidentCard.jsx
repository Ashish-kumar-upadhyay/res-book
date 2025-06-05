import { Card, CardContent, CardMedia, Typography, IconButton, Box, Chip } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import WorkIcon from '@mui/icons-material/Work';
import { motion } from 'framer-motion';
import { useState } from 'react';

const ResidentCard = ({ resident }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: isHovered 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease-in-out',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={false}
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{ overflow: 'hidden' }}
      >
        <CardMedia
          component="img"
          height="260"
          image={resident.profilePhoto || 'https://via.placeholder.com/300x400?text=Resident'}
          alt={`${resident.firstName} ${resident.lastName}`}
          sx={{ 
            objectFit: 'cover',
            filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
            transition: 'filter 0.3s ease-in-out'
          }}
        />
      </motion.div>

      <CardContent 
        sx={{ 
          flexGrow: 1,
          p: 3,
          background: isHovered 
            ? 'linear-gradient(to bottom right, #ffffff, #f8f9fa)'
            : '#ffffff',
          transition: 'background 0.3s ease-in-out'
        }}
      >
        <motion.div
          initial={false}
          animate={isHovered ? { y: -5 } : { y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              color: '#2D3748',
              mb: 1
            }}
          >
            {resident.firstName} {resident.lastName}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <WorkIcon sx={{ color: '#6B46C1', mr: 1, fontSize: '1.2rem' }} />
            <Chip
              label={resident.title}
              sx={{
                backgroundColor: 'rgba(107, 70, 193, 0.1)',
                color: '#6B46C1',
                fontWeight: 500,
                borderRadius: '8px'
              }}
            />
          </Box>

          <motion.div
            initial={false}
            animate={isHovered ? { y: -5, opacity: 1 } : { y: 0, opacity: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Box sx={{ 
              mt: 2, 
              display: 'flex', 
              gap: 1,
              justifyContent: 'flex-start'
            }}>
              {resident.linkedinUrl && (
                <IconButton
                  href={resident.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: 'rgba(107, 70, 193, 0.1)',
                    color: '#6B46C1',
                    '&:hover': {
                      backgroundColor: '#6B46C1',
                      color: 'white',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
              )}
              {resident.twitterUrl && (
                <IconButton
                  href={resident.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: 'rgba(107, 70, 193, 0.1)',
                    color: '#6B46C1',
                    '&:hover': {
                      backgroundColor: '#6B46C1',
                      color: 'white',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <TwitterIcon />
                </IconButton>
              )}
            </Box>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ResidentCard; 