import { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Box,
  Button,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Popper,
  Radio,
  RadioGroup,
  styled,
} from '@mui/material';
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
  const [reactExp, setReactExp] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  useEffect(() => {
    getUsers(searchTerm, reactExp);
  }, [searchTerm, reactExp]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleReactExpChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReactExp(event.target.value);
  };

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
            onChange={handleSearchChange}
            sx={{
              width: '350px',
            }}
          />
        </div>
        <div>
          <IconButton aria-label='delete' size='large' onClick={handleClick}>
            <FilterAltIcon htmlColor='#fff' />
          </IconButton>
          <Popper id={id} open={open} anchorEl={anchorEl} transition placement='left-start'>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: '5px', minWidth: '200px' }}>
                  <FormControl>
                    <FormLabel id='demo-radio-buttons-group-label' sx={{ color: 'black !important' }}>
                      React Experience
                    </FormLabel>
                    <RadioGroup
                      value={reactExp}
                      onChange={handleReactExpChange}
                      aria-labelledby='demo-radio-buttons-group-label'
                      name='radio-buttons-group'
                    >
                      <FormControlLabel value='1-2' control={<Radio />} label='1-2 Years' />
                      <FormControlLabel value='3-5' control={<Radio />} label='3-5 Years' />
                      <FormControlLabel value='5-10' control={<Radio />} label='5-10 Years' />
                      <FormControlLabel value='>10' control={<Radio />} label='>10 Years' />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <Button
                    size='small'
                    sx={{ textDecoration: 'none', fontWeight: 'regular' }}
                    onClick={() => setReactExp('')}
                  >
                    Clear
                  </Button>
                </Box>
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
