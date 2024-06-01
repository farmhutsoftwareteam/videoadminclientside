import supabase from '../lib/supabase'; // Adjust the path as necessary

async function uploadVideoAndAddToDB(videofile, episodeDetails) {
    const bucketName = 'videos';
    const filePath = `episodes/${videofile.name}`;

    // Upload video to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, videofile);

    if (uploadError) {
        console.error('Error uploading video:', uploadError);
        return;
    }

    // Manually construct the public URL using the provided Supabase URL
    const supabaseUrl = 'https://guqyhqpnpwjlydocubpm.supabase.co';
    const publicURL = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${filePath}`;

    // Prepare episode details with the video URL
    const episodeData = {
        ...episodeDetails,
        videourl: publicURL
    };

    // Insert episode details into the database
    const { data: dbData, error: dbError } = await supabase
        .from('episodes')
        .insert([episodeData]);

    if (dbError) {
        console.error('Error inserting episode data:', dbError);
        return;
    }

    return dbData;
}


export default uploadVideoAndAddToDB;

