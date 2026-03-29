import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Game interface
export interface Game {
  id: string;
  name: string;
  image: string;
  size: number; // in GB
  created_at?: string;
}

// Fetch all games
export const fetchGames = async (): Promise<Game[]> => {
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

// Fetch single game by ID
export const fetchGameById = async (id: string): Promise<Game | null> => {
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching game:', error);
    return null;
  }
};

// Add new game (admin only)
export const addGame = async (game: Omit<Game, 'id' | 'created_at'>): Promise<Game | null> => {
  try {
    const { data, error } = await supabase
      .from('games')
      .insert([game])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding game:', error);
    return null;
  }
};

// Update game (admin only)
export const updateGame = async (id: string, updates: Partial<Omit<Game, 'id'>>): Promise<Game | null> => {
  try {
    const { data, error } = await supabase
      .from('games')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating game:', error);
    return null;
  }
};

// Delete game (admin only)
export const deleteGame = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('games')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting game:', error);
    return false;
  }
};
