import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from 'baseui/input';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton, ROLE } from 'baseui/modal';
import { Button, SIZE as ButtonSize, KIND as ButtonKind, SHAPE as ButtonShape } from 'baseui/button';
import { useStyletron } from 'baseui';
import { AppNavBar, setItemActive } from "baseui/app-nav-bar";
import { ChevronDown, Delete, Overflow } from "baseui/icon";
import { useNavigate } from 'react-router-dom';
import { Block } from 'baseui/block';
import { Toast, KIND, ToasterContainer } from "baseui/toast";

const MyAccount = () => {
  const [css, theme] = useStyletron();
  const [accountDetails, setAccountDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('token');
    console.log(token);
    axios.get('https://laravel.nanodata.cloud/api/myaccount/', {
      headers: {
      Authorization: `Bearer ${token}`
      }
    }) 
      .then(response => {setAccountDetails(response.data); console.log(response.data)})
      .catch(error => console.error('Error fetching account details:', error));
  }, []);

  const mainItems = [
    { icon: Overflow, label: 'My Collection' },
    { icon: Delete, label: 'My Account', active: true },
  ];

  const handleNav = (item) => {
    console.log('Navigating to:', item); 
    if (item=== 'My Collection') {
      console.log('Going to /myinsects');
      navigate('/myinsects');
    } else if (item === 'My Account') {
      console.log('Going to /myaccount');
      navigate('/myaccount');
    }
  };

  const handleEdit = (action) => {
    const token = localStorage.getItem('token');
    const url = 'https://laravel.nanodata.cloud/api/myaccount/manage';
    const headers = { Authorization: `Bearer ${token}` };
    let data = {};

    switch (action) {
      case 'edit-email':
        data = { email: accountDetails.email };
        break;
      case 'edit-password':
        data = { password: accountDetails.password };
        break;
      case 'delete-account':
        data = { delete: true };
        break;
      default:
        console.log('No action');
    }

    axios.post(url, data, { headers })
      .then(response => {
        console.log(response.data.message);
        setToastMsg(response.data.message);
        setShowToast(true);
        setIsModalOpen(false);
        if (action === 'delete-account') {
          localStorage.removeItem('token');
          localStorage.removeItem('Admin');
          navigate('/'); 
        }
      })
      .catch(error => console.error('Error processing the request:', error));
  };

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    axios.get('https://laravel.nanodata.cloud/api/logout', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('Admin');
      navigate('/');
    })
    .catch(error => console.error('Logout failed:', error));
  };

  const showModal = (action) => {
    setModalContent(action);
    setIsModalOpen(true);
  };

  return (
    <>
      <AppNavBar
        title="My Account"
        mainItems={[
          { icon: Overflow, label: 'My Collection' },
          { icon: Delete, label: 'My Account', active: true }
        ]}
        onMainItemSelect={item => {
          setItemActive(mainItems, item);
          handleNav(item.label);
        }}
        usernameSubtitle="Profile"
      />
      {showToast && (
        <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center'})}>
          <ToasterContainer>
            <Toast kind={KIND.positive}>{toastMsg}</Toast>
          </ToasterContainer>
        </div>
      )}
      <div className={css({ padding: theme.sizing.scale600 })}>
        <Block maxWidth="600px" margin="auto" padding={theme.sizing.scale600}>
          <Block display="flex" flexDirection="column" alignItems="center">
            <img 
              src={`https://ui-avatars.com/api/?name=${accountDetails.name}&background=random&rounded=true&size=128`} 
              alt="User Avatar" 
              className={css({ borderRadius: '50%', maxWidth: '128px', maxHeight: '128px', width: '100%' })} 
            />
            <Block marginTop={theme.sizing.scale600} width="100%">
              <Input
                disabled
                value={accountDetails.name || ''}
                clearable
                placeholder="Username"
                overrides={{ Root: { style: { marginBottom: theme.sizing.scale300 } } }}
              />
              <div className={css({ marginBottom: theme.sizing.scale600 })}>
                Member since: {new Date(accountDetails.created_at).toLocaleDateString()}
              </div>
            </Block>
            <Block width="100%">
              <Input
                value={accountDetails.email || ''}
                type="email"
                clearable
                overrides={{ Root: { style: { marginBottom: theme.sizing.scale300 } } }}
                onChange={(e) => setAccountDetails({...accountDetails, email: e.target.value})}
              />
              <Button onClick={() => showModal('edit-email')} size={ButtonSize.compact} shape={ButtonShape.pill}>
                Edit Email
              </Button>
            </Block>
            <Block width="100%" marginTop={theme.sizing.scale300}>
              <Input
                type="password"
                overrides={{ Root: { style: { marginBottom: theme.sizing.scale300 } } }}
                onChange={(e) => setAccountDetails({...accountDetails, password: e.target.value})}
              />
              <Button onClick={() => showModal('edit-password')} size={ButtonSize.compact} shape={ButtonShape.pill}>
                Change Password
              </Button>
            </Block>
            <Block display="flex" justifyContent="space-between" alignItems="center" width="100%" marginTop={theme.sizing.scale600}>
              <div>Logout?</div>
              <Button onClick={() => handleLogout()} kind={ButtonKind.negative} size={ButtonSize.compact} shape={ButtonShape.pill}>
                Logout
              </Button>
            </Block>
            <Block display="flex" justifyContent="space-between" alignItems="center" width="100%" marginTop={theme.sizing.scale600}>
              <div>Delete my account</div>
              <Button onClick={() => showModal('delete-account')} kind={ButtonKind.negative} size={ButtonSize.compact} shape={ButtonShape.pill}>
                Delete Account
              </Button>
            </Block>
          </Block>
          <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} role={ROLE.dialog}>
            <ModalHeader>Are you sure you want to {modalContent}?</ModalHeader>
            <ModalBody>This action cannot be undone.</ModalBody>
            <ModalFooter>
              <ModalButton onClick={() => setIsModalOpen(false)}>Cancel</ModalButton>
              <ModalButton onClick={() => handleEdit(modalContent)}>Confirm</ModalButton>
            </ModalFooter>
          </Modal>
        </Block>
      </div>
    </>
  );
};

export default MyAccount;
