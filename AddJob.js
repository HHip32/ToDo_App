import { StyleSheet, Text, View, Image, TextInput, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { setJob, setData } from './redux/action'





function AddJob({ dispatch, job, data, navigation }) {

    useEffect(() => {
        console.log("Data in AddJob:", data);
    }, [data]);

    const addNewJobToApi = async (job, currentData) => {
        try {
            const response = await fetch('https://pwqz9y-8080.csb.app/ToDo/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: currentData.username,
                    todos: [...currentData.todos, { name: job, id: currentData.todos.length + 1 }],
                    id: currentData.id
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add new job');
            }
    
            const updatedData = await response.json();
            dispatch(setData(updatedData)); // Cập nhật Redux store sau khi thêm công việc mới thành công
        } catch (error) {
            console.error('Error adding new job:', error.message);
        }
    };

    // const deleteJob = async (jobID, currentData) => {
    //     const response = await fetch('https://pwqz9y-8080.csb.app/ToDo/1',{
    //         method:'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             username: currentData.username,
    //             todos: [...currentData.todos, { name: job, id: currentData.todos.length + 1 }],
    //             id: currentData.id
    //         }),
    //     });
    // }


    const handleAddNewJob = (job, data) => {
        addNewJobToApi(job, data);
        dispatch(setJob(''));
        console.log('Thêm thành công!');
    };


    // const handleDeleteJob = (id, data) => {

    // }



    return (
        <View style={styles.container}>
            <Text style={{ width: 258, height: 48, marginTop: 30, fontFamily: 'Epilogue', fontWeight: 700, fontSize: 32, lineHeight: 48, textAlign: 'center' }}>Add new job</Text>
            <View style={{ flexDirection: 'row', width: 334, height: 44, marginTop: 50, alignItems: 'center', borderWidth: 1, borderRadius: 4, borderColor: '#9095A0' }}>
                <View style={{ width: '15%', height: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('./assets/Frame8.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </View>
                <TextInput
                    style={{ width: '85%', height: '100%' }}
                    placeholder={'input your job'}
                    onChangeText={text => dispatch(setJob(text))}
                />
            </View>
            <Pressable
                style={{ width: 190, height: 44, borderWidth: 1, borderRadius: 12, backgroundColor: '#00BDD6', alignItems: 'center', justifyContent: 'center', marginTop: 80 }}
                onPress={() => handleAddNewJob(job, data)}
            >
                <Text style={{ width: 82, height: 26, fontFamily: 'Inter', fontWeight: 400, fontSize: 16, lineHeight: 26, color: '#FFFFFF', textAlign: 'center' }}>
                    FINISH</Text>
            </Pressable>
            <View style={{ width: 320, height: 200, justifyContent: 'center', alignItems: 'center', marginTop: 90 }}>
                <Image source={require('./assets/Image 95.png')}
                    style={{ width: 190, height: 200 }}
                />
            </View>
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
    job: state.job,
    data: state.data,

});
export default connect(mapStateToProps)(AddJob);