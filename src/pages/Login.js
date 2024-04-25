import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { Card, StyledBody } from 'baseui/card';
import { Block } from 'baseui/block';
import { HeadingLarge, LabelLarge, ParagraphLarge } from 'baseui/typography';
import loginImage from "./images/login.png";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { Client as Styletron } from "styletron-engine-monolithic";
import { SecretKeyProvider, useSecretKey, SecretKeyContext } from './SecretKeyContext'; 
import { Toast, KIND, ToasterContainer } from "baseui/toast";
import axios from 'axios';
import { useStyletron } from 'baseui';

const engine = new Styletron();
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [css, theme] = useStyletron();
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://laravel.nanodata.cloud/api/login', {
        email,
        password
      });
      if (!response.data.error) {
        localStorage.setItem('token', response.data.token);
        const verifyAdmin = async () => {
          let token = localStorage.getItem('token');
          let response = await axios.get('https://laravel.nanodata.cloud/api/myaccount/', {
          headers: {
          Authorization: `Bearer ${token}`
          }})
          console.log(response.data);
          if (response.data.is_admin) {
           localStorage.setItem('Admin', true);
           window.showAdmin();
          }
        }
        verifyAdmin();
        navigate('/insects'); 
      } else {
        alert('Login failed: ' + response.data.error);
        setToastMsg(response.data.error);
        setShowToast(true);
      }
    } catch (error) {
      console.error('Login failed: ', error);
      setToastMsg(error.message);
      setShowToast(true);
    }
  };

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
      {showToast && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ToasterContainer>
            <Toast kind={KIND.negative}>{toastMsg}</Toast>
          </ToasterContainer>
        </div>
      )}
        <Block display="flex" justifyContent="center" alignItems="center" height="auto" minHeight="100vh" padding="20px">
          <Block display="flex" flexDirection={['column', 'column', 'row', 'row']} alignItems="center" justifyContent="center" width="100%">
            <Block width={['100%', '100%', '35%', '30%']} display="flex" justifyContent="center" alignItems="center" marginBottom={["30px", "30px", "0px", "0px"]}>
              <img src={loginImage} alt="Login Visual" style={{ maxWidth: '100%', maxHeight: '300px' }} />
            </Block>
            <Block width={['100%', '100%', '40%', '40%']} paddingLeft="scale600" paddingRight="scale600">
              <Card>
                <StyledBody>
                  <HeadingLarge marginBottom="scale800">Login Form</HeadingLarge>
                  <LabelLarge marginBottom="scale600">Please enter your login and password</LabelLarge>
                  <Block marginBottom="scale600">
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" clearable={true} />
                  </Block>
                  <Block marginBottom="scale600">
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" clearable={true} type="password" />
                  </Block>
                  <Block marginBottom="scale600">
                    <Button onClick={handleLogin} overrides={{ BaseButton: { style: { width: '100%', marginBottom: '20px', backgroundColor: '#4CAF50' } } }}>
                      Login
                    </Button>
                  </Block>
                  <ParagraphLarge display="flex" justifyContent="center">
                    Not a member? <a onClick={() => navigate('/register')}> Register!</a>
                  </ParagraphLarge>
                </StyledBody>
              </Card>
            </Block>
          </Block>
        </Block>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default Login;
