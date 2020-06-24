import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function ImageAvatars() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1485735662814-c4f66e49dbae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" className={classes.large} />
    </div>
  )
}
