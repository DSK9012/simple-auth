import { useEffect, useState, MouseEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Fade, IconButton, InputAdornment, Popper, styled } from '@mui/material';
import CustomTextField from 'helpers/CustomTextField';
import { useStore } from 'store/Store';
import RenderUsers from './RenderUsers';

const $Container = styled('div')(({ theme }) => ({
  backgroundColor: 'rgb(255,255,255, 0.1)',
  backdropFilter: 'blur(50px)',
  border: '1px solid rgb(255,255,255, 0.6)',
  borderRightColor: 'rgb(255,255,255, 0.2)',
  borderBottomColor: 'rgb(255,255,255, 0.2)',
  borderRadius: '10px',
  margin: '8px auto',
}));

const PrivatePage = () => {
  const {
    userContext: { getUsers },
  } = useStore();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <CustomTextField
            placeholder='Search users'
            size='small'
            spellCheck='false'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon htmlColor='#47e7e7' fontSize='small' />
                </InputAdornment>
              ),
            }}
            type='text'
            title=''
            name='searchTerm'
            // value={email}
            onChange={() => {}}
            // error={hasError('email')}
            // helperText={getHelpText('email')}
            sx={{
              width: '350px',
            }}
          />
        </div>
        <div>
          <IconButton aria-label='delete' size='large' onClick={handleClick}>
            <FilterAltIcon htmlColor='#fff' />
          </IconButton>
          <Popper id={id} open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>The content of the Popper.</Box>
              </Fade>
            )}
          </Popper>
        </div>
      </div>
      <$Container>
        <RenderUsers />
      </$Container>
    </>
  );
};

export default PrivatePage;
