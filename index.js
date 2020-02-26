

// The buttons to start & stop stream and to capture the image
var btnStart = document.getElementById( "btn-start" );
var btnStop = document.getElementById( "btn-stop" );
var btnCapture = document.getElementById( "btn-capture" );

// The stream & capture
var stream = document.getElementById( "stream" );
var capture = document.getElementById( "capture" );
var snapshot = document.getElementById( "snapshot" );

// The video stream
var cameraStream = null;

// Attach listeners
btnStart.addEventListener( "click", startStreaming );
btnStop.addEventListener( "click", stopStreaming );
btnCapture.addEventListener( "click", captureSnapshot );

// Start Streaming
function startStreaming() {

    var mediaSupport = 'mediaDevices' in navigator;

    if( mediaSupport && null == cameraStream ) {

        navigator.mediaDevices.getUserMedia( { video: true } )
        .then( function( mediaStream ) {

            cameraStream = mediaStream;

            stream.srcObject = mediaStream;

            stream.play();
        })
        .catch( function( err ) {

            console.log( "Unable to access camera: " + err );
        });
    }
    else {

        alert( 'Your browser does not support media devices.' );

        return;
    }
}

// Stop Streaming
function stopStreaming() {

    if( null != cameraStream ) {

        var track = cameraStream.getTracks()[ 0 ];

        track.stop();
        stream.load();

        cameraStream = null;
    }
}

function captureSnapshot() {

    if( null != cameraStream ) {

        var ctx = capture.getContext( '2d' );
        var img = new Image();

        ctx.drawImage( stream, 0, 0, capture.width, capture.height );

        img.src     = capture.toDataURL( "image/png" );
        img.width   = 240;

        snapshot.innerHTML = '';

        snapshot.appendChild( img );

        //ML
        let net;

        async function app() {
          console.log('Loading mobilenet..');

          // Load the model.
          net = await mobilenet.load();
          console.log('Successfully loaded model');

          // Make a prediction through the model on our image.
          const imgEl = document.getElementById('capture');
          const result = await net.classify(imgEl);
          document.getElementById('console').innerText = `
          prediction: ${result[0].className}
          probability: ${result[0].probability}
          prediction: ${result[1].className}
          probability: ${result[1].probability}
          prediction: ${result[2].className}
          probability: ${result[2].probability}
          `;
          console.log(result);
        }

        app();
    }
}

//Image Upload
function dataURItoBlob( dataURI ) {

        var byteString = atob( dataURI.split( ',' ) [ 1 ] );
        var mimeString = dataURI.split( ',' ) [ 0 ].split( ':' ) [ 1 ].split( ';' ) [ 0 ];

        var buffer = new Arraybuffer( byteString.length );
        var data = new DataView( buffer );

        for(var i = 0; i < byteString.length; i++) {
            data.setUint8(i, byteString.charCodeAt ( i ) );
        }
        return new Blob( [ buffer ], { type: mimeString } );
}

//Upload using AJAX
/*var request = new XHTMLHttpRequest ();

request.open("POST", "/upload/url", true );

var data = new FormatData();
var dataURI = snapshot.firstChild.getAttribute( "src" );
var imageData = dataURItoBlob( dataURI );

data.append( "image", imageData, "myimage" );

request.send( data );*/

//Map JS
$('#btn-start').click(function(){
  if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(position){
      console.log(position);
        $.get( "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + ","
          + position.coords.longitude + "&sensor-false", function(data){
            console.log(data);
              })
              var img = new Image();
              img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + ","
              + position.coords.longitude + "&zoom=13&size=800x400&sensor=false&key=AIzaSyBy8yCX4BVbBxIykVdi0mZvjqqMFm6RXAw";

              var infoWindow;
              infoWindow = new google.maps.InfoWindow;

              infoWindow.setPosition(position.coords.latitude, position.coords.longitude);
              infoWindow.setContent('Your Location.');
              infoWindow.open(img);
              map.setCenter(position.coords.latitude, position.coords.longitude);
              /*var marker = new google.maps.Marker({
                position: {lat: position.coords.latitude, lng: position.coords.longitude},
                map: img,
                label: icon.label,

              });*/

          $('#output').html(img);
    });

  else
    console.log("geolocation is not supported");
  });
