import { StyleSheet,FlatList, SafeAreaView, Image, Text, TouchableOpacity, View, Animated } from 'react-native'
import React from 'react'
import TrackPlayer, {Capability,Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents} from 'react-native-track-player';
import { Entypo, Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import music from './DataAsset/DataApi'

export default MusicPlayer = () => {
  const PlayBackState= usePlaybackState()
 const [musicIndex, setMusicIndex]=React.useState(0);
  const scrollX= React.useRef(new Animated.Value(0)).current;

 const musicPlayer= async()=>{
try{
 
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add(music)
}
catch(e){
console.log(e);
}
 }

 const toggleplayback=async PlayBackState=>{
  const currentTrack=await TrackPlayer.getCurrentTrack();
  if(currentTrack!=null)
  {
    if(PlayBackState==State.Paused)
    {
      await TrackPlayer.play();
    }
    else{
      await TrackPlayer.pause();
    }
  }
 }

  React.useEffect(()=>{
    musicPlayer();
scrollX.addListener(({value})=>{
  const index=Math.round(value/360);
  setMusicIndex(index)
})
  },[])


  const musicImage=({item, index})=>{
    return(
      
      <Animated.View style={{ width:360,justifyContent:"center", alignItems:"center"}}>
        <View>
        <Image source={{uri:item.artwork}} style={{height:380, width:320,marginVertical:10, alignSelf:"center"}}/>
      </View>
      
      
      </Animated.View>
      
    )
  }
  return (
    <SafeAreaView style={{backgroundColor:"#458E71", flex:1}}>
    <View style={{justifyContent:"center", alignItems:"center", flex:1}}>
      <Image source={require('./logo.png')} style={{marginVertical:10, width:350,alignSelf:"center", height:50}}/>
      {/* Music Images */}
      <Animated.FlatList
        renderItem={musicImage}
        data={music}
        keyExtractor={item=>item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [

            {nativeEvent:{
              contentOffset:{
                x:scrollX,
              }
            }}
          ],
          {useNativeDriver:true}
        )}
      />
       <View>
        <Text style={{color:"#D0D0D0", fontWeight:"bold", paddingTop:10, fontSize:18}}>
          {music[musicIndex].title}
        </Text>
        <Text style={{color:"#D0D0D0", paddingTop:5, fontSize:15, alignSelf:"center"}}>
        {music[musicIndex].artist}
        </Text>
      </View>
      
        {/* Slider*/}
      <View>
      <Slider
  style={{width: 330, height: 20, marginTop:15, flexDirection:"row"}}
  value={10}
  minimumValue={0}
  maximumValue={100}
  thumbTintColor='#D0D0D0'
  minimumTrackTintColor="#D0D0D0"
  maximumTrackTintColor="#000000"
  onSlidingComplete={()=>{}}
/>
 {/* Music Duration */}
<View style={{flexDirection:"row", justifyContent:"space-between", paddingHorizontal:15}}>
    <Text style={{fontSize:12}}>00:00</Text>
    <Text style={{fontSize:12}}>03:58</Text>
   </View>
    </View>
  {/* Music Controls*/}
  <View style={{flexDirection:"row", alignItems:"center", width:"60%", paddingVertical:10, justifyContent:"space-between"}}>
    <TouchableOpacity>
  <Ionicons name="play-skip-back" size={40} color="#D0D0D0" />
  </TouchableOpacity>
  <TouchableOpacity onPress={()=>{toggleplayback(PlayBackState)}}>
  <Ionicons name={PlayBackState===State.Playing?"ios-play-circle":"ios-pause-circle"} size={70} color="#D0D0D0" />
  </TouchableOpacity>
  <TouchableOpacity>
  <Ionicons name="play-skip-forward" size={40} color="#D0D0D0" />
  </TouchableOpacity>
  </View>
   
    </View>
   
    <View style={{borderTopWidth:0.3, borderTopColor:"#D0D0D0"}}>
      <View style={{flexDirection:"row", paddingVertical:7, justifyContent:"space-around"}}>
        <TouchableOpacity>
        <Entypo name="heart-outlined" size={26} color="#D0D0D0" />
        </TouchableOpacity>
        <TouchableOpacity>
        <Ionicons name="repeat" size={26} color="#D0D0D0" />
        </TouchableOpacity>
        <TouchableOpacity>
        <AntDesign name="sharealt" size={22} color="#D0D0D0" />
        </TouchableOpacity>
        <TouchableOpacity>
        <FontAwesome5 name="ellipsis-h" size={26} color="#D0D0D0" />
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  )
}
