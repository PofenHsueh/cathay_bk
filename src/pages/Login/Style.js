import styled from 'styled-components';
import { Button} from 'antd';


export const CustomerButton = styled(Button)`
  width: 100%;
  height: 44px;
  border-radius: 999px;
  font-size: 16px;
  background: #ffffff;
  color: #333;
  border: 1px solid #d1d5db;

  &:hover {
    background: #f9fafb;
  }
}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch; /* 表單滿寬 */
  gap: 16px;
`;

export const Header = styled.div`
  background: linear-gradient(to right, #e8f5e9, #ffffff);
  border-radius: 16px 16px 0 0;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #2d8a54;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: clamp(16px, 4.5vw, 18px);
  margin: 16px 0;
  text-align: center;
`;

export const TitleRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom:20px;
`;

export const CardContainer=styled.div`
  width: 360px;
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #edf2ed;
`;

export const Page = styled.div`
  min-height: 100vh;
  min-height: 100dvh; /* iOS 新版 Safari */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: env(safe-area-inset-top)
           env(safe-area-inset-right)
           env(safe-area-inset-bottom)
           env(safe-area-inset-left);
  background: #f7faf7;
`;
