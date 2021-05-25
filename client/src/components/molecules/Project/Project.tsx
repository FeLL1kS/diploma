import React from 'react'
import { Box, Button, Container, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import { ProjectContext } from '../../../stores/Project';
import { useStore } from '../../../helpers/useStore';
import { UserAttributes } from 'diploma';
import { AuthenticationContext } from '../../../stores/Authentication';

const useStyles = makeStyles((theme: Theme) => createStyles({
  header: {
    paddingBottom: theme.spacing(4),
  },
  paragraph: {
    paddingBottom: theme.spacing(2),
    fontSize: '1.4rem',
  },
  paper: {
    padding: theme.spacing(4)
  }
}));

const Project = observer(() => {
  const { project, addUserToProject } = useStore(ProjectContext);
  const { isUserAuthorized } = useStore(AuthenticationContext);

  const classes = useStyles();

  if (project === null) {
    return (
      <div>
        Проект не найден
      </div>
    )
  }

  const handleClick = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    addUserToProject();
  };

  return (
    <Container>
      <Typography className={classes.header} align='center' variant='h4'>
        {project.title}
      </Typography>
      <Typography className={classes.paragraph}>
        Заказчик: {project.customer}
      </Typography>
      <Typography className={classes.paragraph}>
        Руководитель: {project.manager.firstName} {project.manager.lastName}
      </Typography>
      <Typography className={classes.paragraph}>
        Команда:
        <ul>
          {project.team.map((user: UserAttributes) => {
            return (
              <li>{user.firstName} {user.lastName}</li>
            )
          })}
        </ul>
        {isUserAuthorized &&
          <Button
            onClick={handleClick}
            variant="contained" 
            color="primary"
            type="submit"
          >
            Записаться
          </Button>
        }
      </Typography>
      <Typography className={classes.paragraph}>
        Информация о проекте:
      </Typography>
      <Paper className={classes.paper}>
        <Typography className={classes.paragraph}>
          {project.description}
        </Typography>
      </Paper>
    </Container>
  )
})

export default Project;
