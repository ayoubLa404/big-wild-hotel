import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('cabins couldnt be loaded');
  }
  return data;
}

export async function createOrEditCabin(newCabin, id) {
  // when we edit image either be edit or not we check by :
  // I) image edited => will start with supabaseUrl(https//supaabase...)
  // II) image didn't editd => we get image start with a name (so we will create a new img (imagePath))
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // image path name should be like this
  // https://fgjjwffkbebpibvrklra.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg

  // random => we make sure there each pic  has different name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) create/Edit cabin
  let query = supabase.from('cabins');
  // if !id we are in create session
  // a) create session
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // b) edit session
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  // query taht comes from either create or edit will compolet by this
  const { data, error } = await query.select().single();

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
