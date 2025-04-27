import { Request, Response } from "express";
import { createClient } from "../config/supabase";

export async function getAllPlaces(req: Request, res: Response) {
  const supabase = createClient({ req, res });
  const { data, error } = await supabase.from("dd_places").select();

  if (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({
      message: "Internal Server Error",
    });
  } else {
    res.json(data);
  }
}

export async function createPlace(req: Request, res: Response) {
  const newPlace = req.body;
  const supabase = createClient({ req, res });
  const { data, error } = await supabase.from("dd_places").insert({
    lat: newPlace.lat,
    lng: newPlace.lng,
    price: newPlace.price,
  });

  if (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({
      message: "Internal Server Error",
    });
  } else {
    res.json(data);
  }
}

interface UpdatePlaceBody {
  lat?: number;
  lng?: number;
  price?: number;
}
export async function updatePlace(req: Request, res: Response) {
  const newPlace: UpdatePlaceBody = {};
  if (req.body.lat) newPlace.lat = req.body.lat;
  if (req.body.lng) newPlace.lat = req.body.lng;
  if (req.body.price) newPlace.lat = req.body.price;

  const { id } = req.params;

  const supabase = createClient({ req, res });
  const { data, error } = await supabase
    .from("dd_places")
    .update({
      lat: newPlace.lat,
      lng: newPlace.lng,
      price: newPlace.price,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({
      message: "Internal Server Error",
    });
  } else {
    res.json(data);
  }
}

export async function deletePlace(req: Request, res: Response) {
  const { id } = req.params;

  const supabase = createClient({ req, res });
  const { data, error } = await supabase
    .from("dd_places")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({
      message: "Internal Server Error",
    });
  } else {
    res.json(data);
  }
}
