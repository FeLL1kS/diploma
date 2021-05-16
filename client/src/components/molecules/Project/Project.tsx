import React from 'react'
import { Container, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import { ProjectContext } from '../../../stores/Project';
import { useStore } from '../../../helpers/useStore';
import { UserAttributes } from 'diploma';

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
  const { project } = useStore(ProjectContext);

  const classes = useStyles();

  if (project === null) {
    return (
      <div>
        Проект не найден
      </div>
    )
  }

  return (
    <Container>
      <Typography className={classes.header} align='center' variant='h4'>
        {project.title}
      </Typography>
      <Typography className={classes.paragraph}>
        Заказчик: {project.manager.firstName} {project.manager.lastName}
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
