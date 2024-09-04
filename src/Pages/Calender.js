import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Slider from 'react-slick'; // Import the slider library
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

// Sample Data
const tasks = [
  {
    id: 1,
    title: 'Build a ToDo App',
    date: '2023-09-01',
    dueDate: '2023-09-10',
    technology: 'React, Node.js',
    description: 'Create a full-stack ToDo application with CRUD functionalities.',
    images: [
      'https://via.placeholder.com/400x200',
      'https://via.placeholder.com/400x200/ff7f7f',
      'https://via.placeholder.com/400x200/7f7fff',
    ],
  },
  {
    id: 2,
    title: 'E-commerce Website',
    date: '2023-09-05',
    dueDate: '2023-09-20',
    technology: 'Angular, Express.js',
    description: 'Develop a responsive e-commerce website with payment integration.',
    images: [
      'https://via.placeholder.com/400x200',
      'https://via.placeholder.com/400x200/ff7f7f',
      'https://via.placeholder.com/400x200/7f7fff',
    ],
  },
  // Add more tasks as needed
];

// Styled Components
const StyledTableContainer = styled(TableContainer)({
  marginTop: '20px',
  border: '2px solid #ddd', // Outline border
  width: '90%', // 80% of total width
  margin: '0 auto', // Center the table
});

const StyledButton = styled(Button)({
  margin: '0 5px',
});

const ModalContent = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: 24,
  padding: '20px',
  outline: 'none',
});

const Image = styled('img')({
  width: '100%',
  borderRadius: '8px',
});

const TaskTable = () => {
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Handlers for Description Modal
  const handleOpenDescriptionModal = (task) => {
    setCurrentTask(task);
    setOpenDescriptionModal(true);
  };

  const handleCloseDescriptionModal = () => {
    setOpenDescriptionModal(false);
    setCurrentTask(null);
  };

  // Handlers for Image Modal
  const handleOpenImageModal = (task) => {
    setCurrentTask(task);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setCurrentTask(null);
  };

  // Handler for Submit Button
  const handleSubmitRepo = async (task) => {
    const { value: repoLink } = await Swal.fire({
      title: `Submit GitHub Repo for "${task.title}"`,
      input: 'url',
      inputLabel: 'GitHub Repository URL',
      inputPlaceholder: 'Enter your GitHub repository URL',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter the repository URL!';
        }
        // Optional: Add more validation for URL format
        return null;
      },
    });

    if (repoLink) {
      Swal.fire({
        icon: 'success',
        title: 'Submitted!',
        text: `Your repository link has been submitted: ${repoLink}`,
        confirmButtonText: 'OK',
      });
    }
  };

  // Settings for the image slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <StyledTableContainer component={Paper}>
        <Table aria-label="task table">
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Due Date</strong></TableCell>
              <TableCell><strong>Technology</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.date}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.technology}</TableCell>
                <TableCell align="center">
                  <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDescriptionModal(task)}
                  >
                    Description
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    color="success"
                    onClick={() => handleSubmitRepo(task)}
                  >
                    Submit
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenImageModal(task)}
                  >
                    Show Image
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Description Modal */}
      {currentTask && (
        <Modal
          open={openDescriptionModal}
          onClose={handleCloseDescriptionModal}
          aria-labelledby="description-modal-title"
          aria-describedby="description-modal-description"
        >
          <ModalContent>
            <Typography id="description-modal-title" variant="h6" component="h2" gutterBottom>
              {currentTask.title} - Description
            </Typography>
            <Typography id="description-modal-description" variant="body1">
              {currentTask.description}
            </Typography>
            <Box textAlign="right" marginTop="20px">
              <Button variant="outlined" onClick={handleCloseDescriptionModal}>
                Close
              </Button>
            </Box>
          </ModalContent>
        </Modal>
      )}

      {/* Image Modal */}
      {currentTask && (
        <Modal
          open={openImageModal}
          onClose={handleCloseImageModal}
          aria-labelledby="image-modal-title"
        >
          <ModalContent>
            <Typography id="image-modal-title" variant="h6" component="h2" gutterBottom>
              {currentTask.title} - Images
            </Typography>
            <Slider {...sliderSettings}>
              {currentTask.images.map((image, index) => (
                <Image key={index} src={image} alt={`${currentTask.title} - Image ${index + 1}`} />
              ))}
            </Slider>
            <Box textAlign="right" marginTop="20px">
              <Button variant="outlined" onClick={handleCloseImageModal}>
                Close
              </Button>
            </Box>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default TaskTable;
