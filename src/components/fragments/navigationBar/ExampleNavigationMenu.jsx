import * as React from 'react';
import { Popper } from '@mui/base/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Chip from '@mui/joy/Chip';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import HomeRounded from '@mui/icons-material/HomeRounded';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Person from '@mui/icons-material/Person';
import Apps from '@mui/icons-material/Apps';
import FactCheck from '@mui/icons-material/FactCheck';
import BookmarkAdd from '@mui/icons-material/BookmarkAdd';
import { useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from "react-router-dom";



function ModeToggle() {
  const { mode, setMode } = useColorScheme();


  // necessary for server-side rendering
  // because mode is undefined on the server
  
  return (
    <div>
      <Sheet sx={{
        display:'flex',
        alignContent:'center',
        justifyContent: 'space-between',
        backgroundColor : "transparent",
      }}>

      <Switch
      sx={
        {
          my:1.5,
          mx:2,
        }
      }
        color="primary"
        size="lg"
        variant="outlined"
        
        onChange={()=>{
          setMode(mode === 'light' ? 'dark' : 'light');
        }}>

      {mode === 'light' ? 'Turn dark' : 'Turn light'}
      </Switch>
      </Sheet>

  </div>

  );
}

const useRovingIndex = (options) => {
  const {
    initialActiveIndex = 0,
    vertical = false,
    handlers = {
      onKeyDown: () => {},
    },
  } = options || {};
  const [activeIndex, setActiveIndex] = React.useState(initialActiveIndex);
  const targetRefs = React.useRef([]);
  const targets = targetRefs.current;
  const focusNext = () => {
    let newIndex = activeIndex + 1;
    if (newIndex >= targets.length) {
      newIndex = 0;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };
  const focusPrevious = () => {
    let newIndex = activeIndex - 1;
    if (newIndex < 0) {
      newIndex = targets.length - 1;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };
  const getTargetProps = (index) => ({
    ref: (ref) => {
      if (ref) {
        targets[index] = ref;
      }
    },
    tabIndex: activeIndex === index ? 0 : -1,
    onKeyDown: (e) => {
      if (Number.isInteger(activeIndex)) {
        if (e.key === (vertical ? 'ArrowDown' : 'ArrowRight')) {
          focusNext();
        }
        if (e.key === (vertical ? 'ArrowUp' : 'ArrowLeft')) {
          focusPrevious();
        }
        handlers.onKeyDown?.(e, { setActiveIndex });
      }
    },
    onClick: () => {
      setActiveIndex(index);
    },
  });
  return {
    activeIndex,
    setActiveIndex,
    targets,
    getTargetProps,
    focusNext,
    focusPrevious,
  };
};

const AboutMenu = React.forwardRef(({ focusNext, focusPrevious, ...props }, ref) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { targets, setActiveIndex, getTargetProps } = useRovingIndex({
    initialActiveIndex: null,
    vertical: true,
    handlers: {
      onKeyDown: (event, fns) => {
        if (event.key.match(/(ArrowDown|ArrowUp|ArrowLeft|ArrowRight)/)) {
          event.preventDefault();
        }
        if (event.key === 'Tab') {
          setAnchorEl(null);
          fns.setActiveIndex(null);
        }
        if (event.key === 'ArrowLeft') {
          setAnchorEl(null);
          focusPrevious();
        }
        if (event.key === 'ArrowRight') {
          setAnchorEl(null);
          focusNext();
        }
      },
    },
  });

  const open = Boolean(anchorEl);
  const id = open ? 'about-popper' : undefined;
  const navigate = useNavigate();


  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <div onMouseLeave={() => setAnchorEl(null)}>
        <ListItemButton
          aria-haspopup
          aria-expanded={open ? 'true' : 'false'}
          ref={ref}
          {...props}
          role="menuitem"
          onKeyDown={(event) => {
            props.onKeyDown?.(event);
            if (event.key.match(/(ArrowLeft|ArrowRight|Tab)/)) {
              setAnchorEl(null);
            }
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              targets[0]?.focus();
              setActiveIndex(0);
            }
          }}
          onFocus={(event) => setAnchorEl(event.currentTarget)}
          onMouseEnter={(event) => {
            props.onMouseEnter?.(event);
            setAnchorEl(event.currentTarget);
          }}
          sx={(theme) => ({
            ...(open && theme.variants.plainHover.neutral),
          })}
        >
          Gerer <KeyboardArrowDown />
        </ListItemButton>
        <Popper id={id} open={open} anchorEl={anchorEl} disablePortal keepMounted>
          <List
            role="menu"
            aria-label="Gerer"
            variant="outlined"
            sx={{
              boxShadow: 'md',
              borderRadius: 'sm',
              '--List-radius': '8px',
              '--List-padding': '4px',
              '--ListDivider-gap': '4px',
              '--ListItemDecorator-size': '32px',
            }}
          >
            <ListItem role="none">
              <ListItemButton onClick={()=>(navigate('/GestionClient'))} role="menuitem" {...getTargetProps(0)}>
                <ListItemDecorator>
                <Person />
                </ListItemDecorator>
                Clients
              </ListItemButton>
            </ListItem>
            
            <ListItem role="none">
              <ListItemButton role="menuitem" {...getTargetProps(1)}>
                <ListItemDecorator>
                <FactCheck />
                </ListItemDecorator>
                Commandes
              </ListItemButton>
            </ListItem>

            <ListItem role="none">
              <ListItemButton role="menuitem" {...getTargetProps(2)}>
                <ListItemDecorator>
                  <Apps />
                </ListItemDecorator>
                Produits
              </ListItemButton>
            </ListItem>
            
            <ListItem role="none">
              <ListItemButton role="menuitem" {...getTargetProps(2)}>
                <ListItemDecorator>
                  <CategoryIcon />
                </ListItemDecorator>
                Categories
              </ListItemButton>
            </ListItem>
          </List>
        </Popper>
      </div>
    </ClickAwayListener>
  );
});

