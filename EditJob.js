import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { useState } from 'react';

import { connect } from 'react-redux';
import { readJobs, updateJob } from './redux/action'





function EditJob({ dispatch, data, route }) {


    const [job, setJob] = useState('');



    const handleEditJob = (jobID, job, data) => {
        dispatch(updateJob(jobID, job, data));
        setJob('');
        dispatch(readJobs());
    };


    return (
        <View style={styles.container}>
            <Text style={{ width: 258, height: 48, marginTop: 30, fontFamily: 'Epilogue', fontWeight: 700, fontSize: 32, lineHeight: 48, textAlign: 'center' }}>Edit job</Text>
            <View style={{ flexDirection: 'row', width: 334, height: 44, marginTop: 50, alignItems: 'center', borderWidth: 1, borderRadius: 4, borderColor: '#9095A0' }}>
                <View style={{ width: '15%', height: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('./assets/Frame8.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </View>
                <TextInput
                    style={{ width: '85%', height: '100%' }}
                    placeholder={route.params?.jobId ? route.params.name : 'job to edit'}
                    onChangeText={text => setJob(text)}
                />
            </View>
            <Pressable
                style={{ width: 190, height: 44, borderWidth: 1, borderRadius: 12, backgroundColor: '#00BDD6', alignItems: 'center', justifyContent: 'center', marginTop: 80 }}
                onPress={() => handleEditJob(route.params.jobId, job, data)}
            >
                <Text style={{ width: 82, height: 26, fontFamily: 'Inter', fontWeight: 400, fontSize: 16, lineHeight: 26, color: '#FFFFFF', textAlign: 'center' }}>
                    EDIT</Text>
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
    data: state.data,

});
export default connect(mapStateToProps)(EditJob);