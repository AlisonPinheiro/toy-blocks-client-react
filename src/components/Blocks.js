import React from 'react';
import PropTypes from 'prop-types';
import colors from '../constants/colors';
import { CircularProgress, makeStyles } from "@material-ui/core";

const Blocks = ({ blocks }) => {
  const classes = useStyles();

  if (blocks.loading) {
    return (
      <CircularProgress />
    )
  }

  if (blocks.error) {
    return (
      <>
        <div className={classes.error}>{blocks.error}</div>
      </>
    )
  }
  return (
    <>
      <div className={classes.blockList}>
        {blocks.data && blocks.data.map(({ id, attributes }) => (
          <div className={classes.blockItem} >
            <span className={classes.title}>{id.padStart(3, '0')}</span>
            <p className={classes.description}>{attributes.data}</p>
          </div>
        )
        )}
      </div>
    </>
  )
}

const useStyles = makeStyles((theme) => ({

  blockList: {
    display:'block',
    width: '100%',
  },
  blockItem: {
    backgroundColor: '#E0E0E0',
    padding: '8px 8px 4px 8px',
    marginBottom: '4px',
    transition: '0.3s',
  },
  title:{
    display: 'block',
    color: '#304FFE',
    fontSize: theme.typography.pxToRem(10),
    fontWeight: '700',
    letterSpacing: '1.5px',
    margin: '0',
  },
  description:{
    display: 'block',
    color: colors.text,
    fontSize: theme.typography.pxToRem(14),
    lineHeight: theme.typography.pxToRem(18),
    letterSpacing: '0.25px',
    margin: 0,
  },
  error:{
    color: colors.text,
    fontSize: theme.typography.pxToRem(14),
  }

}));

Blocks.propTypes = {
  blocks: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.string,
    data: PropTypes.array
  })
}

export default Blocks;
