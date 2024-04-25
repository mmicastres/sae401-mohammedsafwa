import React, {useState} from 'react';
import { Input } from 'baseui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from 'baseui/button';
import { Card, StyledBody } from 'baseui/card';
import { Block } from 'baseui/block';
import { HeadingLarge, LabelLarge, ParagraphLarge } from 'baseui/typography';
import registerImage from "./images/register.png";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { Client as Styletron } from "styletron-engine-monolithic";
import axios from 'axios'
import { Toast, KIND, ToasterContainer } from "baseui/toast";
import { useStyletron } from 'baseui';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';


const engine = new Styletron();

const Register = () => {
  const [css, theme] = useStyletron();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);


  const handleRegister = async () => {
  
    await axios.get('https://laravel.nanodata.cloud/sanctum/csrf-cookie');
  
    try {
      const response = await axios.post('https://laravel.nanodata.cloud/api/register', JSON.stringify({
        name: username,
        email,
        password,
        password_confirmation: password,
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
  
      if (response.data.token) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.msg || error.message);
      setToastMsg(error.response?.data?.msg || error.message);
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
              <img src={registerImage} alt="Login Visual" style={{ maxWidth: '100%', maxHeight: '300px' }} />
            </Block>

            <Block width={['100%', '100%', '40%', '40%']} paddingLeft="scale600" paddingRight="scale600">
              <Card>
                <StyledBody>
                  <HeadingLarge marginBottom="scale800">Register Form</HeadingLarge>
                  <LabelLarge marginBottom="scale600">Please enter your informations to register</LabelLarge>
                  <Block marginBottom="scale600">
                    <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    clearable={true}
                    type='email'
                    />
                  </Block>
                  <Block marginBottom="scale600">
                    <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    clearable={true}
                    type='text'
                    />
                  </Block>
                  <Block marginBottom="scale600">
                    <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    clearable={true}
                    type='password'
                    />
                  </Block>
                  <Block marginBottom="scale600">
                    <Button onClick={handleRegister} overrides={{ BaseButton: { style: { width: '100%', marginBottom: '20px', backgroundColor: '#4CAF50' } } }}>
                      Register
                    </Button>
                  </Block>
                  <ParagraphLarge display="flex" justifyContent="center">
                  Already a member ? <a onClick={() => navigate('/login')}> Sign in</a>
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

export default Register;
