import { ProjectAttributes, ProjectCreationAttributes } from 'diploma';
import express, { Router } from 'express';
import {
  check,
  Result,
  ValidationError,
  validationResult,
} from 'express-validator';
import ProjectController from '../controllers/project.controller';
import authMiddleware from '../middlewares/auth.middleware';

const projectsRouter = Router();

projectsRouter.get(
  '/',
  async (req: express.Request, res: express.Response) => {
    try {
      const projects: ProjectAttributes[] = await ProjectController.GetAll();

      return res.json(projects);
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

      res.json({
        message: 'Project was found',
        project,
      });
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

      res.json({
        message: 'Project was created',
        project,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  },
);

projectsRouter.put(
  '/',
  [
    authMiddleware,
    check('id', 'Id must be UUID').isUUID(),
    check('manager', 'Manager Id must be UUID').isUUID(),
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
