import React from 'react';
import ParticipantList from '../ParticipantList/ParticipantList';
import { styled } from '@material-ui/core/styles';
import MainParticipant from '../MainParticipant/MainParticipant';
import { makeStyles, Typography, Theme, Grid } from '@material-ui/core';
import RecordingLogo from './RecordingLogo';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

const Container = styled('div')(({ theme }) => {
  const totalMobileSidebarHeight = `${theme.sidebarMobileHeight +
    theme.sidebarMobilePadding * 2 +
    theme.participantBorderWidth}px`;

  return {
    position: 'relative',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: `1fr ${theme.sidebarWidth}px`,
    gridTemplateRows: '100%',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: `100%`,
      gridTemplateRows: `calc(100% - ${totalMobileSidebarHeight}) ${totalMobileSidebarHeight}`,
    },
  };
});

const useStyles = makeStyles((theme: Theme) => ({
  recordingIcon: {
    padding: '2px',
    backgroundColor: '#fffc',
    height: '33px',
  },
  recordingText: {
    padding: '0 2px',
    backgroundColor: '#fffc',
    height: '33px',
  },
  recordingTextContainter: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
}));

export default function Room() {
  const classes = useStyles();
  const { isRecording } = useVideoContext();

  return (
    <Container>
      {isRecording && (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.recordingTextContainter}
        >
          <Grid item className={classes.recordingIcon}>
            <RecordingLogo />
          </Grid>
          <Grid item className={classes.recordingText}>
            <Typography variant="h5">Recording...</Typography>
          </Grid>
        </Grid>
      )}
      <MainParticipant />
      <ParticipantList />
    </Container>
  );
}
