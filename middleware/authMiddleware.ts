import { NextFunction, Request, Response } from "express";
import { createClient } from "../config/supabase";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const supabase = createClient({ req, res });

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
      throw authError || Error("no user found");
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Unauthorized",
    });
  }
}
