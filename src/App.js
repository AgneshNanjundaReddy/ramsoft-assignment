import React, {useState} from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, TextField } from '@mui/material';
import Board from './board';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { createStory } from './action';

function App() {

  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const handleCreate = () => {
    setOpenDialog(true);
  }
  const handleClose = () => {
    setOpenDialog(false);
  }

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" height="100vh" >
        <CssBaseline />
        <Paper elevation={3} square sx={{padding: '1rem'}}>
          <Grid container spacing={2}>
            <Grid item xs={9} >
              <Typography color="primary" align="center" variant="h3" component="h3">
                {'Board'}
              </Typography>
            </Grid>
            <Grid item xs={3}>
                <IconButton color="primary" aria-label="add" variant='outlined' onClick={handleCreate}>
                  <AddIcon />
                  {'CREATE STORY'}
                </IconButton>
            </Grid>
          </Grid>
        </Paper>
        <Box flex={1} overflow="auto" sx={{bgcolor: 'gray'}}>
          <Board/>
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData).entries());
            const name = formJson.name;
            console.log(name);
            dispatch(createStory({
              id: uuidv4(),
              name,
              status: 'new'
            }))
            handleClose();
          },
        }}
      >
        <DialogTitle>Create Story</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default App;
