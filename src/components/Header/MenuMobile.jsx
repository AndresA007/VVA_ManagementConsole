import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    fontSize: "4rem",
    color: "#a0a5a9"
  },
  drawer: {
    width: "50%"
  },
  listItemText: {
    fontSize: "3rem",
    padding: "5% 10%"
  }
}));

function MenuMobile() {
  const [menuDisplayed, setMenuDisplayed] = React.useState(false);

  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setMenuDisplayed(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text} >
            <ListItemText primary={text} classes={{primary: classes.listItemText}} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} classes={{primary: classes.listItemText}} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key="MobileMenu">
        <Button onClick={toggleDrawer(true)} >
          <MenuIcon classes={{root: classes.menuButton}} />
        </Button>
        <Drawer anchor="right" open={menuDisplayed}
          onClose={toggleDrawer(false)}
          classes={{paperAnchorRight: classes.drawer}} >
            {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default MenuMobile;
