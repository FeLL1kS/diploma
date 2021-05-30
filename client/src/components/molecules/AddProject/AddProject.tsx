import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { observer } from 'mobx-react';
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import Form from '../Form';
import { ProjectCreationAttributes } from 'diploma';
import { useStore } from '../../../helpers/useStore';
import { AuthenticationContext } from '../../../stores/Authentication';
import { ProjectsContext } from '../../../stores/Projects';
import { useForm } from '../../../helpers/useForm';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    float: 'right'
  },
}));

interface IProjectCreationErrors {
  title: string;
  description: string;
  customer: string;
  dateBegin: string;
  dateEnd: string;
  controlPoints: string;
  result: string;
  managerId: string;
}

const initialErrorValues: IProjectCreationErrors = {
  title: '',
  description: '',
  customer: '',
  dateBegin: '',
  dateEnd: '',
  controlPoints: '',
  result: '',
  managerId: '',
};

const AddProject = observer(
  (): JSX.Element => {
    const classes = useStyles();

    const { userData } = useStore(AuthenticationContext);
    const { createProject } = useStore(ProjectsContext);

    const initialFormValues: ProjectCreationAttributes = {
      title: '',
      description: '',
      customer: '',
      dateBegin: new Date(),
      dateEnd: new Date(),
      controlPoints: '',
      result: '',
      managerId: userData ? userData.id : '',
    };

    const validate = (): boolean => {
      const fieldValues: ProjectCreationAttributes = values;

      let temp = { ...errors };

      temp.title = fieldValues.title ? '' : 'Это поле обязательно к заполнению';
      temp.description = fieldValues.description ? '' : 'Это поле обязательно к заполнению';
      temp.customer = fieldValues.customer ? '' : 'Это поле обязательно к заполнению';
      temp.controlPoints = fieldValues.controlPoints ? '' : 'Это поле обязательно к заполнению';
      temp.dateBegin = fieldValues.dateBegin ? '' : 'Это поле обязательно к заполнению';
      if (fieldValues.dateEnd < fieldValues.dateBegin) {
        temp.dateBegin = 'Дата начала не может быть позже даты окончания';
      }
      temp.dateEnd = fieldValues.dateEnd ? '' : 'Это поле обязательно к заполнению';
      if (fieldValues.dateEnd < fieldValues.dateBegin) {
        temp.dateEnd = 'Дата окончания не может быть раньше даты начала';
      }

      setErrors({
        ...temp
      })

      if (fieldValues === values) {
        return Object.values(temp).every(x => x === '');
      }

      return false;
    }

    const {
      values,
      errors,
      setErrors,
      handleInputChange,
      resetForm
    } = useForm({
        initialFormValues, 
        initialErrorValues, 
        validate,
      });

    const onSubmit = (event: React.SyntheticEvent) => {
      event.preventDefault();

      if (validate()) {
        createProject(values);
      }
    }

    return (
      <Container>
        <Form onSubmit={onSubmit}>
          <Grid container>
            <TextField 
              variant='outlined'
              name='title'
              label='Название проекта *'
              value={values.title}
              onChange={handleInputChange}
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField 
              variant='outlined'
              name='description'
              label='Описание проекта *'
              value={values.description}
              onChange={handleInputChange}
              error={!!errors.description}
              helperText={errors.description}
            />
            <TextField 
              variant='outlined'
              name='customer'
              label='Заказчик *'
              value={values.customer}
              onChange={handleInputChange}
              error={!!errors.customer}
              helperText={errors.customer}
            />
            <TextField
              variant='outlined'
              name='dateBegin'
              label='День начала *'
              type='date'
              value={values.dateBegin}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              error={!!errors.dateBegin}
              helperText={errors.dateBegin}
            />
            <TextField
              variant='outlined'
              name='dateEnd'
              label='День окончания *'
              type='date'
              value={values.dateEnd}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              error={!!errors.dateEnd}
              helperText={errors.dateEnd}
            />
            <TextField 
              variant='outlined'
              name='controlPoints'
              label='Контрольные точки *'
              value={values.controlPoints}
              onChange={handleInputChange}
              error={!!errors.controlPoints}
              helperText={errors.controlPoints}
            />
            <div className={classes.submit}>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                style={{marginRight: '16px'}}
              >
              Submit
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={resetForm}
            >
              Reset
            </Button>
          </div>
          </Grid>
        </Form>
      </Container>
    );
  }
);

export default AddProject;
