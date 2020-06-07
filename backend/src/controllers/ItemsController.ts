import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
  async indexAsync(request: Request, response: Response) {
    const items = await knex('items').select('*');
  
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3334/uploads/${item.image}`
      }
    });
    return response.json(serializedItems);
  }
}

export default ItemsController;