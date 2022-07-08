import {FlatList, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {useQuery} from 'react-query';
import {ActivityIndicator, Card, Paragraph, Title} from 'react-native-paper';
import {useFirstname} from './hooks';

export default function HomeScreen({navigation}) {
  useEffect(() => {
    const setFirstnameToHeader = async () => {
      const firstname = await useFirstname();

      navigation.setOptions({
        headerTitle: `Hi! ${firstname}`,
      });
    };

    setFirstnameToHeader();
  }, []);

  const {isLoading, error, data} = useQuery('gitOrgs', () => {
    return fetch('https://api.github.com/users/hadley/orgs').then(res =>
      res.json(),
    );
  });

  const renderLoadingIndicator = () => {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  };

  if (isLoading) {
    return renderLoadingIndicator();
  }

  const renderErrorMsg = () => {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  };

  if (error) {
    return renderErrorMsg();
  }

  const renderCardItem = ({item}) => {
    const {login, url, description} = item;

    return (
      <Card>
        <Card.Content>
          <Title>{login}</Title>
          <Paragraph>{url}</Paragraph>
          <Paragraph>{`Desciption - ${description || 'N/A'}`}</Paragraph>
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={item => item.login}
          renderItem={renderCardItem}
        />
      </View>
    </SafeAreaView>
  );
}
