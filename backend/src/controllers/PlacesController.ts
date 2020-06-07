import { Request, Response } from 'express';
import knex from '../database/connection';

class PlacesController {
  async createAsync(request: Request, response: Response) {
    const {
      name,
      email,
      phone,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;
  
    const trx = await knex.transaction();
  
    const place = {
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      phone,
      latitude,
      longitude,
      city,
      uf
    };
    const placesIds = await trx('places').insert(place);

    const place_id = placesIds[0];
  
    const placeItems = items.map((item_id: number) => {
      return {
        item_id,
        place_id,
      }
    });

    await trx('places_items').insert(placeItems);
  
    await trx.commit();
    return response.json({ 
      id: place_id,
      ...place
     });
  }

  async showAsync(request: Request, response: Response) {
    const { id } = request.params;

    const place = await knex('places').where('id', id).first();

    const items = await knex('items')
      .join('places_items', 'items.id', '=', 'places_items.item_id')
      .where('places_items.place_id', id)
      .select('items.id', 'items.title');

    if (!place) {
      return response.status(400).json({
        message: 'Place not found'
      })
    }

    return response.json({ place, items });
  }

  async indexAsync(request: Request, response: Response) {
    const { city, uf, items } = request.query;
    
    const parsedItems = String(items).split(',').map(item => Number(item.trim()));

    const places = await knex('places')
      .join('places_items', 'places.id', '=', 'places_items.place_id')
      .whereIn('places_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('places.*');

    return response.json(places);
  }
}

export default PlacesController;