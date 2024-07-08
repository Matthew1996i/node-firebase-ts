import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserUseCase } from "./UserUseCase";

class UserController {
  async handleCreate(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const userUseCase = container.resolve(UserUseCase);

    try {
      const newUser = await userUseCase.create({ ...data });

      return response.status(201).send({ id: newUser });
    } catch (error) {
      console.error(error);
      return response.status(500).send({ error });
    }
  }

  async handleUpdate(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { id: userId } = request.user;
    const userUseCase = container.resolve(UserUseCase);

    try {
      await userUseCase.update({ ...data, updated_by: userId });

      return response.status(201).send();
    } catch (error) {
      console.error(error);
      return response.status(500).send({ error });
    }
  }

  async handleUpdatePassword(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const data = request.body;
      const { id: userId } = request.user;
      const userUseCase = container.resolve(UserUseCase);

      await userUseCase.updatePassword({ ...data, updated_by: userId });

      return response.status(201).send();
    } catch (error) {
      console.error(error);
      return response.status(500).send({ error });
    }
  }

  async handleUpdateStatus(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const data = request.body;
      const { id: userId } = request.user;
      const userUseCase = container.resolve(UserUseCase);

      await userUseCase.updateStatus({ ...data, updated_by: userId });

      return response.status(201).send();
    } catch (error) {
      console.error(error);
      return response.status(500).send({ error });
    }
  }

  async handleFind(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const userUseCase = container.resolve(UserUseCase);

      const user = await userUseCase.find(Number(id));

      return response.status(201).send(user);
    } catch (error) {
      console.error(error);
      return response.status(500).send({ error });
    }
  }

  async handleList(request: Request, response: Response): Promise<Response> {
    try {
      const filters = {
        name: (request.query.name as string) ?? null,
        email: (request.query.email as string) ?? null,
        active: String(request.query.active) === "true",
      };

      const userUseCase = container.resolve(UserUseCase);

      const users = await userUseCase.list(filters);

      return response.status(201).send(users);
    } catch (error) {
      console.error(error);
      return response.status(500).send({ error });
    }
  }
}

export { UserController };
