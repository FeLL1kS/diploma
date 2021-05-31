import React from 'react'
import { makeStyles, Table, TableBody, TableCell as MuiTableCell, TableContainer, TableHead, TableRow, withStyles, Theme, createStyles, Button, Typography, Dialog, DialogTitle } from '@material-ui/core'
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../helpers/useStore';
import { ProjectsContext } from '../../../stores/Projects';
import { Link } from 'react-router-dom';
import { UserAttributes } from 'diploma';
import { AuthenticationContext } from '../../../stores/Authentication';
import AddProject from './AddProject';
import { useSnackbar } from 'notistack';

const TableCell = withStyles((theme: Theme) => 
  createStyles({
    head: {
      border: 'none',
    },
    body: {
      border: 'solid 1px #e0e0e0',
      padding: `${theme.spacing(6)}px 0`,
    }
  }),
)(MuiTableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    borderSpacing: '0 20px !important',
    borderCollapse: 'separate',
  },
  tableRow: {
    textDecoration: 'none',
  },
  addButton: {
    color: 'white',
    textDecoration: 'none'
  }
});

const Projects = observer(() => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  
  const { projects, getErrorMessage } = useStore(ProjectsContext);
  const { isUserAuthorized } = useStore(AuthenticationContext);

  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const onFormSubmit = async (event: React.SyntheticEvent) => {
    handleClose();
  }

  const errorMessage: string | null = getErrorMessage();
  if (errorMessage) {
    enqueueSnackbar(`Ошибка: ${errorMessage}`, { variant: 'error' });
  }

  return (
    <div>
      {isUserAuthorized &&
        <div style={{float: 'right'}}>
          <Button
            variant="contained" 
            color="primary"
            type="submit"
            onClick={handleClickOpen}
          >
            <Typography>
              Добавить проект
            </Typography>
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              Добавить проект
            </DialogTitle>
            <AddProject onSubmit={onFormSubmit} />
          </Dialog>
        </div>
      }
      <TableContainer>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">№</TableCell>
              <TableCell align="center">Название проекта</TableCell>
              <TableCell align="center">Заказчик</TableCell>
              <TableCell align="center">Руководитель</TableCell>
              <TableCell align="center">Команда проекта</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects && projects.map((project, idx) => (
              <TableRow component={Link} to={project.id} key={project.id} className={classes.tableRow}>
                <TableCell align="center">{idx}</TableCell>
                <TableCell align="center">{project.title}</TableCell>
                <TableCell align="center">{project.customer}</TableCell>
                <TableCell align="center">{project.manager.firstName} {project.manager.lastName}</TableCell>
                <TableCell align="center">
                  <ul>
                    {project.team.map((user: UserAttributes) => {
                      return (
                        <li>{user.firstName} {user.lastName}</li>
                      )
                    })}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
})

export default Projects;