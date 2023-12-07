import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { deleteJob, readJobs } from './redux/action'

function Home({ navigation, dispatch, data }) {

    useEffect(() => {
        dispatch(readJobs());
        console.log("Data in Home:", data);
    }, [dispatch]);

    const handleDeleteJob = (jobId, data) => {
        dispatch(deleteJob(jobId, data));
    };

    // Render Item của flatlist
    const renderItem = ({ item }) => (
        <View key={item.id} style={{ width: 355, height: 40, borderWidth: 1, borderRadius: 24, backgroundColor: '#D3D5D8', top: 20, flexDirection: 'row', justifyContent: 'center', marginTop: item.id == 1 ? 0 : 20 }}>
            <Pressable
                style={{ width: 50, height: 30, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                    handleDeleteJob(item.id, data)
                }}
            >
                <Image
                    source={require('./assets/Frame3.png')}
                    style={{ width: 24, height: 24 }}
                />
            </Pressable>
            <Text
                style={{ width: 230, height: 26, fontFamily: 'Inter', fontWeight: 400, fontSize: 16, lineHeight: 26 }}
            > {item.name}</Text>
            <Pressable
                style={{ width: 50, height: 30, justifyContent: 'center', alignItems: 'center' }}
            >
                <Image
                    source={require('./assets/Frame4.png')}
                    style={{ width: 24, height: 24 }}

                />
            </Pressable>
            <TouchableOpacity
                style={{ width: 50, height: '100%', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                    navigation.navigate('EditJob', { jobId: item.id });
                }}
            >
                <Text>
                    Edit
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={{ width: '90%', height: 40, flexDirection: 'row', top: 10, borderWidth: 1, borderRadius: 10, alignItems: 'center' }}>
                <View style={{ width: 50, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('./assets/Frame.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </View>
                <TextInput
                    style={{ width: 300, height: 40, fontFamily: 'Inter', fontWeight: 400, fontSize: 16, lineHeight: 26 }}
                    placeholder='Search'
                    placeholderTextColor={'#171A1F'}
                />
            </View>
            <View style={{ marginTop: 30, height: 400 }}>
                <FlatList
                    data={data?.todos || []}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}

                />
            </View>

            <Pressable
                style={{ width: 69, height: 69, marginTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00BDD6', borderWidth: 1, borderColor: '#FFFFFF', borderRadius: 100 }}
                onPress={() => {
                    navigation.navigate('AddJob')
                }}
            >
                <Image
                    source={require('./assets/Frame5.png')}
                    style={{ width: 32, height: 32 }}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
});
const mapStateToProps = (state) => ({
    data: state.data,
});
export default connect(mapStateToProps)(Home);