import supabase from '../lib/supabase';

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
      isfree: episodeDetails.isFree,
    },
  ]);

  if (error) {
    throw error;
  }

  return data;
}
