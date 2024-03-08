module.exports = {
  afterUpdate(event) {
    if(event.result.finished) {
      console.log('should send the receipt to ', event.result.client.email)
    }
  }
}
