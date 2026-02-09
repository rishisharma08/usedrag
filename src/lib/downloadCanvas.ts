function downloadCanvas( canvas: HTMLCanvasElement ){
    const downloadLink = document.createElement( "a" );
    const image = canvas.toDataURL( "image/jpeg" );
    downloadLink.setAttribute( "href", image );
    downloadLink.setAttribute( "download", "image.jpg" );
    document.body.appendChild( downloadLink );
    downloadLink.click();
    document.body.removeChild( downloadLink );
}

export default downloadCanvas;