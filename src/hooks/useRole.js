import { supabase } from '../client/Client';

const useRole = () => {

  const getRoleList = async () => {
    const { data } = await supabase.from('profiles').select('*');
    return data;
  }

  return {
    getRoleList
  };
}

export default useRole;