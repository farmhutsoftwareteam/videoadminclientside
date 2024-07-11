import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function createEpisode(episodeDetails) {
  const { data, error } = await supabase.from('episodes').insert([
    {
      title: episodeDetails.title,
      description: episodeDetails.description,
      seasonnumber: episodeDetails.seasonnumber,
      episodenumber: episodeDetails.episodenumber,
      thumbnail: episodeDetails.thumbnail,
      video_url: episodeDetails.video_url,
      show: episodeDetails.show,
      isFree: episodeDetails.isFree,
    },
  ]);

  if (error) {
    throw error;
  }

  return data;
}