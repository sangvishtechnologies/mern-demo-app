import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, TableSortLabel, TextField, InputAdornment, IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Avatar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import debounce from 'lodash/debounce';
import Fuse from 'fuse.js';
const rows = [
  { username: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '+1234567890', location: 'Los Angeles, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jan", role: "Full Stack Developer" },
  { username: 'Bob Smith', email: 'bob.smith@example.com', phone: '+1234567891', location: 'New York, USA', profileImage: 'https://via.placeholder.com/50', batch: "Feb", role: "Backend Developer" },
  { username: 'Charlie Brown', email: 'charlie.brown@example.com', phone: '+1234567892', location: 'Chicago, USA', profileImage: 'https://via.placeholder.com/50', batch: "Mar", role: ".NET Developer" },
  { username: 'David Wilson', email: 'david.wilson@example.com', phone: '+1234567893', location: 'Houston, USA', profileImage: 'https://via.placeholder.com/50', batch: "Apr", role: "Frontend Developer" },
  { username: 'Emily Davis', email: 'emily.davis@example.com', phone: '+1234567894', location: 'Phoenix, USA', profileImage: 'https://via.placeholder.com/50', batch: "May", role: "UI/UX Designer" },
  { username: 'Frank Miller', email: 'frank.miller@example.com', phone: '+1234567895', location: 'Philadelphia, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jun", role: "QA Engineer" },
  { username: 'Grace Lee', email: 'grace.lee@example.com', phone: '+1234567896', location: 'San Antonio, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jul", role: "Product Manager" },
  { username: 'Hannah Moore', email: 'hannah.moore@example.com', phone: '+1234567897', location: 'San Diego, USA', profileImage: 'https://via.placeholder.com/50', batch: "Aug", role: "DevOps Engineer" },
  { username: 'Isaac Taylor', email: 'isaac.taylor@example.com', phone: '+1234567898', location: 'Dallas, USA', profileImage: 'https://via.placeholder.com/50', batch: "Sep", role: "Technical Lead" },
  { username: 'Jack Anderson', email: 'jack.anderson@example.com', phone: '+1234567899', location: 'San Jose, USA', profileImage: 'https://via.placeholder.com/50', batch: "Oct", role: "Project Manager" },
  { username: 'Karen Thomas', email: 'karen.thomas@example.com', phone: '+1234567800', location: 'Austin, USA', profileImage: 'https://via.placeholder.com/50', batch: "Nov", role: "Frontend Developer" },
  { username: 'Leo Martinez', email: 'leo.martinez@example.com', phone: '+1234567801', location: 'Jacksonville, USA', profileImage: 'https://via.placeholder.com/50', batch: "Dec", role: "Backend Developer" },
  { username: 'Mia Harris', email: 'mia.harris@example.com', phone: '+1234567802', location: 'San Francisco, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jan", role: "Full Stack Developer" },
  { username: 'Nathan Clark', email: 'nathan.clark@example.com', phone: '+1234567803', location: 'Indianapolis, USA', profileImage: 'https://via.placeholder.com/50', batch: "Feb", role: "QA Engineer" },
  { username: 'Olivia Lewis', email: 'olivia.lewis@example.com', phone: '+1234567804', location: 'Columbus, USA', profileImage: 'https://via.placeholder.com/50', batch: "Mar", role: "UI/UX Designer" },
  { username: 'Paul Walker', email: 'paul.walker@example.com', phone: '+1234567805', location: 'Fort Worth, USA', profileImage: 'https://via.placeholder.com/50', batch: "Apr", role: "Product Manager" },
  { username: 'Quinn Young', email: 'quinn.young@example.com', phone: '+1234567806', location: 'Charlotte, USA', profileImage: 'https://via.placeholder.com/50', batch: "May", role: "DevOps Engineer" },
  { username: 'Rachel King', email: 'rachel.king@example.com', phone: '+1234567807', location: 'Detroit, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jun", role: "Technical Lead" },
  { username: 'Sam Scott', email: 'sam.scott@example.com', phone: '+1234567808', location: 'El Paso, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jul", role: "Project Manager" },
  { username: 'Tina Adams', email: 'tina.adams@example.com', phone: '+1234567809', location: 'Memphis, USA', profileImage: 'https://via.placeholder.com/50', batch: "Aug", role: "Frontend Developer" },
  { username: 'Ursula Baker', email: 'ursula.baker@example.com', phone: '+1234567810', location: 'Baltimore, USA', profileImage: 'https://via.placeholder.com/50', batch: "Sep", role: "Backend Developer" },
  { username: 'Victor Gonzalez', email: 'victor.gonzalez@example.com', phone: '+1234567811', location: 'Milwaukee, USA', profileImage: 'https://via.placeholder.com/50', batch: "Oct", role: ".NET Developer" },
  { username: 'Wendy Nelson', email: 'wendy.nelson@example.com', phone: '+1234567812', location: 'Albuquerque, USA', profileImage: 'https://via.placeholder.com/50', batch: "Nov", role: "QA Engineer" },
  { username: 'Xander Carter', email: 'xander.carter@example.com', phone: '+1234567813', location: 'Tucson, USA', profileImage: 'https://via.placeholder.com/50', batch: "Dec", role: "UI/UX Designer" },
  { username: 'Yara Mitchell', email: 'yara.mitchell@example.com', phone: '+1234567814', location: 'Fresno, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jan", role: "Product Manager" },
  { username: 'Zachary Roberts', email: 'zachary.roberts@example.com', phone: '+1234567815', location: 'Sacramento, USA', profileImage: 'https://via.placeholder.com/50', batch: "Feb", role: "DevOps Engineer" },
  { username: 'Ariana Evans', email: 'ariana.evans@example.com', phone: '+1234567816', location: 'Kansas City, USA', profileImage: 'https://via.placeholder.com/50', batch: "Mar", role: "Technical Lead" },
  { username: 'Ben Walker', email: 'ben.walker@example.com', phone: '+1234567817', location: 'Mesa, USA', profileImage: 'https://via.placeholder.com/50', batch: "Apr", role: "Project Manager" },
  { username: 'Chloe Hill', email: 'chloe.hill@example.com', phone: '+1234567818', location: 'Virginia Beach, USA', profileImage: 'https://via.placeholder.com/50', batch: "May", role: "Frontend Developer" },
  { username: 'Daniel King', email: 'daniel.king@example.com', phone: '+1234567819', location: 'Atlanta, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jun", role: "Backend Developer" },
  { username: 'Eva Adams', email: 'eva.adams@example.com', phone: '+1234567820', location: 'Colorado Springs, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jul", role: ".NET Developer" },
  { username: 'Felix Turner', email: 'felix.turner@example.com', phone: '+1234567821', location: 'Omaha, USA', profileImage: 'https://via.placeholder.com/50', batch: "Aug", role: "UI/UX Designer" },
  { username: 'Gina Collins', email: 'gina.collins@example.com', phone: '+1234567822', location: 'Raleigh, USA', profileImage: 'https://via.placeholder.com/50', batch: "Sep", role: "QA Engineer" },
  { username: 'Henry Bell', email: 'henry.bell@example.com', phone: '+1234567823', location: 'Miami, USA', profileImage: 'https://via.placeholder.com/50', batch: "Oct", role: "Product Manager" },
  { username: 'Isabella Cook', email: 'isabella.cook@example.com', phone: '+1234567824', location: 'Cleveland, USA', profileImage: 'https://via.placeholder.com/50', batch: "Nov", role: "DevOps Engineer" },
  { username: 'Jacob Walker', email: 'jacob.walker@example.com', phone: '+1234567825', location: 'Tulsa, USA', profileImage: 'https://via.placeholder.com/50', batch: "Dec", role: "Technical Lead" },
  { username: 'Kylie Phillips', email: 'kylie.phillips@example.com', phone: '+1234567826', location: 'Oakland, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jan", role: "Project Manager" },
  { username: 'Liam Anderson', email: 'liam.anderson@example.com', phone: '+1234567827', location: 'Minneapolis, USA', profileImage: 'https://via.placeholder.com/50', batch: "Feb", role: "Frontend Developer" },
  { username: 'Megan Scott', email: 'megan.scott@example.com', phone: '+1234567828', location: 'Wichita, USA', profileImage: 'https://via.placeholder.com/50', batch: "Mar", role: "Backend Developer" },
  { username: 'Noah Martinez', email: 'noah.martinez@example.com', phone: '+1234567829', location: 'Arlington, USA', profileImage: 'https://via.placeholder.com/50', batch: "Apr", role: ".NET Developer" },
  { username: 'Olivia Johnson', email: 'olivia.johnson@example.com', phone: '+1234567830', location: 'Bakersfield, USA', profileImage: 'https://via.placeholder.com/50', batch: "May", role: "UI/UX Designer" },
  { username: 'Patrick Wright', email: 'patrick.wright@example.com', phone: '+1234567831', location: 'Tampa, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jun", role: "QA Engineer" },
  { username: 'Quinn Green', email: 'quinn.green@example.com', phone: '+1234567832', location: 'Honolulu, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jul", role: "Product Manager" },
  { username: 'Riley Murphy', email: 'riley.murphy@example.com', phone: '+1234567833', location: 'Aurora, USA', profileImage: 'https://via.placeholder.com/50', batch: "Aug", role: "DevOps Engineer" },
  { username: 'Sophie Ross', email: 'sophie.ross@example.com', phone: '+1234567834', location: 'Montgomery, USA', profileImage: 'https://via.placeholder.com/50', batch: "Sep", role: "Technical Lead" },
  { username: 'Thomas Bell', email: 'thomas.bell@example.com', phone: '+1234567835', location: 'Augusta, USA', profileImage: 'https://via.placeholder.com/50', batch: "Oct", role: "Project Manager" },
  { username: 'Uma Baker', email: 'uma.baker@example.com', phone: '+1234567836', location: 'Mobile, USA', profileImage: 'https://via.placeholder.com/50', batch: "Nov", role: "Frontend Developer" },
  { username: 'Vera Long', email: 'vera.long@example.com', phone: '+1234567837', location: 'Akron, USA', profileImage: 'https://via.placeholder.com/50', batch: "Dec", role: "Backend Developer" },
  { username: 'William Harris', email: 'william.harris@example.com', phone: '+1234567838', location: 'Shreveport, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jan", role: ".NET Developer" },
  { username: 'Xena Foster', email: 'xena.foster@example.com', phone: '+1234567839', location: 'Lafayette, USA', profileImage: 'https://via.placeholder.com/50', batch: "Feb", role: "UI/UX Designer" },
  { username: 'Yasmine Collins', email: 'yasmine.collins@example.com', phone: '+1234567840', location: 'Peoria, USA', profileImage: 'https://via.placeholder.com/50', batch: "Mar", role: "QA Engineer" },
  { username: 'Zane Murphy', email: 'zane.murphy@example.com', phone: '+1234567841', location: 'Cedar Rapids, USA', profileImage: 'https://via.placeholder.com/50', batch: "Apr", role: "Product Manager" },
  { username: 'Alex Garcia', email: 'alex.garcia@example.com', phone: '+1234567842', location: 'Reno, USA', profileImage: 'https://via.placeholder.com/50', batch: "May", role: "DevOps Engineer" },
  { username: 'Blake Wright', email: 'blake.wright@example.com', phone: '+1234567843', location: 'Springfield, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jun", role: "Technical Lead" },
  { username: 'Carla Scott', email: 'carla.scott@example.com', phone: '+1234567844', location: 'Salt Lake City, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jul", role: "Project Manager" },
  { username: 'Derek King', email: 'derek.king@example.com', phone: '+1234567845', location: 'Eugene, USA', profileImage: 'https://via.placeholder.com/50', batch: "Aug", role: "Frontend Developer" },
  { username: 'Ella Stewart', email: 'ella.stewart@example.com', phone: '+1234567846', location: 'Huntsville, USA', profileImage: 'https://via.placeholder.com/50', batch: "Sep", role: "Backend Developer" },
  { username: 'Frankie Allen', email: 'frankie.allen@example.com', phone: '+1234567847', location: 'College Station, USA', profileImage: 'https://via.placeholder.com/50', batch: "Oct", role: ".NET Developer" },
  { username: 'Gordon Webb', email: 'gordon.webb@example.com', phone: '+1234567848', location: 'Gainesville, USA', profileImage: 'https://via.placeholder.com/50', batch: "Nov", role: "UI/UX Designer" },
  { username: 'Holly Lane', email: 'holly.lane@example.com', phone: '+1234567849', location: 'Naperville, USA', profileImage: 'https://via.placeholder.com/50', batch: "Dec", role: "QA Engineer" },
  { username: 'Ian Reynolds', email: 'ian.reynolds@example.com', phone: '+1234567850', location: 'Chattanooga, USA', profileImage: 'https://via.placeholder.com/50', batch: "Jan", role: "Product Manager" },
];


const fuseOptions = {
  keys: ['username', 'email', 'phone', 'location', 'batch', 'role'],
  includeScore: true,
  threshold: 0.2 // Adjust for fuzzy matching
};

const Home = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Debounced search handler
  const handleSearch = debounce((event) => {
    setSearchTerm(event.target.value);
  }, 300);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => {
    const isAscending = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    handleClose();
  };

  const handleDelete = (username) => {
    console.log('Delete user:', username);
  };

  // Create a Fuse instance for fuzzy searching
  const fuse = new Fuse(rows, fuseOptions);
  
  // Filtering rows based on searchTerm using Fuse.js
  const filteredRows = searchTerm
    ? fuse.search(searchTerm).map(result => result.item)
    : rows;

  // Sorting filtered rows
  const sortedRows = filteredRows.sort((a, b) => {
    if (orderDirection === 'asc') {
      return normalize(a[orderBy]).localeCompare(normalize(b[orderBy]));
    }
    return normalize(b[orderBy]).localeCompare(normalize(a[orderBy]));
  });

  // Paginate sorted rows
  const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div style={{ maxWidth: '80vw', margin: 'auto', overflow: 'hidden', backgroundColor: '#f5f5f5', padding: '20px', color: '#333', borderRadius: '8px', width: '90%' }}>

      <TableContainer component={Paper} style={{ maxHeight: '70vh', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: '#757575' }} />
                </InputAdornment>
              ),
              style: { color: '#333', borderColor: '#ddd' },
            }}
            style={{ marginBottom: '10px', backgroundColor: '#fafafa', borderRadius: '4px', width: '300px' }}
          />
          <Button onClick={handleClickOpen} variant="contained" style={{ backgroundColor: '#1976d2', color: '#fff', height: '40px' }}>
            Add User
          </Button>
        </div>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'username'}
                  direction={orderDirection}
                  onClick={() => handleSort('username')}
                  style={{ color: '#333' }}
                >
                  Profile
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'username'}
                  direction={orderDirection}
                  onClick={() => handleSort('username')}
                  style={{ color: '#333' }}
                >
                  Username & Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'phone'}
                  direction={orderDirection}
                  onClick={() => handleSort('phone')}
                  style={{ color: '#333' }}
                >
                  Mobile Number
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'location'}
                  direction={orderDirection}
                  onClick={() => handleSort('location')}
                  style={{ color: '#333' }}
                >
                  Location
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'batch'}
                  direction={orderDirection}
                  onClick={() => handleSort('batch')}
                  style={{ color: '#333' }}
                >
                  Batch
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'role'}
                  direction={orderDirection}
                  onClick={() => handleSort('role')}
                  style={{ color: '#333' }}
                >
                  Role
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ color: '#333' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.username} hover>
                <TableCell>
                  <Avatar alt={row.username} src={row.profileImage} />
                </TableCell>
                <TableCell>
                  <div>{row.username}</div>
                  <div style={{ color: '#888' }}>{row.email}</div>
                </TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.batch}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(row.username)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new user, please enter the email and password below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const normalize = (value) => (value ? value.toString().toLowerCase() : '');

export default Home;
