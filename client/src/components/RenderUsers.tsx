import { useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { useStore } from 'store/Store';
import CustomTextField from 'helpers/CustomTextField';

const RenderUsers = () => {
  const {
    userContext: { users, removeUser, updateUser },
  } = useStore();
  const [selectedUser, setSelectedUser] = useState('');
  const [name, setName] = useState('');
  const [reactExperience, setReactExp] = useState('');

  const clearEditUser = () => {
    setName('');
    setReactExp('');
    setSelectedUser('');
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>React Experience</TableCell>
            <TableCell>Created On</TableCell>
            <TableCell>Updated On</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='user'>
                {selectedUser === user._id ? (
                  <CustomTextField
                    variant='standard'
                    placeholder='User Name'
                    size='small'
                    spellCheck='false'
                    type='text'
                    title=''
                    name='name'
                    value={name}
                    onChange={(value) => {
                      setName(value);
                    }}
                    sx={{
                      width: '100%',
                    }}
                  />
                ) : (
                  user.name
                )}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {selectedUser === user._id ? (
                  <CustomTextField
                    variant='standard'
                    placeholder='React Experience'
                    size='small'
                    spellCheck='false'
                    type='number'
                    title=''
                    name='name'
                    value={reactExperience}
                    onChange={(value) => {
                      setReactExp(value);
                    }}
                    sx={{
                      width: '100%',
                    }}
                  />
                ) : (
                  user.reactExperience
                )}
              </TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(user.updatedAt).toLocaleDateString()}</TableCell>
              <TableCell>
                {selectedUser === user._id ? (
                  <>
                    <ClearIcon htmlColor='#ff0000d6' sx={{ cursor: 'pointer' }} onClick={clearEditUser} /> &nbsp;
                    <CheckIcon
                      htmlColor='#25c2e3'
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        updateUser(user._id, name, reactExperience);
                        clearEditUser();
                      }}
                    />
                  </>
                ) : (
                  <>
                    <EditIcon
                      htmlColor='#25c2e3'
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedUser(user._id);
                        setName(user.name);
                        setReactExp(String(user.reactExperience));
                      }}
                    />{' '}
                    &nbsp;
                    <DeleteIcon onClick={() => removeUser(user._id)} htmlColor='#ff0000d6' sx={{ cursor: 'pointer' }} />
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RenderUsers;
