export const sendMessageToNative = (inputValue) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(inputValue);
    }
};