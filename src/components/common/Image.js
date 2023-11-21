import React, {useState, useEffect} from 'react';
import {Image as ImageC, StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
// import {Get} from '@axios/AxiosInterceptorFunction';

function Image(props) {
  const imageUrl = pic =>
    `https://connect-coach-user.herokuapp.com/api/v1/images/${pic}`;
  const {
    resizeMode = 'cover',
    onLoadImageUrl = R.image.userPin(),
    source,
    imageStyles,
    customImage,
    recentImage,
    containerStyles,
  } = props;
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(undefined);

  useEffect(() => {
    if (source) {
      imageGetter();
    }
  }, [source]);

  const imageGetter = async () => {
    // try {
    //   setLoading(true);
    //   let url = imageUrl(source);
    //   const response = await Get(url, null);
    //   if (response !== undefined) {
    //     setImage(response?.data?.data?.url);
    //     setLoading(false);
    //   } else {
    //     setLoading(false);
    //   }
    // } catch (error) {
    //   setLoading(false);
    // }
  };

  return (
    <View style={[styles.imageContainer, containerStyles]}>
      {customImage || recentImage ? (
        <ImageC
          resizeMode={resizeMode}
          style={[styles.image, imageStyles]}
          source={recentImage ? {uri: recentImage} : customImage}
        />
      ) : (
        <>
          {loading ? (
            <ImageC
              style={[styles.image, imageStyles]}
              resizeMode={'cover'}
              source={source}
              blurRadius={20}
            />
          ) : (
            <ImageC
              resizeMode={resizeMode}
              style={[styles.image, imageStyles]}
              source={{uri: customImage ? customImage : image}}
            />
          )}
        </>
      )}
    </View>
  );
}
export default Image;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    shadowColor: R.color.mainColor,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    overflow: 'hidden',
  },
});
