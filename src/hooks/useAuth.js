import { supabase } from '../client/Client';

const useAuth = () => {
  const email = process.env.REACT_APP_ADMIN_EMAIL;


  const handleLogin = async (password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('登入失敗：', error.message);
      alert('登入失敗，請確認帳密');
      return;
    }
    return data
  };

  const getProfileInfo = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('登出失敗:', error.message);
  } else {
    console.log('已登出');
  }
};

  return {
    handleLogin,
    getProfileInfo,
    handleLogout,
  };
}

export default useAuth;