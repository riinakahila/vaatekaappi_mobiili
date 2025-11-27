import { Appbar, Menu } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import React from 'react';
import { Icon, MD3Colors } from 'react-native-paper';

//https://oss.callstack.com/react-native-paper/docs/guides/react-navigation/#stack-navigator

export default function CustomNavigationBar({ route, options, navigation, back}) {

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const title= getHeaderTitle(options, route.name);

  return (
    <Appbar.Header elevated>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={openMenu}
            />
          }>
            <Menu.Item
            leadingIcon="camera"
            onPress={() => {
              closeMenu();
              navigation.navigate('Camera')
              console.log('Camera was pressed');
            }}
            title="Kamera"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 2 was pressed');
            }}
            title="T-paidat"
          />
          </Menu>
          ) : null}
    </Appbar.Header>
  );
}