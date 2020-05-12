export default function(src) {
  var sound = new Howl({
    autoplay: true,
    src: [require(`../assets/sounds/${src}.mp3`)],
    volume: 0.5,
  })
  sound.play()
}