const AdmissionsMenu = React.forwardRef(
  ({ focusNext, focusPrevious, ...props }, ref) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { targets, setActiveIndex, getTargetProps } = useRovingIndex({
      initialActiveIndex: null,
      vertical: true,
      handlers: {
        onKeyDown: (event, fns) => {
          if (event.key.match(/(ArrowDown|ArrowUp|ArrowLeft|ArrowRight)/)) {
            event.preventDefault();
          }
          if (event.key === 'Tab') {
            setAnchorEl(null);
            fns.setActiveIndex(null);
          }
          if (event.key === 'ArrowLeft') {
            setAnchorEl(null);
            focusPrevious();
          }
          if (event.key === 'ArrowRight') {
            setAnchorEl(null);
            focusNext();
          }
        },
      },
    });

    const open = Boolean(anchorEl);
    const id = open ? 'admissions-popper' : undefined;
    return (
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <div onMouseLeave={() => setAnchorEl(null)}>
          <ListItemButton
            aria-haspopup
            aria-expanded={open ? 'true' : 'false'}
            ref={ref}
            {...props}
            role="menuitem"
            onKeyDown={(event) => {
              props.onKeyDown?.(event);
              if (event.key.match(/(ArrowLeft|ArrowRight|Tab)/)) {
                setAnchorEl(null);
              }
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                targets[0]?.focus();
                setActiveIndex(0);
              }
            }}
            onFocus={(event) => setAnchorEl(event.currentTarget)}
            onMouseEnter={(event) => {
              props.onMouseEnter?.(event);
              setAnchorEl(event.currentTarget);
            }}
            sx={(theme) => ({
              ...(open && theme.variants.plainHover.neutral),
            })}
          >
            Admissions <KeyboardArrowDown />
          </ListItemButton>
          <Popper id={id} open={open} anchorEl={anchorEl} disablePortal keepMounted>
            <List
              role="menu"
              aria-label="About"
              variant="outlined"
              sx={{
                my: 2,
                boxShadow: 'md',
                borderRadius: 'sm',
                minWidth: 180,
                '--List-radius': '8px',
                '--List-padding': '4px',
                '--ListDivider-gap': '4px',
              }}
            >
              <ListItem role="none">
                <ListItemButton role="menuitem" {...getTargetProps(0)}>
                  <ListItemContent>Apply</ListItemContent>
                  <Chip size="sm" variant="soft" color="danger">
                    Last 2 days!
                  </Chip>
                </ListItemButton>
              </ListItem>
              <ListDivider />
              <ListItem role="none">
                <ListItemButton role="menuitem" {...getTargetProps(1)}>
                  Visit
                </ListItemButton>
              </ListItem>
              <ListItem
                role="none"
                endAction={
                  <IconButton variant="outlined" color="neutral" size="sm">
                    <BookmarkAdd />
                  </IconButton>
                }
              >
                <ListItemButton role="menuitem" {...getTargetProps(2)}>
                  Photo tour
                </ListItemButton>
              </ListItem>
            </List>
          </Popper>
        </div>
      </ClickAwayListener>
    );
  },
);

export default function ExampleNavigationMenu() {
  const { targets, getTargetProps, setActiveIndex, focusNext, focusPrevious } =
    useRovingIndex();
  return (
    
    <Box >
      <List
        role="menubar"
        orientation="horizontal"
        sx={{
          '--List-radius': '8px',
          '--List-padding': '4px',
          '--List-gap': '8px',
          '--ListItem-gap': '0px',
        }}
      >
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            {...getTargetProps(0)}
            component="a"
            href="#navigation-menu"
          >
            <ListItemDecorator>
              <HomeRounded />
            </ListItemDecorator>
            Home
          </ListItemButton>
        </ListItem>
        <ListItem role="none">
          <AboutMenu
            onMouseEnter={() => {
              setActiveIndex(1);
              targets[1].focus();
            }}
            focusNext={focusNext}
            focusPrevious={focusPrevious}
            {...getTargetProps(1)}
          />
        </ListItem>
        <ListItem role="none">
          <AdmissionsMenu
            onMouseEnter={() => {
              setActiveIndex(2);
              targets[2].focus();
            }}
            focusNext={focusNext}
            focusPrevious={focusPrevious}
            {...getTargetProps(2)}
          />
        </ListItem>
        <ListItem>
        <ModeToggle />
        </ListItem>
      </List>
    </Box>
  );
}
