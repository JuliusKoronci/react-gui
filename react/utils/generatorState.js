export default ({ success, error } = {}) => {
  if (success) {
    return {
      showPopup: true,
      style: 'success',
      message: success,
    }
  }
  if (error) {
    return {
      showPopup: true,
      style: 'danger',
      message: error,
    }
  }

  return {
    showPopup: false,
    error: '',
    success: '',
  }
}
