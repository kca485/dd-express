import { Request, Response } from "express";
import { createClient } from "../config/supabase";

export async function sendMagicLink(req: Request, res: Response) {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Email is required" });
  }
  const supabase = createClient({ req, res });
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.CLIENT_URL}/api/auth/confirm`,
    },
  });
  if (error) {
    console.error("Error sending magic link:", error);
    res.status(400).json({ error: (error as { message?: string })?.message });
  }
  res.json({ message: "Magic link sent", data });
}

export async function confirmMagicLink(req: Request, res: Response) {
  const tokenHash = req.query.token_hash as string;
  if (!tokenHash) {
    res.status(400).json({ error: "Token is required" });
  }

  const supabase = createClient({ req, res });
  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: "email",
  });
  if (error) {
    console.error("Error verifying magic link:", error);
    res.status(400).json({ error: (error as { message?: string })?.message });
  }

  const clientUrl = process.env.CLIENT_URL;
  if (!clientUrl) {
    res.status(500).json({
      message: "no redirect url set",
    });
  } else {
    res.redirect(clientUrl);
  }
}

export async function getUser(req: Request, res: Response) {
  const supabase = createClient({ req, res });
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    res.status(400).json({ error: (error as { message?: string })?.message });
  } else {
    res.json({
      user: data.user,
    });
  }
}

export async function getSession(req: Request, res: Response) {
  const supabase = createClient({ req, res });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) {
    res.status(400).json({ error: (error as { message?: string })?.message });
  } else {
    res.json({
      user: { id: session.user.id, email: session.user.email },
    });
  }
}
