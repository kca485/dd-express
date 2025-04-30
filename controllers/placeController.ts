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
  const supabase = createClient({ req, res });

  const picture = req.file;
  let picturePath = "";
  if (picture?.buffer.length) {
    const ext = picture?.originalname.split(".").pop();

    const filename = `${String(Date.now())}.${ext}`;
    const bucketPath = `pictures/${filename}`;
    const { error } = await supabase.storage
      .from("dd")
      .upload(bucketPath, picture.buffer, {
        contentType: picture.mimetype,
      });
    picturePath = supabase.storage.from("dd").getPublicUrl(bucketPath)
      .data.publicUrl;

    if (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
      return;
    }
  }

  const newPlace = req.body;
  const { data, error } = await supabase.from("dd_places").insert({
    lat: parseFloat(newPlace.lat),
    lng: parseFloat(newPlace.lng),
    price: parseFloat(newPlace.price),
    name: newPlace.name,
    picture_path: picturePath,
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
  name?: number;
  picture_path?: string;
}
export async function updatePlace(req: Request, res: Response) {
  const supabase = createClient({ req, res });
  const { id } = req.params;

  const picture = req.file;
  let picturePath = "";
  if (picture?.buffer.length) {
    const ext = picture?.originalname.split(".").pop();

    const filename = `${id}-${String(Date.now())}.${ext}`;
    const bucketPath = `pictures/${filename}`;
    const { error } = await supabase.storage
      .from("dd")
      .upload(bucketPath, picture.buffer, {
        contentType: picture.mimetype,
      });
    picturePath = supabase.storage.from("dd").getPublicUrl(bucketPath)
      .data.publicUrl;

    if (error) {
      console.error("upload picture error", error);
      res.status(500).json({ error: error.message });
      return;
    }
  }

  const updateData: UpdatePlaceBody = {};
  if (req.body.lat) updateData.lat = parseFloat(req.body.lat);
  if (req.body.lng) updateData.lng = parseFloat(req.body.lng);
  if (req.body.price) updateData.price = parseFloat(req.body.price);
  if (req.body.name) updateData.name = req.body.name;
  if (picturePath) updateData.picture_path = picturePath;

  const { data, error } = await supabase
    .from("dd_places")
    .update(updateData)
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
