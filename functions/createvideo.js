import axios from 'axios';
import supabase from '../lib/supabase';



export async function uploadVideoAndAddToDB(episodeDetails) {
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



export async function createEpisode({
  seasonnumber,
  episodenumber,
  title,
  duration,
  thumbnail,
  video_url,
  description,
  show,
  isFree
}) {
  const { data, error } = await supabase.from('episodes').insert([
    {
      seasonnumber,
      episodenumber,
      title,
      duration,
      thumbnail,
      video_url,
      description,
      show,
      isFree
    }
  ]);

  if (error) {
    console.error('Error creating episode:', error);
    return null;
  }

  return data;
}