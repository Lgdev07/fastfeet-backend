import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(1),
      street: Yup.string().min(1),
      number: Yup.string().min(1),
      complement: Yup.string(),
      state: Yup.string().min(1),
      city: Yup.string().min(1),
      zip_code: Yup.string().min(1),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation not valid' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.json({ error: 'Not recipient found' });
    }

    await recipient.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipentController();
