import ImageCropPicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform, View} from 'react-native';
import PopUp from '@components/common/PopUp';

export const uploadMultipleMedia = async options => {
  try {
    let pickerResult;
    pickerResult = await ImageCropPicker.openPicker(options);
    if (pickerResult) {
      let correctFormat = pickerResult.every(item => {
        return (
          item?.path.includes('.jpeg') ||
          item?.path.includes('.jpg') ||
          item?.path.includes('.png') ||
          item?.path.includes('.JPG') ||
          item?.path.includes('.PNG') ||
          item?.path.includes('.JPEG') ||
          item?.path.includes('.HEIC') ||
          item.path.includes('.mp4')
        );
      });
      if (correctFormat) {
        return pickerResult;
      } else {
        PopUp({
          heading: 'Picture Error,Image path is wrong',
          type: 'danger',
        });
      }
    }
  } catch (error) {}
};

export const uploadMedia = async options => {
  try {
    let pickerResult;
    pickerResult = await ImageCropPicker.openPicker(options);
    if (pickerResult) {
      if (
        pickerResult.path.includes('.jpeg') ||
        pickerResult.path.includes('.jpg') ||
        pickerResult.path.includes('.png') ||
        pickerResult.path.includes('.JPG') ||
        pickerResult.path.includes('.PNG') ||
        pickerResult.path.includes('.JPEG') ||
        pickerResult.path.includes('.HEIC') ||
        pickerResult.path.includes('.mp4')
      ) {
        return pickerResult;
      } else {
        PopUp({
          heading: 'Picture Error,Image path is wrong',
          bottomOffset: 0.7,
          visibilityTime: 3000,
          position: 'top',
          popupType: 'danger',
        });
        return undefined;
      }
    }
  } catch (error) {}
};

export const stringTitleCase = item => {
  let charArray = item?.split(/(?=[A-Z])/);
  let text = '';

  let firstWord = charArray.shift();
  let restOfFirstWord = firstWord.slice(1).toLowerCase();
  let firstLetter = firstWord.charAt(0).toUpperCase();
  text = firstLetter + restOfFirstWord;
  if (charArray.length >= 1) {
    text = firstLetter + restOfFirstWord + ' ' + charArray.join(' ');
  }

  return text;
};

export const downloadMedia = (filePath, isNew = false) => {
  let mimeType = filePath?.includes('.pdf')
    ? 'application/pdf'
    : filePath?.includes('.mp4')
    ? 'video/mp4'
    : 'image/jpeg';
  const {dirs} = RNFetchBlob.fs;

  const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;

  const configfb = {
    fileCache: true,
    useDownloadManager: true,
    notification: true,
    mediaScannable: true,
    title: filePath,
    mime: mimeType,
    path: `${dirToSave}/${filePath}`,
  };

  const configOptions = Platform.select({
    ios: {
      fileCache: true,
      title: filePath,
      path: `${dirToSave}/${filePath}`,
      appendExt: 'pdf',
    },
    android: {
      fileCache: true,
      addAndroidDownloads: {
        path: `${dirToSave}/${filePath}`,
        description: 'downloading file...',
        notification: true,
        useDownloadManager: true,
        title: filePath,
        mime: mimeType,
      },
      // useDownloadManager: true,
      // notification: true,
      // mediaScannable: true,
      // title: filePath,
      // mime: mimeType,
      // path: `${dirToSave}/${filePath}`,
    },
  });

  RNFetchBlob.config(configOptions)
    .fetch(
      'GET',
      `https://connect-coach-bucket-dev.s3.amazonaws.com/${filePath}`,
      {'Cache-Control': 'no-store'},
    )
    .then(res => {
      if (Platform.OS === 'android') {
        RNFetchBlob.android.actionViewIntent(res.path(), mimeType);
      } else {
        RNFetchBlob.ios.previewDocument(configfb.path);
      }
    })
    .catch(e => {
      PopUp({
        heading: 'Oops! Something went wrong',
        bottomOffset: 0.7,
        visibilityTime: 3000,
        position: 'top',
        popupType: 'danger',
      });
    });
  // }
};
