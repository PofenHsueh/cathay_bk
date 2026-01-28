import React,{ useEffect, useState }  from 'react';
import { Input,Row,Col} from 'antd';
import { useNavigate } from 'react-router';
import * as Style from './Style';
// import { ArrowLeftOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';


const Login = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [nickName,setNickName] = useState('');
  const [password,setPassword] = useState('')
  const navigate = useNavigate();

  const adminLogin = useAuth();
  const roleAuth = useRole();

 


  const handleNextStep =(data)=>{
    localStorage.setItem('role',data);
    navigate('/room');
  }


  const handleClick = () => {
    setCount((prev) => {
      const next = prev + 1;

      if (next === 7) {
        setVisible(true);
        return 0; // 重置
      }
        setVisible(false);
      return next;
    });
  };


  const handleAdminLogin = async()=>{
    try{
      const roleProfile = await adminLogin.handleLogin(password);
      if (roleProfile){
      const roles = await roleAuth.getRoleList();
      if( roleProfile?.user?.id === roles[0].id){
          handleNextStep('admin_team');
        }
      }
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    const loginStatus = localStorage.getItem('role');
    if(loginStatus){
      navigate('/room');
    }
  },[])

  return (
    <Style.Page>
      <Style.CardContainer>
        <Style.Header onClick={handleClick}>Cathay</Style.Header>
        <Style.Title>{visible?'雞尾酒Admin':'雞尾酒'}</Style.Title>
        <Style.Content>
          {!visible&&
          <Row gutter={[0, 8]}>
            <Col span={24}>暱稱</Col>
            <Col span={24}>
              <Input size="large" onChange={(e)=>setNickName(e.target.value)} status={!nickName ? "error" : ""}/>
            </Col>
          </Row>}

          {visible&&
          <Row gutter={[0, 8]}>
            <Col span={24}>密碼</Col>
            <Col span={24}>
              <Input size="large" onChange={(e)=>setPassword(e.target.value)} status={!password ? "error" : ""}/>
            </Col>
          </Row>}

          <Style.CustomerButton 
             disabled={visible?!password:!nickName}
             onClick={visible? () => handleAdminLogin() : () => handleNextStep(nickName)}>
            進入
          </Style.CustomerButton>

        </Style.Content>
      </Style.CardContainer>
    </Style.Page>
  );
};

export default Login;
