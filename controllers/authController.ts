import { Request, Response } from "express";
import { createClient } from "../config/supabase";

export async function sendMagicLink(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "Email is required" });
    }
    const supabase = createClient({ req, res });
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.BASE_URL}/auth/confirm`,
      },
    });
    if (error) throw error;
    res.json({ message: "Magic link sent", data });
  } catch (error) {
    console.error("Error sending magic link:", error);
    res.status(400).json({ error: (error as { message?: string })?.message });
  }
}

export async function confirmMagicLink(req: Request, res: Response) {
  try {
    const tokenHash = req.query.token_hash as string;
    if (!tokenHash) {
      res.status(400).json({ error: "Token is required" });
    }

    const supabase = createClient({ req, res });
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "email",
    });
    if (error) throw error;

    res.json({ message: "Logged in successfully", data });
  } catch (error) {
    console.error("Error verifying magic link:", error);
    res.status(400).json({ error: (error as { message?: string })?.message });
  }
}
