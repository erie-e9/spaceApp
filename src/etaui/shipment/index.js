import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Colors } from 'react-native-paper';
import Container from '../../component/base/Container';
import IconFa from '../../component/iconComponent/IconFa';

const Shipment = (props) => {
    return (
        <Container style={{flex:1,padding:20}} {...props}>
            <Text>Order ID :  <Text style={{fontWeight:'bold',color:'#303030'}}> 15992323</Text></Text>
            <View style={{marginTop:20}}>
                <View style={{flexDirection:'row',width:'100%',height:100}}>
                    <View style={{alignItems:'center',marginRight:20}}>
                        <Text>10 May, 2020</Text>
                        <Text>10:20 Am</Text>
                    </View>
                    <View style={{alignItems:'center',marginRight:20}}>
                        <View style={{width:20,height:20,backgroundColor:Colors.orange500,borderRadius:30}} />
                        <View style={{width:5,height:100,backgroundColor:Colors.orange100,marginTop:-10,zIndex:-1}} />
                    </View>
                    <View>
                        <View style={{width:50,height:50,borderRadius:4,justifyContent:'center',alignItems:'center',backgroundColor:Colors.orange100}}>
                            <IconFa name={'archive'} style={[{color:Colors.orange500},styles.icon]} />
                        </View>
                        <Text style={styles.status}>Status :  <Text style={{color:Colors.orange500,fontWeight:'bold'}}> Delivered</Text></Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',width:'100%',height:100}}>
                    <View style={{alignItems:'center',marginRight:20}}>
                        <Text>10 May, 2020</Text>
                        <Text>10:25 Am</Text>
                    </View>
                    <View style={{alignItems:'center',marginRight:20}}>
                        <View style={{width:20,height:20,backgroundColor:Colors.orange500,borderRadius:30}} />
                        <View style={{width:5,height:100,backgroundColor:Colors.orange100,marginTop:-10,zIndex:-1}} />
                    </View>
                    <View>
                        <View style={{width:50,height:50,borderRadius:4,justifyContent:'center',alignItems:'center',backgroundColor:Colors.blue100}}>
                            <IconFa name={'shipping-fast'} style={[{color:Colors.blue500},styles.icon]} />
                        </View>
                        <Text style={styles.status}>Status :  <Text style={{color:Colors.blue500,fontWeight:'bold'}}> On The Way</Text></Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',width:'100%',height:100}}>
                    <View style={{alignItems:'center',marginRight:20}}>
                        <Text>10 May, 2020</Text>
                        <Text>10:20 Am</Text>
                    </View>
                    <View style={{alignItems:'center',marginRight:20}}>
                        <View style={{width:20,height:20,backgroundColor:Colors.orange500,borderRadius:30}} />
                        <View style={{width:5,height:100,backgroundColor:Colors.orange100,marginTop:-10,zIndex:-1}} />
                    </View>
                    <View>
                        <View style={{width:50,height:50,borderRadius:4,justifyContent:'center',alignItems:'center',backgroundColor:Colors.green100}}>
                            <IconFa name={'check-circle'} style={[{color:Colors.green500},styles.icon]} />
                        </View>
                        <Text style={styles.status}>Status :  <Text style={{color:Colors.orange500,fontWeight:'bold'}}> Confirmed</Text></Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',width:'100%',height:100}}>
                    <View style={{alignItems:'center',marginRight:20}}>
                        <Text>10 May, 2020</Text>
                        <Text>10:20 Am</Text>
                    </View>
                    <View style={{alignItems:'center',marginRight:20}}>
                        <View style={{width:20,height:20,backgroundColor:Colors.orange500,borderRadius:30}} />
                        <View style={{width:5,height:100,backgroundColor:Colors.orange100,marginTop:-10,zIndex:-1}} />
                    </View>
                    <View>
                        <View style={{width:50,height:50,borderRadius:4,justifyContent:'center',alignItems:'center',backgroundColor:Colors.green100}}>
                            <IconFa name={'gift'} style={[{color:Colors.green500},styles.icon]} />
                        </View>
                        <Text style={styles.status}>Status :  <Text style={{color:Colors.orange500,fontWeight:'bold'}}> Confirmed</Text></Text>
                    </View>
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    icon : {
        fontSize:20
    },
    status: {color:'#303030', marginTop:5}
})

export default Shipment;