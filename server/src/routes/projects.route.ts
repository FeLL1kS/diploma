import {
  ProjectAttributes, ProjectCreationAttributes, ProjectUserAttributes, UserAttributes,
} from 'diploma';
import express, { Router } from 'express';
import {
  check,
  Result,
  ValidationError,
  validationResult,
} from 'express-validator';
import ProjectController from '../controllers/project.controller';
import projectuserController from '../controllers/projectuser.controller';
import UserController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

interface ProjectResponse {
  id: string;
  title: string;
  description: string;
  customer: string;
  dateBegin: Date;
  dateEnd: Date;
  controlPoints: string;
  result: string;
  manager: UserAttributes;
  team: (UserAttributes | undefined)[];
}

const projectsRouter = Router();

const getProjectResponse = async (project: ProjectAttributes): Promise<ProjectResponse | null> => {
  const manager: UserAttributes | null = await UserController.GetByCondition({
    where: {
      id: project.manager,
    },
  });

  if (manager === null) {
    return null;
  }

  const projectsUsers: ProjectUserAttributes[] | null = await projectuserController.GetByCondition(
    {
      where: {
        projectId: project.id,
      },
    },
  );

  let team: (UserAttributes | undefined)[] = [];

  if (projectsUsers !== null) {
    team = await Promise.all(projectsUsers.map(async (projectUser: ProjectUserAttributes) => {
      const user: UserAttributes | null = await UserController.GetByCondition({
        where: {
          id: projectUser.userId,
        },
      });

      if (user !== null) {
        return user;
      }
    }));
  }

  const p: ProjectResponse = {
    id: project.id,
    title: project.title,
    description: project.description,
    customer: project.customer,
    dateBegin: project.dateBegin,
    dateEnd: project.dateEnd,
    controlPoints: project.controlPoints,
    result: project.result,
    manager,
    team,
  };

  return p;
};

projectsRouter.get(
  '/',
  async (req: express.Request, res: express.Response) => {
    try {
      const projects: ProjectAttributes[] = await ProjectController.GetAll();

      const resultProjects: (ProjectResponse | null)[] = await Promise.all(
        projects.map(async (project: ProjectAttributes) => {
          const p: ProjectResponse | null = await getProjectResponse(project);

          return p;
        }),
      );

      return res.json(resultProjects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },
);

projectsRouter.get(
  '/:id',
  async (
    req: express.Request<{ id: string }>,
    res: express.Response,
  ) => {
    try {
      const { id } = req.params;

      const project: ProjectAttributes | null = await ProjectController.GetByCondition({
        where: {
          id,
        },
      });

      if (project === null) {
        res.json({
          message: `Project with id ${id} not found`,
        });
      }

      const result: ProjectResponse | null = await getProjectResponse(project!); 

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },
);

projectsRouter.post(
  '/',
  [
    authMiddleware,
    check('manager', 'Manager Id must be UUID').isUUID(),
    check('customer', 'Customer must be longer than 1 character').isLength({ min: 1 }),
    check('title', 'Title must be longer than 1 character').isLength({ min: 1 }),
    check('controlPoints', 'Control Points must be longer than 1 character').isLength({ min: 1 }),
    check('description', 'Description must be longer than 1 character').isLength({
      min: 1,
    }),
    check('dateBegin', 'Date begin must be date').isDate(),
    check('dateEnd', 'Date end must be date').isDate(),
  ],
  async (req: express.Request, res: express.Response) => {
    try {
      const errors: Result<ValidationError> = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Incorrect request', ...errors });
      }

      const data: ProjectCreationAttributes = req.body;

      const project: ProjectAttributes = await ProjectController.Create(data);

      const result: ProjectResponse | null = await getProjectResponse(project);

      res.json({
        message: 'Project was created',
        project: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },
);

projectsRouter.post(
  `/addUser`,
  [
    authMiddleware,
    check('projectId', 'projectId must be UUID').isUUID(),
  ],
  async (req: express.Request, res: express.Response) => {
    try {
      const errors: Result<ValidationError> = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Incorrect request', ...errors });
      }

      const { projectId } = req.body;

      const user: UserAttributes | null = await UserController.GetByCondition({
        where: {
          id: req.body.user.id,
        },
      });

      if (!user) {
        return res
          .status(400)
          .json({ message: 'User not found' });
      }

      const projectUser: ProjectUserAttributes[] | null = await projectuserController.GetByCondition({
        where: {
          projectId: projectId,
          userId: user.id
        }
      })

      if (projectUser) {
        return res
        .status(400)
        .json({ message: 'A user has already been assigned to this project' });
      }

      projectuserController.Create({
        projectId,
        userId: user.id,
      })

      return res.json(user);
    } catch (error) {
      console.error(error);
    }
  }
)

projectsRouter.put(
  '/',
  [
    authMiddleware,
    check('id', 'Id must be UUID').isUUID(),
    check('manager', 'Manager Id must be UUID').isUUID(),
    check('customer', 'Customer must be longer than 1 character').isLength({ min: 1 }),
    check('title', 'Title must be longer than 1 character').isLength({ min: 1 }),
    check('controlPoints', 'Control Points must be longer than 1 character').isLength({ min: 1 }),
    check('description', 'Description must be longer than 1 character').isLength({
      min: 1,
    }),
    check('dateBegin', 'Date begin must be date').isDate(),
    check('dateEnd', 'Date end must be date').isDate(),
  ],
  async (req: express.Request, res: express.Response) => {
    try {
      const errors: Result<ValidationError> = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Incorrect request', ...errors });
      }

      const data: ProjectCreationAttributes = req.body;

      const project: ProjectAttributes | null = await ProjectController.Update(data);

      if (project === null) {
        res.json({
          message: 'Something went wrong',
        });
      }

      res.json({
        message: 'Project was updated',
        project,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },
);

projectsRouter.delete(
  '/:id',
  authMiddleware,
  async (
    req: express.Request<{ id: string }>,
    res: express.Response,
  ) => {
    try {
      const { id } = req.params;

      const result: boolean = await ProjectController.DeleteById(id);

      if (!result) {
        res.json({
          message: `Project with id ${id} not found`,
        });
      }

      res.json({
        message: 'Project was deleted',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },
);

export default projectsRouter;
