import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('cabins couldnt be loaded');
  }
  return data;
}

export async function createCabin(newCabin) {
  // image path name should be like this
  // https://fgjjwffkbebpibvrklra.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg

  // random => we make sure there each pic  has different name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error('cabin couldnt be created');
  }
  // 2) uplaod image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // if image didn't created we delete the newCabin (error in storage)
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error('cabin image couldn\t be uploaded and the cabin wasn\t created');
  }

  return data;
}

export async function DeleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('cabins couldnt be deleted');
  }
  return data;
}
