import { Request, Response } from 'express';
import User from './../schemas/user';

export class UserRoutes {
  public routes(app) {
    app.post('/user/update', async (req: Request, res: Response) => {
      const { user } = await req.body;
      const { id, phone } = await user;
      try {
        const user = await User.findById(id);
        user.set('phone', phone);
        user.save();
        console.log({user});
        res.json(user);
      } catch(error) {
        console.error(error);
        res.json(error);
      }
    })
  }
}

export default UserRoutes;