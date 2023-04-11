import { useEffect, useRef } from 'react'

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas!.getContext('2d')

    //making the canvas full screen
    canvas!.height = window.innerHeight
    canvas!.width = window.innerWidth

    //chinese characters - taken from the unicode charset
    let matrix: any =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｲｸﾁﾄﾉﾌﾍﾖﾙﾚﾛﾝ'
    //converting the string into an array of single characters
    matrix = matrix.split('')

    const font_size = 10
    const columns = canvas!.width / font_size //number of columns for the rain
    //an array of drops - one per column
    // @ts-ignore
    const drops = []
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (let x = 0; x < columns; x++) drops[x] = 1

    //drawing the characters
    function draw() {
      //Black BG for the canvas
      //translucent BG to show trail
      ctx!.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height)

      ctx!.fillStyle = '#10dc0e' //green text
      ctx!.font = font_size + 'px arial'
      //looping over drops
      for (let i = 0; i < drops.length; i++) {
        //a random chinese character to print
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        //x = i*font_size, y = value of drops[i]*font_size
        // @ts-ignore
        ctx!.fillText(text, i * font_size, drops[i] * font_size)

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        // @ts-ignore
        if (drops[i] * font_size > canvas!.height && Math.random() > 0.975)
          drops[i] = 0

        //incrementing Y coordinate
        // @ts-ignore
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    return () => clearInterval(interval)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
    ></canvas>
  )
}

export default MatrixRain
